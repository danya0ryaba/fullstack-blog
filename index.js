import express from "express";
import mongoose from 'mongoose';
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from './controllers/UserController.js';

mongoose
    .connect("mongodb+srv://daniil:<password>@cluster0.30vkd.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB ok"))
    .catch((error) => console.log("DB error", error));

const app = express();

app.use(express.json());

app.post("/auth/login", login)
app.post("/auth/register", register)
app.get("/auth/me", checkAuth, getMe)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})