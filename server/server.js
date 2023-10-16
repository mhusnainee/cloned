require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectToMongoDB = require("./db");
const cors = require("cors");

const { user_routes, superUser_routes } = require("./routes");
//connect to MongoDB
connectToMongoDB();
// connect to server

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use("/api/", user_routes);
app.use("/api/su", superUser_routes);

const port = process.env.PORT || 80;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log("Server is running on port ", port);
});
