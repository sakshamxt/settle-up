import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("🟢 Connected to database");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;