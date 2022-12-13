import e from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import UserProfile from '../models/userProfile.js'
import moment from 'moment'

//@desc Add/Update Bio
//@route POST /v1/api/users/profile/bio
//@access private
const addOrUpdateBio = asyncHandler(async (req, res) => {
    try {
        const bio = req.body.bio && req.body.bio

        if (bio) {
            const profile = await UserProfile.findOne({ user: req.user._id })
            if (profile) {
                profile.bio = bio;
                const updatedProfile = await profile.save()

                res.status(200).json({ success: true, data: updatedProfile })
            } else {
                const profileFields = {
                    user: req.user._id,
                    bio
                }

                const createdProfile = await UserProfile.create(profileFields)
                res.status(200).json({ success: true, data: createdProfile })
            }
        } else {
            res.status(404).json({ error: true, bio: "Please enter some text" })
        }
    } catch (err) {
        res.status(400).json({ error: true, err: err.message })
    }

})

//@desc Add/Update Skills
//@route POST /v1/api/users/profile/skills
//@access private
const addOrUpdateSkills = asyncHandler(async (req, res) => {
    try {
        const skills = req.body.skills && req.body.skills

        if (skills && skills.length > 0) {
            const profile = await UserProfile.findOne({ user: req.user._id })
            if (profile) {
                if (skills.length > profile.maxSkills) {
                    res.status(400).json({ error: true, skills: `You can choose maximum ${profile.maxSkills}` })
                }
                profile.skills = skills;
                const updatedProfile = await profile.save()

                res.status(200).json({ success: true, data: updatedProfile })
            } else {
                const profileFields = {
                    user: req.user._id,
                    skills
                }

                const createdProfile = await UserProfile.create(profileFields)
                res.status(200).json({ success: true, data: createdProfile })
            }
        } else {
            res.status(404).json({ error: true, skills: "Please choose some skills" })
        }
    } catch (err) {

        if (err.name == "ValidationError") {
            const errors = Object.values(err.errors).map((val) =>
                res.status(400).json({ error: true, [val.path]: val.message })
            )

        } else {
            res.status(400).json({ error: true, err: err.message })
        }
    }

})


//@desc Add/Update Education
//@route POST /v1/api/users/profile/education
//@access private
const addOrUpdateEducation = asyncHandler(async (req, res) => {

    try {
        const education = {
            university: req.body.university,
            degree: req.body.degree,
            specialization: req.body.specialization,
            from: req.body.from && moment(req.body.from).format('YYYY/MM/DD'),
            to: req.body.to && moment(req.body.to).format('YYYY/MM/DD'),
            current: req.body.current,
        }

        const profile = await UserProfile.findOne({ "user": req.user._id });

        if (profile) {
            profile.education.unshift(education);
            const updatedProfile = await profile.save()

            res.status(200).json({ success: true, data: updatedProfile })
        } else {
            const profileFields = {
                education,
                user: req.user._id
            }
            const profile = new UserProfile(profileFields);
            const createdProfile = await user.save();
            res.status(200).json({ success: true, data: createdProfile })
        }
    } catch (err) {
        if (err.name == "ValidationError") {
            const errors = Object.values(err.errors).map((val) =>
                res.status(400).json({ error: true, [val.path]: val.message })
            )

        } else {
            res.status(400).json({ error: true, err: err.message })
        }
    }

})

//@desc Add/Update Experience
//@route POST /v1/api/users/profile/experience
//@access private
const addOrUpdateExperience = asyncHandler(async (req, res) => {

    try {
        const experience = {
            company: req.body.company,
            designation: req.body.designation,
            location: req.body.location,
            from: req.body.from && moment(req.body.from).format('YYYY/MM/DD'),
            to: req.body.to && moment(req.body.to).format('YYYY/MM/DD'),
            current: req.body.current,
            description: req.body.description,
        }

        const profile = await UserProfile.findOne({ "user": req.user._id });

        if (profile) {
            profile.experience.unshift(experience);
            const updatedProfile = await profile.save()

            res.status(200).json({ success: true, data: updatedProfile })
        } else {
            const profileFields = {
                experience,
                user: req.user._id
            }
            const profile = new UserProfile(profileFields);
            const createdProfile = await user.save();
            res.status(200).json({ success: true, data: createdProfile })
        }
    } catch (err) {
        if (err.name == "ValidationError") {
            const errors = Object.values(err.errors).map((val) =>
                res.status(400).json({ error: true, [val.path]: val.message })
            )

        } else {
            res.status(400).json({ error: true, err: err.message })
        }
    }

})


export {
    addOrUpdateBio,
    addOrUpdateSkills,
    addOrUpdateEducation,
    addOrUpdateExperience,
}