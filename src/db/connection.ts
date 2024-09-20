import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoDbURL: string = process.env.MONGOOSE_CONNECTION_STRING || "mongodb://localhost:27017/typescript";
    await mongoose.connect(mongoDbURL);
    console.log("MongoDB database connection is established");
  } catch (err) {
    console.error(`DB Error: ${err}`);
    // process.exit(1); // Exit process with failure
  }
};

export default connectDB;
