// backend/addCoupons.js
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb+srv://ir7avi:QrDNheBivvUmZNBp@cluster0.cfyi8.mongodb.net/coupons', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a Coupon model
const couponSchema = new mongoose.Schema({
    brand: String,
    code: String,
    expirationDate: Date,
    category: String, // Add category field
    logo: String, // Add logo field
});

const Coupon = mongoose.model('PopularCoupon', couponSchema);

// Function to add coupons
const addCoupons = async () => {
    const coupons = [
        { brand: 'Swiggy', code: 'SWIGGY15', expirationDate: new Date('2023-11-30'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Swiggy_Logo.svg/330px-Swiggy_Logo.svg.png' },
        { brand: 'Samsung', code: 'SAMSUNG10', expirationDate: new Date('2024-01-15'), category: 'Mobile & Tablets', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Samsung_Black_icon.svg/330px-Samsung_Black_icon.svg.png' },
        { brand: 'Zomato', code: 'ZOMATO20', expirationDate: new Date('2023-12-31'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/330px-Zomato_Logo.svg.png' },
        { brand: 'Puma', code: 'PUMA25', expirationDate: new Date('2024-06-30'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Puma_complete_logo.svg/330px-Puma_complete_logo.svg.png' },
        { brand: 'Nike', code: 'NIKE30', expirationDate: new Date('2024-03-31'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/330px-Logo_NIKE.svg.png' },
        { brand: 'Adidas', code: 'ADIDAS20', expirationDate: new Date('2024-02-28'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Adidas_2022_logo.svg/225px-Adidas_2022_logo.svg.png' },
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