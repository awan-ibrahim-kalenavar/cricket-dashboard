import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "https://cricket-dashboard-frontend-4d4e.onrender.com",
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("CricNova Backend Running");
});

// Your routes
// app.use("/api/users", userRoutes);
// app.use("/api/matches", matchRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});