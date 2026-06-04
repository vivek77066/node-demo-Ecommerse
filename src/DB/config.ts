import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectDB = async (): Promise<void> => {
    const url = process.env.MONGO_URL!;
   
        mongoose.connect(url).then(() => {
          console.log("mongodb connected");
        }).catch((error) => {
            console.log(`database connection error${error}`);
      })
    }

export default connectDB;