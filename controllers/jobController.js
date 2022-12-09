import asyncHandler from "express-async-handler";
import Job from "../models/jobModel.js";

//@desc Create a job
//@route POST /v1/api/jobs
//@access private
const addJob = asyncHandler(async (req, res) => {
    try {

        const job = new Job({
            postedBy: req.user._id,
            title: req.body.title && req.body.title,
            annualSalary: req.body.annualSalary && req.body.annualSalary,
            monthlySalary: req.body.monthlySalary && req.body.monthlySalary,
            employeeStrength: req.body.employeeStrength && req.body.employeeStrength,
            experience: req.body.experience && req.body.experience,
            fundingType: req.body.fundingType && req.body.fundingType,
            education: req.body.education && req.body.education,
            company: req.body.company && req.body.company,
            companyLocation: req.body.companyLocation && req.body.companyLocation,
            shortDescription: req.body.shortDescription && req.body.shortDescription,
            description: req.body.description && req.body.description,
            fundingType: req.body.fundingType && req.body.fundingType,
        })

        const createdJob = await job.save();
        res.status(201).json({ success: true, data: createdJob });

    } catch (err) {
        console.log(err)
        if (err.name == "ValidationError") {
            const errors = Object.values(err.errors).map((val) =>
                res.status(400).json({ error: true, [val.path]: val.message })
            )

        }
    }
})

//@desc GET Jobs
//@route GET /v1/api/jobs?page=1&offset=10&search=php&location=kol&annual_sal_range=6-8
//@access private
const getJobs = asyncHandler(async (req, res) => {
    try {
        //query parameters
        const offset = req.query.offset && req.query.offset
        const page = req.query.page ? Number(req.query.page) : 1;
        const search = req.query.search && req.query.search;
        const searchLocation = req.query.location && req.query.location;
        const annualSalaryRange = req.query.annual_sal_range && req.query.annual_sal_range.split('-')
        const experienceRange = req.query.exp_range && req.query.exp_range.split('-')
        const education = req.query.education && req.query.education.split('-')
        const fundingType = req.query.funding_type && req.query.funding_type.split('-')
        const companyStrength = req.query.company_strength && req.query.company_strength.split('-')

        const minAnnualSalary = annualSalaryRange && annualSalaryRange.length > 0 ? annualSalaryRange[0] : 0
        const maxAnnualSalary = annualSalaryRange && annualSalaryRange.length > 0 ? annualSalaryRange[1] : 10000000
        const minExperience = experienceRange && experienceRange.length > 0 ? experienceRange[0] : 0
        const maxExperience = experienceRange && experienceRange.length > 0 ? experienceRange[1] : 10000000
        const minCompanyStrength = companyStrength && companyStrength.length > 0 ? companyStrength[0] : 0
        const maxCompanyStrength = companyStrength && companyStrength.length > 0 ? companyStrength[1] : 10000000

        //regex search i.e., like implementation
        const regex = new RegExp(search, 'i');
        const locationRegex = new RegExp(searchLocation, 'i');
        const educationRegex = education.map(item => new RegExp(item, 'i'))
        const fundingTypeRegex = fundingType.map(item => new RegExp(item, 'i'))

        const jobs = await Job.find({
            $or: [{ 'title': regex }, { 'company': regex }, { 'shortDescription': regex }],
            'companyLocation': locationRegex,
            'annualSalary.range.min': { $gte: minAnnualSalary },
            'annualSalary.range.max': { $lte: maxAnnualSalary },
            'experience.range.min': { $gte: minExperience },
            'experience.range.max': { $lte: maxExperience },
            'employeeStrength.range.min': { $gte: minCompanyStrength },
            'employeeStrength.range.max': { $lte: maxCompanyStrength },
            'education': { $in: educationRegex },
            'fundingType': { $in: fundingTypeRegex },
        })
            .populate('postedBy', ['firstName', 'lastName', 'status', 'currentPosition', 'currentCompany'])
            .limit(offset)
            .skip(offset * (page - 1));

        const count = await Job.find({
            $or: [{ title: regex }, { company: regex }, { shortDescription: regex }],
            companyLocation: locationRegex,
            'annualSalary.range.min': { $gte: minAnnualSalary },
            'annualSalary.range.max': { $lte: maxAnnualSalary },
            'experience.range.min': { $gte: minExperience },
            'experience.range.max': { $lte: maxExperience },
        }).count();

        res.status(200).json({ success: true, data: jobs, page, totalPages: Math.ceil(count / offset) })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: true, err })
    }
})

export {
    addJob,
    getJobs,
}