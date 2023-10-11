import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import generalRoutes from "./routes/general.mjs";



// data imports
import User from "./model/User.mjs";
import {dataUser} from "./data/index.mjs"


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/general", generalRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
const connectToMongo = async()=>{
    await mongoose.connect(process.env.MONGO_URL, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log("Database connected !")

    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser);
}

connectToMongo().catch((error)=>{console.log("Error occured: " + error.message)})

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
   

    