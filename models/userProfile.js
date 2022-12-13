import mongoose, { Model } from "mongoose";


const userProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bio: {
        type: String,
    },
    skills: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length <= 30
            },
            message: `You can choose maximum 30 skills.!`
        },
    },
    maxSkills: {
        type: Number,
        default: 30
    },
    education: [
        {
            university: {
                type: String,
                required: [true, 'Please enter university']
            },
            degree: {
                type: String,
                required: [true, 'Please enter degree']
            },
            specialization: {
                type: String
            },
            from: {
                type: Date,
                required: [true, 'Please enter start date']
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            }

        }
    ],
    experience: [
        {
            company: {
                type: String,
                required: [true, 'Please Enter your company name']
            },
            designation: {
                type: String,
                required: [true, 'Please Enter your desination']
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: [true, 'Please Enter joining date']
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }

        }
    ],
    social: {
        linkedIn: {
            type: String,
        },
        website: {
            type: String,
        },
        youtube: {
            type: String,
        }
    }

}, {
    timestamps: true
})

const UserProfile = mongoose.model("UserProfile", userProfileSchema)

export default UserProfile