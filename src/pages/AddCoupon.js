import React, { useState } from 'react';
import { useRouter } from 'next/router';
import './AddCoupon.css'; // Corrected import path


const AddCoupon = () => {
    const [brand, setBrand] = useState('');
    const [code, setCode] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [category, setCategory] = useState(''); // State for category
    const [logo, setLogo] = useState(''); // State for logo
    const router = useRouter();

    const categories = [
        'Mobile & Tablets',
        'Fashion',
        'Food',
        'Travel',
    ]; // Predefined categories

    const handleSubmit = async (e) => {
        e.preventDefault();
        const couponData = { brand, code, expirationDate, category, logo };

        try {
            const response = await fetch('http://localhost:5000/api/coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(couponData),
            });

            if (response.ok) {
                alert('Coupon added successfully!');
                router.push('/'); // Redirect to home or another page
            } else {
                alert('Failed to add coupon');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the coupon');
        }
    };

    return (
        <div>
            <h1>Add Coupon</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Brand:</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                </div>
                <div>
                    <label>Code:</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                </div>
                <div>
                    <label>Expiration Date:</label>
                    <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />
                </div>
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Logo URL (optional):</label>
                    <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />
                </div>
                <button type="submit">Add Coupon</button>
            </form>
        </div>
    );
};

export default AddCoupon;