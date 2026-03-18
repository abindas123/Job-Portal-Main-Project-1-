import mongoose from "mongoose";

const User_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["candidate", "employer"],
      index: true,
    },
    CompanyName: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

User_Schema.pre("validate", function () {
  if (this.role === "employer" && !this.CompanyName) {
    this.invalidate("CompanyName", "Companyname needed");
  }
});

export default mongoose.model("User", User_Schema);
