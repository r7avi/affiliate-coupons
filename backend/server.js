// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/coupons');

// Define a Coupon model
const couponSchema = new mongoose.Schema({
    brand: String,
    code: String,
    expirationDate: Date,
    category: String, // Add category field
});

const Coupon = mongoose.model('Coupon', couponSchema);

// API endpoint to get coupons
app.get('/api/coupons', async (req, res) => {
    const coupons = await Coupon.find();
    res.json(coupons);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});