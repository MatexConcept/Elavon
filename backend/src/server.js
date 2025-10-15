import express from "express";
import dotenv from "dotenv"; 
import {initDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"

import transactionsRoute from "./routes/transactionsRoute.js";
import elavonRoutes from './routes/elavonRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

import job from "./config/cron.js";


dotenv.config()

const app = express();

if(process.env.NODE_ENV === "production") job.start();

// middleware
app.use(rateLimiter)
app.use(express.json());

const PORT = process.env.PORT || 5001;


app.get("/api/health", (req,res) => {
    res.status(200).json({status:"ok"})
});


app.use("/api/transactions", transactionsRoute);
app.use("/api/elavon", elavonRoutes);
app.use("/api", settingsRoutes);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT)
    })
})

// app.listen(PORT, () => {
//     console.log("my server is running on PORT:",PORT)
// });
