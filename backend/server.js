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
mongoose.connect('mongodb+srv://ir7avi:QrDNheBivvUmZNBp@cluster0.cfyi8.mongodb.net/coupons');

// Define a Coupon model
const couponSchema = new mongoose.Schema({
    brand: String,
    code: String,
    expirationDate: Date,
    category: String, // Add category field
    logo: String, // Add logo field for brand logos
});

const Coupon = mongoose.model('Coupon', couponSchema);

// API endpoint to get coupons
app.get('/api/coupons', async (req, res) => {
    const coupons = await Coupon.find();
    res.json(coupons);
});

// API endpoint to add a coupon
app.post('/api/coupons', async (req, res) => {
    const { brand, code, expirationDate, category, logo } = req.body;
    const newCoupon = new Coupon({ brand, code, expirationDate, category, logo });
    try {
        await newCoupon.save();
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(400).json({ message: 'Error adding coupon', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});