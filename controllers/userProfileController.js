import e from 'express'
import asyncHandler from 'express-async-handler'
import UserProfile from '../models/userProfile.js'

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



export {
    addOrUpdateBio,
    addOrUpdateSkills,
}