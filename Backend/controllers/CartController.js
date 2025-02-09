const cartModel = require('../models/CartModel');
const userModel = require('../models/UserModel');
const courseModel = require('../models/CourseModel');

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

module.exports = { addToCart };
