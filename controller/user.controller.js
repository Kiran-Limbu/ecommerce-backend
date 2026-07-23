import userModel from '../models/user.model.js';
import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/createToken.utils.js';

const createUser = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({message: "All filed are required !"});
    }

    const allreadyExistUser = await userModel.findOne({ email });

    if (allreadyExistUser) {
        res.status(400).send("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ username, email, password: hashedPassword, isAdmin });

    try {
        await newUser.save();
        generateToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("All filed are required !");
    }

    const allreadyExistUser = await userModel.findOne({ email });

    if (!allreadyExistUser) {
        return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        allreadyExistUser.password
    );

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    generateToken(res, allreadyExistUser._id);

    res.status(200).json({
        _id: allreadyExistUser._id,
        username: allreadyExistUser.username,
        email: allreadyExistUser.email,
        isAdmin: allreadyExistUser.isAdmin
    });
    // return; it stop the code right before
};

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "User logout sucessfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userModel.find({});
    res.json(users);
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error("User not found !");
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        res.status(201).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User not found");
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error("Cann't delete admin user");
        }
        await user.deleteOne({ _id: user._id });
        res.json({ message: "User deleted 👍" })
    } else {
        res.status(404)
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404)
        throw new Error("User not found");
    }

});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.username || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }

})

export {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
};