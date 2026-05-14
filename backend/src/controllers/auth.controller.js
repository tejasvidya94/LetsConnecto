import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from "bcrypt"
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 character long" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User Already exists." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            fullName
        });

        if (newUser) {
            // create jwt token.
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            return res.status(400).json({ message: "Invalid user data." });
        }

    } catch (error) {
        console.log("Error in signup controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User with email does not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password does not match" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in the login controller: ", error.message);
        return res.status(500).json({ message: "Internal Error" });
    }
}


export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        console.log("Error in logout controller", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

// signatured image upload 
export const generateSignature = async (req, res) => {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder: "profile_images",
            },
            process.env.CLOUDINARY_API_SECRET
        );

        res.status(200).json({
            timestamp,
            signature,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            folder: "profile_images",
        });
    } catch (error) {
        console.log("error in generate signature", error);
        res.status(500).json({ message: "Signature generation failed" });

    }
};

export const updateProfilePic = async (req, res) => {
    try {
        const { imageUrl, publicId } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                profilePic: imageUrl,
                profilePicPublicId: publicId,
            },
            { new: true },
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in updateProfile controller: ", error);
        res.status(500).json({ message: "Profile Update Failed." });

    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in check auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

