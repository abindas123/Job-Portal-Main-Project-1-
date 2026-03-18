import Job from "../Models/Job.js"
import Application from "../Models/Application.js"
import { application } from "express";
// import {protect,requiredRole} from "../Middleware/AuthMiddleware.js"


// Candidate apply to job (only once)
export const applyJob = async (req, res) => {
  try {
        
    const jobId = req.params.jobId;
  
    const { coverLetter } = req.body||{};

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check already applied
    const already = await Application.findOne({
      jobId,
      candidateId: req.user.id,
    });

    if (already) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // Create application
    const newApplication = await Application.create({
      jobId,
      candidateId: req.user.id,
      coverLetter: coverLetter || "",
    });

    return res.status(201).json({ application: newApplication });

  } catch (err) {
    return res.status(500).json({
      message: "Error applying to job",
      error: err.message,
    });
  }
};
//cnadidate get all jobs my applications
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.user.id })
      .populate("jobId", "title location type level createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: applications.length,
      applications,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching applications", error: err.message });
  }
};
//employer get all jobs applied
// (Recommended) Employer view applicants for a job
// GET /api/applications/job/:jobId
export const getApplicantsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized to view applicants" });
    }

    const applicants = await Application.find({ jobId })
      .populate("candidateId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ count: applicants.length, applicants });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching applicants", error: err.message });
  }
};
//employer update the status
export const updateApplicationStatus = async (req, res) => {
  
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // validate status
    if (!["applied", "shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(applicationId);
    
    if (!application) return res.status(404).json({ message: "Application not found" });

    // check employer owns the job
    const job = await Job.findById(application.jobId);
    
    if (!job) return res.status(404).json({ message: "Job not found" });
    

   if (!job.createdBy || !req.user.id) {
  return res.status(403).json({ message: "Not authorized" });
}

if (job.createdBy.toString() !== req.user.id.toString()) {
  return res.status(403).json({ message: "Not authorized to update this application" });
}
     
    application.status = status;
   
    const updated = await application.save();

    return res.status(200).json({ application: updated });
  } catch (err) {
    return res.status(500).json({ message: "Error updating status", error: err.message });
  }
};

//public getjobs
export const getJobs = async (req, res) => 
    { try { 
    const { search, location, type, level, page = 1, limit = 10 } = req.query; 
    const query = {}; 
    if (location) query.location = new RegExp(location, "i"); 
    if (type) query.type = type; 
    if (level) query.level = level; 
    if (search) { query.$or = 
        [ { title: new RegExp(search, "i") }, 
            { description: new RegExp(search, "i") }, ]; } 
    const pageNum = Number(page); 
    const limitNum = Number(limit); 
    const skip = (pageNum - 1) * limitNum; 
    const [jobs, total] = await Promise.all(
        [ Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum), Job.countDocuments(query), ]); 
        return res.status(200).json({ total, 
            page: pageNum, 
            pages: Math.ceil(total / limitNum), 
            count: jobs.length, jobs, }); } 
        catch (err) { return res.status(500).json(
            { message: "Error fetching jobs", error: err.message }); } };

//public:get jobbyid
export const getjob=async(req,res)=>{
    try{
    const id=req.params.id
    const job=await Job.findById(id)
    if(!job){
        res.status(500).json("job not found")
    }
    res.status(200).json({job})
    }catch(err){
        res.status(500).json({msg:err.message})
    }
    
}

///creating a job by role employer
export const createJob = async (req, res) => {
  console.log("REQ.USER:", req.user);
console.log("TOKEN:", req.headers.authorization);

  try {
    const {
      title,
      description,
      location,
      type,
      level,
      skills,
      salaryRange,
    } = req.body;

    if (!title || !description || !location || !type || !level) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const job = await Job.create({
      title,
      description,
      location,
      type,
      level,
      skills: Array.isArray(skills) ? skills : [],
      salaryRange: salaryRange || {
        min: null,
        max: null,
        currency: "EUR",
      },
      createdBy: req.user.id,
    });

    return res.status(201).json({ job });
  } catch (err) {
    
    return res.status(400).json({ message: err.message });
  }
}
//updating a job
export const UpdateMyJob=async (req, res) => {
  try {
    const jobId = req.params.id;

    // 1) Find job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 2) Ownership check
    if (job.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this job" });
    }

    // 3) Update only provided fields
    const { title, description, location, type, level, skills } = req.body;

    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (type) job.type = type;
    if (level) job.level = level;
    if (skills) job.skills = skills;

    // 4) Save
    const updatedJob = await job.save();

    // 5) Send response
    return res.status(200).json({ job: updatedJob });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating job",
      error: err.message,
    });
  }
}
//deleteing job
export const deletemyJob = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("DELETE JOB ID:", id);
    console.log("REQ USER IN DELETE:", req.user);

    if (!id) {
      return res.status(400).json({ message: "Job id not found" });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: "User id missing in token" });
    }

    if (job.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Cannot delete this job" });
    }

    await job.deleteOne();
    await Application.deleteMany({id})

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE JOB ERROR:", err);
    return res.status(400).json({ message: err.message });
  }
};
//list all jobs of employer
export const getmyJobs=async(req,res)=>{
    try{
    const Jobs=await Job.find({createdBy:req.user.id}).sort({createdAt:-1})
    res.status(200).json({count:Jobs.length,Jobs})
    }catch(err){
        res.status(500).json({err:err.message})
    }


}

