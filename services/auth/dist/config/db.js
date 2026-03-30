import mongoose from "mongoose";
import log from "../utils/logger.js";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Zomato_Clone",
        });
        log.info("MONGODB connected successfully.");
    }
    catch (error) {
        log.error(error);
    }
};
export default connectDB;
