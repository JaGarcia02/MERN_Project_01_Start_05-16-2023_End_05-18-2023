import express from "express";
// const express = require("express");
import bodyParser from "body-parser";
// const bodyParser = require("body-parser");
import mongoose from "mongoose";
// const mongoose = require("mongoose");
import cors from "cors";
// const cors = require("cors");
import dotenv from "dotenv";
// const dotenv = require("dotenv");
import multer from "multer";
// const multer = require("multer");
import helmet from "helmet";
// const helmet = require("helmet");
import morgan from "morgan";
// const morgan = require("morgan");
import path from "path";
// const path = require("path");
import { fileURLToPath } from "url";
// const fileURLToPath = require("fileURLToPath");
import colors from "colors";
// const colors = require("colors");
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* Configurations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uplod = multer({ storage });

/* Routes with files */
app.post("/auth/register", uplod.single("picture"), register);
app.post("/posts", verifyToken, uplod.single("picture"), createPost);

/* Routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* Mongoose Setup */
const PORT = process.env.PORT || 5150;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Port: ${PORT}`.underline.cyan);
      console.log(`Server Status: Running`.underline.yellow);
      console.log("Database Connection: Connected".underline.magenta);

      /* Add Mock Data 
      Do not forget to comment this User and Post, it will duplicate the data
      */
      //   User.insertMany(users);
      //   Post.insertMany(posts);
    });
  })
  .catch((error) => {
    console.log(`${error}, database didn't connect properly!`);
    console.log("Database Connection: Failed".underline.red);
    console.log("Server Status: Offline".underline.red);
  });
