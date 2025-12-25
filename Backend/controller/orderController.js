const orderModel = require("../model/orderModel");
const productModel = require("../model/productModel");

exports.createrOrder = async (req, res, next) => {
    try {
            const { userDetails, cardItems } = req.body; 

                const amount = cardItems.reduce(
                (acc, item) => acc + item.product.price * item.count,0);

                const status = "pending";

                const order = await orderModel.create({
                    user: userDetails.name,
                    email:userDetails.email,
                    cardItems,
                    amount,
                    status,
                    createAt: new Date(),
                });

                cardItems.forEach (async(item) => {
                    const product = await productModel.findById(item.product._id);
                    product.stock -= item.count;
                    await product.save();
                })

                res.status(200).json({
                    success: true,
                    message: "your order completed",
                    order,
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
                
  }
};


exports.getOrder = async (req, res, next) => {

    const order = await orderModel.find();
    res.status(400).json({
        success: true,
        order
        
    })
    
}