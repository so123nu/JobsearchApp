import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { getAge } from '../utils/helpers.js'
import moment from 'moment';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please Enter firstName']
    },
    lastName: {
        type: String,
        required: [true, 'Please Enter lastName']
    },
    phone: {
        type: String,
        required: [true, 'Please Enter your phone number'],
        maxlength: [10, 'Your phone number can be max 10 digits in length.'],
        unique: true
    },
    avatar: {
        type: String,
        required: [true, 'Please Enter Avatar']
    },
    resumes: [
        {
            url: { type: String },
        }
    ],
    dob: {
        type: Date,
        required: [true, 'Please Enter date'],
        validate: {
            validator: function (dob) {
                dob = moment(dob, "YYYY-MM-DD");
                if (getAge(dob) > 18) {
                    return true;
                } else {
                    return false;
                }
            },
            message: 'You must be 18 years and above to Sign Up.'
        },
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password should be atleast 8 characters.'],
        required: [true, "Please Enter Your Password."],
        validate: {
            validator: function (v) {
                var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                return re.test(v);
            },
            message: `Password must contain a letter ,a special character, an uppercase and a lowercase character and should be 8 or more in length.!`
        },
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email'],
        unique: true
    },
    currentPosition: {
        type: String,
    },
    currentCompany: {
        type: String,
    },
    status: {
        type: Boolean,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isRecruiter: {
        type: Boolean,
        required: true,
        default: false
    },
    isJobseeker: {
        type: Boolean,
        required: true,
        default: false
    },
})

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}



const User = mongoose.model('User', userSchema);

export default User;