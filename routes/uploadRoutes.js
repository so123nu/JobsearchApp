import express from 'express';
import { login, registerUser } from '../controllers/userController.js';
import path from 'path';
import multer from 'multer'
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/userModel.js';

const router = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.params.type == 'avatar') {
            cb(null, 'uploads/avatars')
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({

    storage: storage,
    limits: {
        fileSize: 1000000 * 10 // 10mb  : 1mb = 1000000 byte
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(png|jpg|jpeg|webp|pdf)$/)) {
            cb(null, false)
            return cb(new Error('Only .png, .jpg, .webp, .pdf and .jpeg format allowed!'));
        } else {
            cb(null, true)
        }
    },

}).single('file')

router.post('/users/:type', (req, res) => {
    console.log(req.params)
    upload(req, res, function (err) {
        if (err) {
            res.status(400).json({ file: err.message })
        } else {
            if (req.file == undefined) {
                res.status(400).json({ file: "Please provide a file to proceed" })
            } else {
                uploadDocument(req, res)
            }
        }

    })
})

const uploadDocument = asyncHandler(async (req, res) => {
    let filepath = '';

    if (req.params.type == 'avatar') {
        // filepath = `${req.protocol}://${req.get('host')}/${req.file.path}`
        filepath = `/${req.file.path}`;
    }

    res.status(201).json({ message: "File Uploaded Successfully!", data: filepath })
})

export default router;
