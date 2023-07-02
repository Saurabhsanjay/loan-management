const { sequelize } = require("./src/db/connection");
const colors = require("colors");
const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const applicationRoutes = require("./src/routes/application.route");
const userRoutes = require("./src/routes/user.route");
const morgan = require("morgan");
require("dotenv").config({ path: "./.env" });

const app = express();
const file = fs.readFileSync(
  "./80224907A0A00FC9629D24B6C658D222.txt"
);
// for Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
const {
  handleRouteNotFound,
  errorHandler,
} = require("./src/middlewares/error-handler");

app.use(cors());
app.options("*", cors());

// for Parsing incoming JSON data
app.use(express.json());

// to Log HTTP requests in the console
app.use(morgan("dev"));

//app routes
app.use("/v1", applicationRoutes);
app.use("/v1", userRoutes);

//error handlers
app.use(handleRouteNotFound);
app.use(errorHandler);


(
  //Sync the model with the database
  async () => {
    try {
      await sequelize.sync();
      console.log("Sequelize Database synced");
    } catch (error) {
      console.error("Error syncing database:", error);
    }
  }
)();

// for Starting the server
const PORT = process.env.PORT || 3000;
app.get(
  "/.well-known/pki-validation/80224907A0A00FC9629D24B6C658D222.txt",
  (req, res) => {
    res.sendFile(file, "hello from ssl srver");
  }
);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgBlue);
});

// const sslServer=https.createServer({
//   key:'',
//   cert:'',
// },app)

// sslServer.listen(3443,()=>console.log(`Secure sever on port 3443`))

