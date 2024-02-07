import express from "express";
import { connectDatabase } from "./config/database.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.js"
import bodyParser from "body-parser";

dotenv.config()

const app = express()

//listening to this port
app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));

//connect to the database
connectDatabase()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`Connected Successfully`)
})

//routes for signup and login
app.use("/api/auth", userRoute);

//routes for getting user details
app.use("/api/auth/protected", userRoute);