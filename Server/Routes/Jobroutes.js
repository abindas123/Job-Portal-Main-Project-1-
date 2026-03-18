import express from "express";
import { protect, requireRole } from "../Middleware/AuthMiddleware.js";

import {
  getJobs,
  getjob,
  createJob,
  UpdateMyJob,
  deletemyJob,
  getmyJobs
} from "../Controllers/Jobcontroller.js";

const router = express.Router();

// public: browse/search jobs
router.get("/", getJobs);

// employer: browse own jobs
router.get("/my-jobs", protect, requireRole("employer"), getmyJobs);

// public: get job by id
router.get("/:id", getjob);

// employer: CRUD
router.post("/", protect, requireRole("employer"), createJob);
router.put("/:id", protect, requireRole("employer"), UpdateMyJob);
router.delete("/:id", protect, requireRole("employer"), deletemyJob);

export default router;
