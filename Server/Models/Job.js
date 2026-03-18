import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [2, "Location must be at least 2 characters"],
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    type: {
      type: String,
      required: [true, "Job type is required"],
      enum: {
        values: ["full-time", "part-time", "intern"],
        message: "Type must be full-time, part-time, or intern",
      },
      default: "full-time",
    },

    level: {
      type: String,
      required: [true, "Job level is required"],
      enum: {
        values: ["junior", "mid", "senior"],
        message: "Level must be junior, mid, or senior",
      },
      default: "junior",
    },

    skills: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 30;
        },
        message: "Skills cannot exceed 30 items",
      },
    },

    salaryRange: {
      min: {
        type: Number,
        min: [0, "Minimum salary cannot be negative"],
        default: null,
      },
      max: {
        type: Number,
        min: [0, "Maximum salary cannot be negative"],
        default: null,
      },
      currency: {
        type: String,
        trim: true,
        default: "EUR",
        maxlength: [5, "Currency code too long"],
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Job must belong to an employer"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Normalize skills automatically
jobSchema.pre("save", function () {
  if (this.skills && Array.isArray(this.skills)) {
    this.skills = this.skills
      .map((s) => String(s).trim().toLowerCase())
      .filter(Boolean);
  }
 
});

// Indexes
jobSchema.index({ title: "text", description: "text" });
jobSchema.index({ createdBy: 1, createdAt: -1 });
jobSchema.index({ location: 1, type: 1, level: 1 });

export default mongoose.model("Job", jobSchema);
