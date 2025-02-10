const cartModel = require('../models/CartModel');
const userModel = require('../models/UserModel');
const courseModel = require('../models/CourseModel');

const mongoose = require('mongoose');


const addToCart = async (req, res) => {
    const { userId, courseId,quantity } = req.body;

    try {
        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingCourse = await courseModel.findById(courseId);
        if (!existingCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        const existingCartItem = await cartModel.findOne({ userId, courseId });
        if (existingCartItem) {
            return res.status(400).json({ message: "Course already in cart" });
        }

        const newCartItem = new cartModel({ userId, courseId,quantity });
        await newCartItem.save();

        res.status(201).json({ message: "Course added to cart", cartItem: newCartItem });

    } catch (err) {
        res.status(500).json({ message: "Couldn't add the course", error: err.message });
    }
};

const getCartById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("user id", id);

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Find the cart by userId
        let cart = await cartModel.find({ userId: id }).populate('userId').populate('courseId');

        console.log("cart items", cart);
        if (!cart || cart.length === 0) {
            return res.status(404).json({ message: "No cart items found for this user" });
        }

        res.status(200).json({ cartItems: cart });
    } catch (err) {
        console.log("Error fetching cart:", err);
        res.status(500).json({ message: "Error fetching cart" });
    }
};



module.exports = { addToCart,getCartById };
