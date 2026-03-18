import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "candidateId is required"],
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "jobId is required"],
    },
    status: {
      type: String,
      enum: ["applied", "rejected", "shortlisted"],
      default: "applied",
    },
    coverLetter: {
      type: String,
      maxlength: 3000,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

ApplicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });
ApplicationSchema.index({ candidateId: 1, createdAt: -1 });
ApplicationSchema.index({ jobId: 1, createdAt: -1 });
ApplicationSchema.index({ jobId: 1, status: 1 });

export default mongoose.model("Application", ApplicationSchema);
