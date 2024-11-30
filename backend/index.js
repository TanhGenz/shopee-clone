// import các dependencies mà vừa tải về
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

// dotenv.config();
require("dotenv").config({ path: "./path/to/.env" });
const app = express();

dotenv.config();
async function connect() {
  try {
    // Connect to MongoDB using Promise-based approach
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB successfully!");
    console.log(process.env.MONGODB_URL);

    // Perform operations using the connected MongoDB client
    // ...
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
connect();

// ngăn chặn CORS Origin Error
app.use(cors());

// tạo cookies và gắn cookies cho web
app.use(cookieParser());

// những request sẽ được trả về json
app.use(express.json());

app.listen(8000, () => {
  console.log("Server is running");
});

// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

// AUTHENTICATION

// AUTHORIZATION

// Json web token
