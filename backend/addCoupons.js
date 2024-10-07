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
    title: String, // Add title field
    discount: Number, // Add discount field
});

const Coupon = mongoose.model('RegularCoupon', couponSchema);

// Function to add coupons
const addCoupons = async () => {
    const coupons = [
        { brand: 'Swiggy', code: 'SWIGGY15', expirationDate: new Date('2023-11-30'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Swiggy_Logo.svg/330px-Swiggy_Logo.svg.png', title: '15% Off on Orders', discount: 15 },
        { brand: 'Samsung', code: 'SAMSUNG10', expirationDate: new Date('2024-01-15'), category: 'Mobile & Tablets', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Samsung_Black_icon.svg/330px-Samsung_Black_icon.svg.png', title: '10% Off on Electronics', discount: 10 },
        { brand: 'Zomato', code: 'ZOMATO20', expirationDate: new Date('2023-12-31'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/330px-Zomato_Logo.svg.png', title: '20% Off on First Order', discount: 20 },
        { brand: 'Puma', code: 'PUMA25', expirationDate: new Date('2024-06-30'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Puma_complete_logo.svg/330px-Puma_complete_logo.svg.png', title: '25% Off on Sportswear', discount: 25 },
        { brand: 'Nike', code: 'NIKE30', expirationDate: new Date('2024-03-31'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/330px-Logo_NIKE.svg.png', title: '30% Off on New Arrivals', discount: 30 },
        { brand: 'Adidas', code: 'ADIDAS20', expirationDate: new Date('2024-02-28'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Adidas_2022_logo.svg/225px-Adidas_2022_logo.svg.png', title: '20% Off on Footwear', discount: 20 },
        { brand: 'Apple', code: 'APPLE15', expirationDate: new Date('2024-05-15'), category: 'Mobile & Tablets', logo: 'https://via.placeholder.com/150', title: '15% Off on Accessories', discount: 15 },
        { brand: 'KFC', code: 'KFC50', expirationDate: new Date('2024-07-10'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/255px-KFC_logo-image.svg.png', title: '50% Off on Family Meals', discount: 50 },
        { brand: 'Starbucks', code: 'STARBUCKS20', expirationDate: new Date('2024-08-15'), category: 'Food', logo: 'https://via.placeholder.com/150', title: '20% Off on Coffee', discount: 20 },
        { brand: 'Booking.com', code: 'BOOKING10', expirationDate: new Date('2024-09-30'), category: 'Travel', logo: 'https://via.placeholder.com/150', title: '10% Off on Bookings', discount: 10 },
        { brand: 'Expedia', code: 'EXPEDIA20', expirationDate: new Date('2024-11-05'), category: 'Travel', logo: 'https://via.placeholder.com/150', title: '20% Off on Travel Packages', discount: 20 },
        { brand: 'Uber', code: 'UBER30', expirationDate: new Date('2024-12-01'), category: 'Travel', logo: 'https://via.placeholder.com/150', title: '30% Off on Rides', discount: 30 },
        { brand: 'Sony', code: 'SONY20', expirationDate: new Date('2024-04-30'), category: 'Electronics', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/330px-Sony_logo.svg.png', title: '20% Off on Audio Products', discount: 20 },
        { brand: 'LG', code: 'LG10', expirationDate: new Date('2024-02-15'), category: 'Electronics', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/330px-LG_logo_%282014%29.svg.png', title: '10% Off on Home Appliances', discount: 10 },
        { brand: 'OnePlus', code: 'ONEPLUS15', expirationDate: new Date('2024-03-10'), category: 'Mobile & Tablets', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/OP_LU_Reg_1L_RGB_red_copy-01.svg/330px-OP_LU_Reg_1L_RGB_red_copy-01.svg.png', title: '15% Off on New Devices', discount: 15 },
        { brand: 'H&M', code: 'HM20', expirationDate: new Date('2024-06-15'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/188px-H%26M-Logo.svg.png', title: '20% Off on Apparel', discount: 20 },
        { brand: 'Myntra', code: 'MYNTRA30', expirationDate: new Date('2024-05-30'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Myntra_logo.png/330px-Myntra_logo.png', title: '30% Off on Sale Items', discount: 30 },
        { brand: 'Flipkart', code: 'FLIPKART25', expirationDate: new Date('2024-06-01'), category: 'E-commerce', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Flipkart_logo.svg/300px-Flipkart_logo.svg.png', title: '25% Off on Electronics', discount: 25 },
        { brand: 'Amazon', code: 'AMAZON10', expirationDate: new Date('2024-12-31'), category: 'E-commerce', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/300px-Amazon_2024.svg.png', title: '10% Off on Orders Above ₹500', discount: 10 },
        // Existing coupons for Swiggy
        { brand: 'Swiggy', code: 'SWIGGY15', expirationDate: new Date('2023-11-30'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Swiggy_Logo.svg/330px-Swiggy_Logo.svg.png', title: '15% Off on Orders', discount: 15 },
        { brand: 'Swiggy', code: 'SWIGGY20', expirationDate: new Date('2023-12-31'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Swiggy_Logo.svg/330px-Swiggy_Logo.svg.png', title: '20% Off on Orders Above ₹500', discount: 20 },
        { brand: 'Swiggy', code: 'SWIGGY25', expirationDate: new Date('2024-01-15'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Swiggy_Logo.svg/330px-Swiggy_Logo.svg.png', title: '25% Off on Selected Items', discount: 25 },
        { brand: 'Swiggy', code: 'SWIGGY35', expirationDate: new Date('2024-07-31'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Swiggy_Logo.svg/330px-Swiggy_Logo.svg.png', title: '35% Off on Weekend Orders', discount: 35 },
        { brand: 'Swiggy', code: 'SWIGGY45', expirationDate: new Date('2024-08-31'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Swiggy_Logo.svg/330px-Swiggy_Logo.svg.png', title: '45% Off on First Order', discount: 45 },

        // Additional coupons for Samsung
        { brand: 'Samsung', code: 'SAMSUNG50', expirationDate: new Date('2024-07-30'), category: 'Mobile & Tablets', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Samsung_Black_icon.svg/330px-Samsung_Black_icon.svg.png', title: '50% Off on Accessories', discount: 50 },
        { brand: 'Samsung', code: 'SAMSUNG55', expirationDate: new Date('2024-08-15'), category: 'Mobile & Tablets', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Samsung_Black_icon.svg/330px-Samsung_Black_icon.svg.png', title: '55% Off on Phones', discount: 55 },
        { brand: 'Samsung', code: 'SAMSUNG60', expirationDate: new Date('2024-09-01'), category: 'Mobile & Tablets', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Samsung_Black_icon.svg/330px-Samsung_Black_icon.svg.png', title: '60% Off on Wearables', discount: 60 },

        // Additional coupons for Zomato
        { brand: 'Zomato', code: 'ZOMATO55', expirationDate: new Date('2024-07-01'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/330px-Zomato_Logo.svg.png', title: '55% Off on Orders Above ₹800', discount: 55 },
        { brand: 'Zomato', code: 'ZOMATO60', expirationDate: new Date('2024-08-01'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/330px-Zomato_Logo.svg.png', title: '60% Off on Special Occasions', discount: 60 },
        { brand: 'Zomato', code: 'ZOMATO65', expirationDate: new Date('2024-09-01'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/330px-Zomato_Logo.svg.png', title: '65% Off on First 3 Orders', discount: 65 },

        // Additional coupons for Puma
        { brand: 'Puma', code: 'PUMA35', expirationDate: new Date('2024-07-15'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Puma_complete_logo.svg/330px-Puma_complete_logo.svg.png', title: '35% Off on Shoes', discount: 35 },
        { brand: 'Puma', code: 'PUMA40', expirationDate: new Date('2024-08-30'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Puma_complete_logo.svg/330px-Puma_complete_logo.svg.png', title: '40% Off on Clothing', discount: 40 },
        { brand: 'Puma', code: 'PUMA45', expirationDate: new Date('2024-09-15'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Puma_complete_logo.svg/330px-Puma_complete_logo.svg.png', title: '45% Off on Select Items', discount: 45 },

        // Additional coupons for Nike
        { brand: 'Nike', code: 'NIKE35', expirationDate: new Date('2024-06-30'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/330px-Logo_NIKE.svg.png', title: '35% Off on Sports Gear', discount: 35 },
        { brand: 'Nike', code: 'NIKE40', expirationDate: new Date('2024-07-15'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/330px-Logo_NIKE.svg.png', title: '40% Off on Shoes', discount: 40 },
        { brand: 'Nike', code: 'NIKE45', expirationDate: new Date('2024-08-01'), category: 'Fashion', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/330px-Logo_NIKE.svg.png', title: '45% Off on Apparel', discount: 45 },

        // Additional coupons for Apple
        { brand: 'Apple', code: 'APPLE20', expirationDate: new Date('2024-06-30'), category: 'Mobile & Tablets', logo: 'https://via.placeholder.com/150', title: '20% Off on iPhone Accessories', discount: 20 },
        { brand: 'Apple', code: 'APPLE25', expirationDate: new Date('2024-07-15'), category: 'Mobile & Tablets', logo: 'https://via.placeholder.com/150', title: '25% Off on iPad Cases', discount: 25 },
        { brand: 'Apple', code: 'APPLE30', expirationDate: new Date('2024-08-01'), category: 'Mobile & Tablets', logo: 'https://via.placeholder.com/150', title: '30% Off on MacBook Accessories', discount: 30 },

        // Additional coupons for KFC
        { brand: 'KFC', code: 'KFC60', expirationDate: new Date('2024-08-01'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/255px-KFC_logo-image.svg.png', title: '60% Off on Party Packs', discount: 60 },
        { brand: 'KFC', code: 'KFC65', expirationDate: new Date('2024-09-15'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/255px-KFC_logo-image.svg.png', title: '65% Off on Family Meals', discount: 65 },
        { brand: 'KFC', code: 'KFC70', expirationDate: new Date('2024-10-01'), category: 'Food', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/255px-KFC_logo-image.svg.png', title: '70% Off on Select Days', discount: 70 },

        // Additional coupons for Starbucks
        { brand: 'Starbucks', code: 'STARBUCKS25', expirationDate: new Date('2024-07-01'), category: 'Food', logo: 'https://via.placeholder.com/150', title: '25% Off on Cold Beverages', discount: 25 },
        { brand: 'Starbucks', code: 'STARBUCKS30', expirationDate: new Date('2024-08-01'), category: 'Food', logo: 'https://via.placeholder.com/150', title: '30% Off on Hot Beverages', discount: 30 },
        { brand: 'Starbucks', code: 'STARBUCKS35', expirationDate: new Date('2024-09-01'), category: 'Food', logo: 'https://via.placeholder.com/150', title: '35% Off on Pastries', discount: 35 }
        
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