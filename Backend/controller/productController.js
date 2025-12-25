const ProductModel = require('../model/productModel')

exports.getAll = async (req, res, next) => {
    const { keyword }=req.query;
    const query = keyword ? { name: new RegExp(keyword, "i") } : {};
    const products = await ProductModel.find(query);
    res.status(200).json({
        success: true,
        products,
    })
}
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message:err.message 
        })
    }
}

exports.getDelete = async (req, res, next) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message:"Product Deleted Successfully"
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message:err.message 
        })
    }
}
exports.getPost = async (req, res, next) => {
    try {

        req.body.user = req.user.id;
        const product = await ProductModel.create(req.body);
        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message:err.message 
        })
    }
}
