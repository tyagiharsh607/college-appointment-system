const express = require("express");
const indexRoutes = require("./routes/indexRoutes");
require("dotenv/config");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();
connectDB();

// Middleware setup
app.use(express.json()); // For parsing JSON bodies
app.use(cookieParser()); // For parsing cookies
app.use("/api", indexRoutes); // Use indexRoutes for all API routes

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
