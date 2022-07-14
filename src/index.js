const express = require("express");
const userRoute = require("./routes/user");
const path = require("path");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node MongoDB API",
      version: "1.0.0",
    },
    servers: [
     { 
      url: "hhtp://localhost:9000",
    }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};


// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)));

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection 
const mongoose = require("mongoose");
require('dotenv').config();

// Use this string as a sample In case of have mongo server in local 
//console.log("mongodb://localhost:27017/[NODE-MONGODB-API]",process.env.MONGODB_URI)
// process.env must be in the same folder as package.json
//console.log(process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error)); 

// server listening
app.listen(port, () => console.log("Server listening to", port));
