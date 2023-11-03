require("dotenv").config({
  path: __dirname + "/.env",
});

const express = require("express");
const cors = require("cors");
const PORT = 8000;

const sql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/static", express.static("public"));

//Routing
// app ROUTING di sini

// 404 middleware
app.use((req, res) => {
  console.log(`404: ${req.url}`);
  res.status(404).json({
    msg: "Not found Broo!!",
  });
});

// 500 middleware
app.use((err, req, res, next) => {
  console.log(`500: ${req.url}`);
  console.log(err);
  res.status(500).json({
    msg: "Internal Server Error Broo!!",
    err,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT} Gilee!!`);
});
