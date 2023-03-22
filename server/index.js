import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express(); //thanks to type: module in package.json
dotenv.config(); //configuration required in order to use env variables

//Connects the server to the database
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB');
    }catch(error) {
        throw error;
    }
};

//Watches for connection changes
mongoose.connection.on("disconnected", () => {
    console.log("mongoDb disconnected");
});

//middlewares

app.use(express.json()); //required in order to send json requests to our express server

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//Connects the server on the given port
app.listen(8800, () => {
    connect();
    console.log("Server started on port 8800!");
});