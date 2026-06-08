import express from "express"
import connectDB from "./src/DB/config"
import { errorHandler } from "@middlewares/errorHandler";
import routes from '@routes/index'



connectDB();
const app = express();


 app.use(express.json());



app.use("/api/v1", routes);


app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`running port ${PORT}`);
})
