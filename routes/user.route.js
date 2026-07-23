import express from "express";
import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from "../controller/user.controller.js";
import { authUser, authAdmin } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.route('/')
    .post(createUser)
    .get(authUser, authAdmin, getAllUsers);

router.post('/logIn', loginUser);
router.post('/logout', logoutUser);

router.route('/profile')
    .get(authUser, getUserProfile)
    .put(authUser, updateUserProfile);

//admin route
router.route('/:id')
    .delete(authUser, authAdmin, deleteUserById)
    .get(authUser, authAdmin, getUserById)
    .put(authUser, authAdmin, updateUserById);

export default router;

