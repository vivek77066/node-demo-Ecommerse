import express from "express"
import connectDB from "./src/DB/config"
connectDB();
import userRoute from './src/routes/user.route'
import authRoute from './src/routes/auth.route'
import { errorHandler } from "./src/middleware/errorHandler";
import productRoute from "./src/routes/product.route"

const app = express();
app.use(express.json());



app.use("/api/v1", userRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", productRoute);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`running port ${PORT}`);
})
