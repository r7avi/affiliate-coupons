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
        { brand: 'Brand A', code: 'SAVE20', expirationDate: new Date('2023-12-31'), category: 'Mobile & Tablets' },
        { brand: 'Brand B', code: 'FREESHIP', expirationDate: new Date('2023-11-30'), category: 'Fashion' },
        { brand: 'Brand C', code: 'WELCOME10', expirationDate: new Date('2024-01-15'), category: 'Food' },
        { brand: 'Brand D', code: 'SUMMER30', expirationDate: new Date('2024-06-30'), category: 'Travel' },
        { brand: 'Brand E', code: 'ELECTRO15', expirationDate: new Date('2024-03-31'), category: 'Mobile & Tablets' },
        { brand: 'Brand F', code: 'FASHION25', expirationDate: new Date('2024-02-28'), category: 'Fashion' },
        { brand: 'Brand G', code: 'FOODIE5', expirationDate: new Date('2024-04-15'), category: 'Food' },
        { brand: 'Brand H', code: 'TRAVEL10', expirationDate: new Date('2024-05-20'), category: 'Travel' },
        { brand: 'Brand I', code: 'MOBILE30', expirationDate: new Date('2024-07-01'), category: 'Mobile & Tablets' },
        { brand: 'Brand J', code: 'FASHION50', expirationDate: new Date('2024-08-15'), category: 'Fashion' },
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