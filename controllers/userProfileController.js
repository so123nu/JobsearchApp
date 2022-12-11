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



export {
    addOrUpdateBio
}