const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const photo = req.file ? req.file.filename : null;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name, password: hashedPassword, email, photo
        });

        await newUser.save();

        res.status(200).json({ message: `new user registered ${name}` });
        console.log("new user registered");

    } catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {

    try {
        const { name, password } = req.body;

        const user = await UserModel.findOne({ name });

        if (!user) {
            res.status(404).json({ message: "no such users" })
        }

        const hashedPassword = await bcrypt.compare(password, user.password);

        if (!hashedPassword) {
            res.status(404).json({ message: "passwords dosent match" })
        }

        const token = jwt.sign({ id: user._id, name: user.name, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" })

        res.status(200).json({ token });
        console.log(token);

    } catch (err) {
        console.log(err);
    }
}

const addCourseProvider = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        console.log("Request body:", req.body);

        const photo = req.file ? req.file.filename : null;

        const hashedPassword = await bcrypt.hash(password, 10)

        const newCourseProvider = new UserModel({
            name, email, password: hashedPassword, role, photo
        })

        await newCourseProvider.save();

        res.status(200).json({ message: `new user created with name , ${name}` })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "unable to create the user" });
    }

}
const getAllUsers = async (req, res) => {

    let users
    try {

        users = await UserModel.find();
        console.log("all users", users)

    } catch (err) {
        console.log(err);
    }
    res.status(200).json(users);
}

const getUserById = async (req, res) => {
    const id = req.params.id;

    let user;

    try {
        user = await UserModel.findById(id)

    } catch (err) {
        console.log(err)
    }

    if (!user) {
        res.status(404).json({ message: "no users" })
    }
    console.log("user details", user)

    res.status(200).json({ user })
}

module.exports = { register, login, addCourseProvider, getAllUsers, getUserById }