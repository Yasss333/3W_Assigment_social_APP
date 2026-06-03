import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongodbconnect } from "./DB_Connect/dbconnect.js";
import authrouter from "./routes/authroutes.js";
import router from "./routes/postroutes.js";
dotenv.config();

const app = express();

app.use(cors());
// IMPORTANT: Order matters! urlencoded first, then json
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`\n>>> [${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

const PORT = process.env.PORT || 3000;

app.use('/api/v1/auth', authrouter);
app.use('/api/v1/posts', router);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// Error handler middleware - MUST be last
app.use((err, req, res, next) => {
  console.error("\n!!! ERROR:", err.message);
  res.status(err.status || 500).json({message: err.message});
});

mongodbconnect();
app.listen(PORT, () => {
  console.log(`\n✅ Server running on port ${PORT}`);
});