import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

// Used to Connect to Database

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "B12Feed"
        });
        console.log("Connected to DB")
    } catch (err) {
        console.log(err.message)
    }
}

export default connectDB;