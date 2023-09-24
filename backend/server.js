import express from "express"
import colors from "colors"
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from "./config/dbconfig.js";
import authRoute from './routes/authRoute.js'
import categoryRoutes  from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url';

const app = express();

//configure env file
dotenv.config();

//database config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,"../client/build")))



// port
const PORT = process.env.PORT || 8080;

//rest get api
app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

//Routes
app.use('/api/v1/auth', authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// run listen
app.listen(PORT,() => {
    console.log(colors.red(`Server is in  ${process.env.DEV_MODE} mode running on ${PORT}`.bgCyan.white))
})


// conatin main route