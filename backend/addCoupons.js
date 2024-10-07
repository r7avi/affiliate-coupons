// backend/addCoupons.js
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/coupons', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a Coupon model
const couponSchema = new mongoose.Schema({
    brand: String,
    code: String,
    expirationDate: Date,
    category: String, // Add category field
});

const Coupon = mongoose.model('Coupon', couponSchema);

// Function to add coupons
const addCoupons = async () => {
    const coupons = [
        { brand: 'Brand A', code: 'SAVE20', expirationDate: new Date('2023-12-31'), category: 'Electronics' },
        { brand: 'Brand B', code: 'FREESHIP', expirationDate: new Date('2023-11-30'), category: 'Fashion' },
        { brand: 'Brand C', code: 'WELCOME10', expirationDate: new Date('2024-01-15'), category: 'Home & Garden' },
        { brand: 'Brand D', code: 'SUMMER30', expirationDate: new Date('2024-06-30'), category: 'Electronics' },
        { brand: 'Brand E', code: 'FALLSALE', expirationDate: new Date('2024-09-30'), category: 'Fashion' },
    ];

    try {
        await Coupon.insertMany(coupons);
        console.log('Coupons added successfully!');
    } catch (error) {
        console.error('Error adding coupons:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the function
addCoupons();