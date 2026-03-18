import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected database");
  } catch (err) {
    console.log("not connected",err.message);
    throw err
  }
};

export default connectdb;
