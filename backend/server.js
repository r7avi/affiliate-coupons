require('dotenv').config({ path: './backend/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PopularCoupon = require("./models/PopularCoupon");
const RegularCoupon = require("./models/RegularCoupon");
const MONGODB_URI ="mongodb+srv://ir7avi:QrDNheBivvUmZNBp@cluster0.cfyi8.mongodb.net/coupons";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGODB_URI, {
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// API endpoint to get popular coupons
app.get('/api/popularcoupons', async (req, res) => {
    try {
        const coupons = await PopularCoupon.find();
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch popular coupons', error });
    }
});

// API endpoint to add a popular coupon
app.post('/api/popularcoupons', async (req, res) => {
    const { brand, code, expirationDate, category, logo } = req.body;
    const newCoupon = new PopularCoupon({ brand, code, expirationDate, category, logo });

    try {
        await newCoupon.save();
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(400).json({ message: 'Error adding popular coupon', error });
    }
});

// API endpoint to get regular coupons
app.get('/api/regularcoupons', async (req, res) => {
    const { category } = req.query;
    try {
        const query = category ? { category } : {};
        const coupons = await RegularCoupon.find(query);
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch coupons', error });
    }
});

// API endpoint to add a regular coupon
app.post('/api/regularcoupons', async (req, res) => {
    const { brand, code, expirationDate, category, logo } = req.body;
    const newCoupon = new RegularCoupon({ brand, code, expirationDate, category, logo });

    try {
        await newCoupon.save();
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(400).json({ message: 'Error adding regular coupon', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
