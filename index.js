import express from "express";
import mongoose from 'mongoose';
import multer from "multer";

import { UserController, PostController } from './controllers/index.js';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import { checkAuth, handleValidationsErrors } from './utils/index.js';

mongoose
    .connect("mongodb+srv://daniil:<password>@cluster0.30vkd.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB ok"))
    .catch((error) => console.log("DB error", error));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handleValidationsErrors, UserController.login)
app.post("/auth/register", registerValidation, handleValidationsErrors, UserController.register)
app.get("/auth/me", checkAuth, UserController.getMe)

app.get("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({ url: `/uploads/${req.file.originalname}` })
})

// POSTS
app.post("/posts", checkAuth, postCreateValidation, PostController.createPost)
app.get("/posts", checkAuth, PostController.getAll)
app.get("/posts/:id", checkAuth, PostController.getOne)
app.delete("/posts/:id", checkAuth, PostController.deletePost)
app.patch("/posts/:id", checkAuth, postCreateValidation, PostController.updatePost)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})