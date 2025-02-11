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

        res.status(200).json({ message: "Course added to cart", cartItem: newCartItem });

    } catch (err) {
        res.status(500).json({ message: "Couldn't add the course", error: err.message });
    }
};

const getCartById = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("user id", id);

        let cart = await cartModel.find({ userId: id }).populate("courseId", "courseName photo");

        console.log("cart items", cart);
        if (!cart.length) {
            return res.status(404).json({ message: "No cart items found" });
        }
        
        res.status(200).json({ cartItems: cart });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching cart items" });
    }
};

const deleteItem = async(req,res)=>{

    try{
        const {id} = req.params;

        const deleteCourse = await cartModel.findByIdAndDelete(id);

        res.status(200).json({message:"course delete successfully",deleteCourse});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"couldnt delete the course"})
    }

}



module.exports = { addToCart,getCartById,deleteItem };
