import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from "bcrypt"
import cloudinary from "../lib/cloudinar.js";

export const signup = async (req, res) => {
    const { email, userName, password } = req.body;
    try {

        if (!userName || !email || !password) {
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
            userName
        });

        if (newUser) {
            // create jwt token.
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.userName,
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
            name: user.userName,
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


export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required." });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true });
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile controller", error);
        res.status(500).json({ message: "Internal Server Error." });

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