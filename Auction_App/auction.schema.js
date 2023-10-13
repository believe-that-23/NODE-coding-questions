import mongoose from "mongoose";

// Define the Mongoose schema for the auction data
const auctionSchema = new mongoose.Schema({
    owner: String,
    item: String,
    currentPrice: Number,
    timer: Number,
    createdAt: { type: Date, default: Date.now }
});

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;