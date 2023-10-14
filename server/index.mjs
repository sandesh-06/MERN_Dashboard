// ER Diagram for modules - https://lucid.app/lucidchart/81ff5432-cc50-4c41-a7b8-7258fec1e630/view?page=0_0#
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import generalRoutes from "./routes/general.mjs";
import clientRoutes from "./routes/client.mjs"
import salesRoutes from "./routes/sales.mjs"


// data imports
// import User from "./model/User.mjs";
import {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat} from "./data/index.mjs"
import Product from "./model/Product.mjs";
import ProductStat from "./model/ProductStat.mjs";
import Transaction from "./model/Transaction.mjs";
import OverallStat from "./model/OverallStat.mjs";
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
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
// app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);


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
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat)

}

connectToMongo().catch((error)=>{console.log("Error occured: " + error.message)})

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
   

    