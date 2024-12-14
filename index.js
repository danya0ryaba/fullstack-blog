import express from "express";
import mongoose from 'mongoose';
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from './controllers/UserController.js';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import { createPost, getAll, getOne, deletePost, updatePost } from './controllers/PostController.js'

mongoose
    .connect("mongodb+srv://daniil:<password>@cluster0.30vkd.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB ok"))
    .catch((error) => console.log("DB error", error));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, login)
app.post("/auth/register", registerValidation, register)
app.get("/auth/me", checkAuth, getMe)

// POSTS
app.post("/posts", checkAuth, postCreateValidation, createPost)
app.get("/posts", checkAuth, getAll)
app.get("/posts/:id", checkAuth, getOne)
app.delete("/posts/:id", checkAuth, deletePost)
app.patch("/posts/:id", checkAuth, postCreateValidation, updatePost)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})