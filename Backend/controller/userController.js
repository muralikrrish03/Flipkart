const { log } = require("console");
const { sendEmail } = require("../middleware/sendEmail");
const usermodel = require("../model/userModel")
const crypto = require('crypto');
exports.registerUser = async (req, res, next) => {
    try {
        const user = await usermodel.create(req.body);
         const token = user.jwtToken();
            res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "lax", 
            })
            .json({
            success: true,
            message:"User Register Succeessfully",
            user,
            });
        
    } catch (err) {
        res.status(400).json({
            success: false,
            message:err.message
        })
    }
}
exports.LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const checkEmail = await usermodel.findOne({ email });
        if (!checkEmail) {
            return res.status(404).json({
                success: false,
                message:"Email Not found"    
            })
        }
        const user = await usermodel.findOne({ email }).select("+password");
        const isMatch =await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message:"invalid password"
            })
            
        }
        
    const token = user.jwtToken();
     res.status(200).cookie("token", token, {
                        httpOnly: true,
                        secure: false, 
                        sameSite: "lax", 
                        })
                        .json({
                            success: true,
                            message:"Login success"
                        });
      


    } catch (err) {
        res.status(400).json({
            success: false,
            message:err.message
        })
   }
}


exports.logout = (req, res) => {
  res.cookie("token", "",{maxAge:0});
  res.json({ success: true, message: "Logged out successfully" });
};


exports.getMe = async (req, res) => {
    try {
      res.status(200).json({
    success: true,
    user: req.user
  });
    } catch (err) {
        req.status(401).json({
            success: false,
            message:err.message
        })
  }
};



exports.forgetPaassword = async (req, res, next) => {
    const { email } = req.body;
    
    const user = await usermodel.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success:false,
            message:"Not Found"
        })
    }

    let resetToken;

    try {
        resetToken = user.createPasswordToken();
        await user.save();
        res.status(200).json({
            success: true,
            resetToken
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message:ere.message

       })
    }


    const resetPasswordUrl = `${req.protocol}://${req.host}/reset/${resetToken}`;
     const htmlmessage= `<div
        style="height:320px;width:500px;padding: 15px;position: relative; background-color: white ;font-family: sans-serif;  border-radius:10px ; box-shadow:0px 0px 3px black ;margin:20px auto ; ">
        <h1 style="color: rgba(0, 191, 255, 0.763); font-family: sans-serif;font-weight: bolder;">Reset Password Link
            Below😃</h1>
        <p style="color: gray;">hello,</p>
        <p href=${resetPasswordUrl} style="color: gray;">You requested to reset your password.
            Reset Password
            Or copy and paste this link in your browser:</p>
        <div style="display: flex;flex-direction: column; align-items: center;gap: 10px; ;">
            <a href="">hello</a>
            <p style="color: red; font-family: sans-serif;">wait for 30 minutes</p>
        </div>
        <p style="color: gray;">
            If you didn't request a password reset, please ignore this email.
            Regards.
            Your Website Team
        </p>
    
    </div>` 
    try {
        await sendEmail({
            email: user.email,
            subject:"Password Reset Request",
            message:htmlmessage
        })
    } catch (err) {
        
        user.resetPasswordToken=undefined
        user.resetPasswordExpire = undefined,
        await user.save({validateBeforeSave:false});
        res.status(500).json({
            success: false,
            message:err.message
        })
    }


}


exports.resetPassword = async (req, res, next) => {
const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
const user = await usermodel.findOne({ resetPasswordToken, resetPasswordExpire:{$gt:Date.now()} });
    
    if (!user) {
        res.status(404).json({
            success: false,
            message:"invalid or reset Code Expired"
        })
    }

    const { password, confirmpassword } = req.body;
    
    if (password !== confirmpassword) {
        res.status(401).json({
            success: false,
            message:"Password mismatch"
        })
        
    }

    try {
    user.password = password;
    user.resetPasswordToken=undefined
    user.resetPasswordExpire = undefined
    await user.save();
    const token = user.jwtToken();
    res.status(200).cookie("token", token, {
                        httpOnly: true,
                        secure: false, 
                        sameSite: "lax", 
                        })
                        .json({
                            success: true,
                            message:"password changed"
                        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message:err.message
        })
   }

}