import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Auction from './auction.schema.js'; // Import your auction schema

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// Store auction details and timer
let isAuctionOngoing = false;
let currentAuction = {
    owner: null,
    item: null,
    currentPrice: 0,
    timer: 0,
    timerInterval: null,
};

// Function to save an auction to the database
export const saveAuctionToDatabase = async (auctionData) => {
    try {
        await Auction.create(auctionData);
    } catch (error) {
        console.error('Error saving auction to the database:', error);
    }
};

// Function to start the auction timer
const startAuctionTimer = () => {
    return setInterval(() => {
        if (currentAuction.timer > 0) {
            currentAuction.timer -= 1;
            io.emit('auctionTimer', currentAuction.timer);
        } else {
            clearInterval(currentAuction.timerInterval);
            io.emit('auctionEnded', currentAuction);
            isAuctionOngoing = false; // Allow new auctions to be added
        }
    }, 1000);
};

// Function to get the latest auction from the database
// Function to get the latest active auction from the database
const getLatestActiveAuctionFromDatabase = async () => {
    try {
        const now = new Date();
        return await Auction
            .findOne({
                timer: { $gt: 0 }, // Filter auctions with timers greater than 0
                createdAt: { $gte: new Date(now - currentAuction.timer * 1000) }, // Filter auctions created within timer duration
            })
            .sort({ createdAt: -1 })
            .exec();
    } catch (error) {
        console.error('Error retrieving latest active auction from the database:', error);
        return null;
    }
};



// Handle socket connections
io.on('connection', async (socket) => {
    console.log("Connection made");

    // Retrieve the latest auction from the database
    const latestAuction = await getLatestActiveAuctionFromDatabase();

    if (latestAuction) {
        currentAuction = {
            owner: latestAuction.owner,
            item: latestAuction.item,
            currentPrice: latestAuction.currentPrice,
            timer: latestAuction.timer,
        };

        // Send the latest auction details to the user
        socket.emit('newAuction', currentAuction);
    }

    // Handle bidding
    socket.on('placeBid', (bidAmount, username) => {
        if (bidAmount > currentAuction.currentPrice) {
            currentAuction.currentPrice = bidAmount;
            currentAuction.owner = username;
            io.emit('bidPlaced', currentAuction);
            saveAuctionToDatabase(currentAuction);
        }
    });

    // Handle posting a new item for auction
    socket.on('postItem', (item, startingPrice, timer, username) => {
        if (!isAuctionOngoing) {
            isAuctionOngoing = true;
            currentAuction = {
                owner: username,
                item,
                currentPrice: startingPrice,
                timer,
            };

            io.emit('newAuction', currentAuction);

            // Save the auction to the database
            saveAuctionToDatabase(currentAuction);

            // Start the auction timer
            currentAuction.timerInterval = startAuctionTimer();
        } else {
            // Notify the user that an auction is already ongoing
            socket.emit('auctionInProgress', 'An auction is already in progress.');
        }
    });

    socket.on("disconnect", () => {
        console.log("Connection aborted");
    });
});


export default app;