const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(limiter);
app.set("trust proxy", 1); // Trust first proxy

// Set static folder
app.use(express.static("public"));

// Routes
app.use("/api", require("./routes/index"));

// Enable CORS
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
