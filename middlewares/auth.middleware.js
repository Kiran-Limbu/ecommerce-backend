import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import asyncHandler from './asyncHandler.middleware.js';

const authUser =  asyncHandler(async (req, res, next) =>{       
    let token;

    token = req.cookies.jwt

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userModel.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401)
            throw new Error("Unauthorized token, token failed .");          
        }
    } else {
        res.status(401)
        throw new Error("Unauthorized token, no token .");
    }
});


const authAdmin = asyncHandler(async (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next();
    } else{
        res.status(401).send("Unauthorized admin .");
    }
});

export { authUser, authAdmin }