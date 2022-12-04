import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const protect = asyncHandler(async (req, res, next) => {
    let token = '';

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            //verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password');

            next()
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({ error: true, msg: 'Not authorized, Invalid Token.' })

    }

    if (!token) {
        res.status(401).json({ error: true, msg: 'Not authorized, Token not found.' })
    }

})