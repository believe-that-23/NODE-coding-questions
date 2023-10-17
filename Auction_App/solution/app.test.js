import mongoose from 'mongoose';
import Auction from './auction.schema.js';
import { saveAuctionToDatabase } from './index.js';
import { connectToDatabase } from './db.config.js';
import app from './index.js';


beforeAll(async () => {
    await connectToDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('MongoDB Operations', () => {
    it('should save an auction to the database', async () => {
        const auctionData = {
            owner: 'User123',
            item: 'Item123',
            currentPrice: 100,
            timer: 60,
        };

        await saveAuctionToDatabase(auctionData);

        // Retrieve the auction from the database and verify its correctness
        const retrievedAuction = await Auction.findOne({
            owner: 'User123',
        });
        
        expect(retrievedAuction.owner).toBe('User123');
        expect(retrievedAuction.item).toBe('Item123');
        expect(retrievedAuction.currentPrice).toBe(100);
        expect(retrievedAuction.timer).toBe(60);
    });

    // Add more tests for other MongoDB operations (e.g., bidding, auction timer)
});

