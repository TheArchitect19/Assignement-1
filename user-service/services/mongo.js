import mongoose from "mongoose";
import { MONGO_URI } from "../config/index.js";

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected");
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
}

export default connect;