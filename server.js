// const express = require("express");
import express from "express" //  "type":"module",  (changes in package)
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoutes.js"
import path, {dirname}  from "path"
import { fileURLToPath } from "url"
import bodyParser from "body-parser"

// Get directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configure env
dotenv.config()

//database config

connectDB()

//rest object

const app = express()

//middelwares
app.use(cors())
// app.use(express.json());
app.use(express.json({ limit: "50mb" })) // PayloadTooLargeError: request entity too large(413 Content Too Large)
app.use(express.urlencoded({ limit: "50mb" }))
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./frontend/build")))

//routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

//rest api

// app.get("/", (req, res) => {
//   res.send(
//     // { message: "Welcome to MyShop" }
//     "<h1>Welcome to MyShop</h1>"
//   );
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
})

//PORT
const PORT = process.env.PORT || 8080

//run listen

app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}.bgCyan.white`
  )
})
