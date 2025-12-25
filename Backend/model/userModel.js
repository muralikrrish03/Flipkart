const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        
    },
    password: {
        type: String,
        select: false
    },
    role: {
        type:String,
        default:"user"  
    },
     resetPasswordToken:String,
     resetPasswordExpire:Date,   
},
    { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next()
    
})


userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.jwtToken = function () {
    return jwt.sign({ id: this._id, username: this.username }
        , process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_SECRET_KEY_EXPIRE })
}


userSchema.methods.createPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;

}

const usermodel = mongoose.model("User", userSchema);
module.exports = usermodel;
