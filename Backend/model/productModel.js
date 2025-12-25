const mongoose = require('mongoose');
const productSchema=new mongoose.Schema({
    name: String,
    price:String,
    description: String,
    rating: String,
    images: [
        {
            Image:String
        }
    ],
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required:true
    // },
    category: String,
    seller: String,
    stock: String,
    numOfReviews: String,
    createAt:Date
    
    
})

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;