import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import morgan from "morgan";
import apiRoutes from "./router";

// initialize
const app = express();

app.use(cors());

app.use(morgan("dev"));

app.set("view engine", "ejs");

app.use(express.static("static"));

app.set("views", path.join(__dirname, "../src/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use("/api", apiRoutes);

// default index route
app.get("/", (req, res) => {
  res.send("This is an API server for Berhenti!");
});

// START THE SERVER
async function startServer() {
  try {
    // connect DB
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/9090";
    await mongoose.connect(mongoURI);
    console.log(`Mongoose connected to: ${mongoURI}`);

    const port = process.env.PORT || 9090;
    app.listen(port);

    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error(error);
  }
}

startServer();
