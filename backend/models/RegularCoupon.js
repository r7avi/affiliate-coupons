const mongoose = require("mongoose");

const regularCouponSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    title: { type: String, required: true },
    discount : { type: Number, required: true },
    code: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    category: { type: String, required: true },
    logo: { type: String, required: true },
});

module.exports = mongoose.model("RegularCoupon", regularCouponSchema);
