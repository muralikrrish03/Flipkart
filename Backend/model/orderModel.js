const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: String,
    email:String,
    cardItems: Array,
    amount: String,
    status: String,
    createAt: Date 
    
})

const orderModel = mongoose.model('Order', orderSchema);

module.exports=orderModel