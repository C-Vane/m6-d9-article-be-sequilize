const express = require("express");

const db = require("./db/index");

const cors = require("cors");

const server = express();

const articlesRoute = require("./services/articles");
server.use(cors());

server.use(express.json());

///routes
server.use("/articles", articlesRoute);

///error handlers

//create tables

db.sequelize.sync({ force: false }).then((result) => {
  server.listen(process.env.PORT || 3002, () => {
    console.log("server is running on port ", process.env.PORT || 3002);
  });
});
