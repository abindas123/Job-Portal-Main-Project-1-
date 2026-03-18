import express from "express";
import { protect, requireRole } from "../Middleware/AuthMiddleware.js";

import {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} from "../Controllers/Jobcontroller.js";

const router = express.Router();

// Candidate apply once
// POST /api/applications/:jobId
router.post("/:jobId", protect, requireRole("candidate"), applyJob);

// Candidate get my applications
// GET /api/applications/my
router.get("/my", protect, requireRole("candidate"), getMyApplications);

// Employer view applicants for specific job
// GET /api/applications/job/:jobId
router.get(
  "/job/:jobId",
  protect,
  requireRole("employer"),
  getApplicantsForJob
);

// Employer update status
// PATCH /api/applications/:applicationId/status
router.put(
  "/:applicationId/status",
  protect,
  requireRole("employer"),
  updateApplicationStatus
);

export default router;
