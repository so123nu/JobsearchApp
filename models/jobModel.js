import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please Enter job title'],
    },
    annualSalary: {
        currency: {
            type: String,
            required: [true, 'Please Enter Currency']
        },
        range: {
            min: { type: Number, min: 0, required: [true, 'Please Enter minimum annual salary'] },
            max: { type: Number, min: 0, required: [true, 'Please Enter maximum annual salary'] },
        },
        unit: {
            type: String,
            default: "LPA"
        }
    },
    monthlySalary: {
        currency: {
            type: String,
            required: [true, 'Please Enter Currency']
        },
        range: {
            min: { type: Number, min: 0, required: [true, 'Please Enter minimum monthly salary'] },
            max: { type: Number, min: 0, required: [true, 'Please Enter maximum monthly salary'] },
        },
    },
    employeeStrength: {
        range: {
            min: { type: Number, min: 1, required: [true, 'Please Enter minimum company strength'] },
            max: { type: Number, min: 1, required: [true, 'Please Enter maximum company strength'] },
        }
    },
    experience: {
        range: {
            min: { type: Number, min: 0, required: [true, 'Please Enter minimum experience required'] },
            max: { type: Number, min: 0, required: [true, 'Please Enter maximum experience required'] },
        }
    },
    fundingType: {
        type: String,
        required: [true, 'Please Enter funding type for company.']
    },
    education: {
        type: String,
        required: [true, 'Please enter the minimum educational qualifications required for this job']
    },
    company: {
        type: String,
        required: [true, 'Please enter the company name']
    },
    companyLocation: {
        type: String,
        required: [true, 'Please Enter the company location']
    },
    isCompanyVerified: {
        type: Boolean,
        default: 0
    },
    companyVerifiedAt: {
        type: Date
    },
    shortDescription: {
        type: String,
        required: [true, 'Please Enter a short description']
    },
    description: {
        type: String,
        required: [true, 'Please Enter job description']
    },

}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

export default Job;

