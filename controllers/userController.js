import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/helpers.js";
import fs from 'fs';
import path from 'path'

//@desc Register User
//@route POST /v1/api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName && escape(req.body.firstName),
            lastName: req.body.lastName && escape(req.body.lastName),
            email: req.body.email && escape(req.body.email),
            password: req.body.password && escape(req.body.password),
            avatar: req.body.avatar && req.body.avatar,
            dob: req.body.dob && escape(req.body.dob),
            phone: req.body.phone && req.body.phone.replace(/[^\d]/g, ''),
            currentPosition: req.body.currentPosition && req.body.currentPosition,
            currentCompany: req.body.currentCompany && req.body.currentCompany,
            isRecruiter: req.body.isRecruiter ? true : false,
            isAdmin: req.body.isAdmin ? true : false,
            isJobseeker: req.body.isJobseeker ? true : false,
        });

        const userExists = await User.findOne({ "email": req.body.email });

        if (userExists) {
            res.status(400).json({ error: true, email: 'User already registered.' })
        } else {
            const createdUser = await user.save();
            res.status(201).json({ success: true, data: createdUser });
        }
    } catch (err) {
        if (err.name == "ValidationError") {
            const errors = Object.values(err.errors).map((val) =>
                res.status(400).json({ error: true, [val.path]: val.message })
            )

        }
    }
})


//@desc Login User
//@route POST /v1/api/users/login
//@access public
const login = asyncHandler(async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (typeof email == 'undefined') {
            res.status(400).json({
                error: true,
                "email": "Please Enter Email",

            })
        }

        if (typeof password == 'undefined') {
            res.status(400).json({
                error: true,
                "password": "Please Enter Password"

            })
        }

        const user = await User.findOne({ "email": email });

        if (user) {
            if (await user.matchPassword(password)) {
                res.status(200).json({ success: true, data: user, token: generateToken(user._id) })
            } else {
                res.status(401).json({ error: true, "password": "Invalid password!" })
            }
        } else {
            res.status(404).json({ error: true, email: 'User not found!' })
        }

    } catch (err) {
        if (err.name == "ValidationError") {
            const errors = Object.values(err.errors).map((val) =>
                res.status(400).json({ error: true, [val.path]: val.message })
            )

        }
    }
})

//@desc Login User
//@route POST /v1/api/users/resume/:id
//@access public
const deleteResume = asyncHandler(async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (user) {
            if (user.resumes && user.resumes.length > 0) {
                const resumes = user.resumes.filter(resume => resume._id.toString() !== req.params.id.toString())

                const deleteResume = user.resumes.find(resume => resume._id.toString() === req.params.id.toString())
                const filename = path.basename(deleteResume.url);

                user.resumes = resumes
                user.save()

                fs.unlink(`uploads/resumes/${filename}`, (err => {
                    if (err) console.log(err);
                    else {
                        res.status(200).json({ success: true, message: "Resume deleted successfully" })
                    }
                }));

                // fs.existsSync(`uploads/resumes/${filename}`, function (doesExist) {
                //     console.log(doesExist)
                //     if (doesExist) {
                //         console.log('file exists');
                //     } else {
                //         res.status(404).json({ error: true, message: "File not Found" })
                //     }
                // });

            }
        } else {
            res.status(404).json({ error: true, message: "User Not Found" })
        }


    } catch (err) {
        if (err) {
            res.status(400).json({ error: true, err })
        }
    }
})


export {
    registerUser,
    login,
    deleteResume

}