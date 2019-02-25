//server.js
const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const helmet = require("helmet");
// init project
const atob = require("atob");
const btoa = require("btoa");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const cors = require("cors");

const mongoose = require("mongoose");
const moment = require("moment");
const { ApolloServer, gql } = require("apollo-server-express");

const { log } = console;
const typeDefs = require("./server/graphql/schema");
const resolvers = require("./server/graphql/resolvers");
// yard;

const {
  ExerciseLogGet
} = require("./server/graphql/resolveFuncs/ExerciseLogGet");

const { Exercise } = require("./server/models/Exercise");
const { ExerciseUser } = require("./server/models/ExerciseUser");

console.clear();

const app = express();
const port = process.env.REACT_APP_PORT || 8080;

const connectionString = process.env.REACT_APP_MONGO_ATLAS_CONNECTION_STRING.replace(
  "'",
  ""
);

// configure apollo server for graphql
const server = new ApolloServer({
  typeDefs,
  resolvers
  // playground: {
  //   // settings: {
  //   //   'editor.theme': 'light',
  //   // },
  //   // tabs: [
  //   //   {
  //   //     endpoint,
  //   //     query: defaultQuery,
  //   //   },
  //   // ],
  // }
});

server.applyMiddleware({ app });

// mongoose connection
const db = mongoose.connect(connectionString, {
  useNewUrlParser: true,
  dbName: "test"
});

db.then(
  database => {
    log("we're connected to mongoDB!");
    log(Date.now());
    log("==============================\n\n");
    // log(
    //   `
    //   host: ${database.connections[0]}
    //   `
    // )
  },
  err => {
    console.error(err.message ? err.message : err);
  }
).catch(err => {
  console.error(err);
});

app.use(favicon(__dirname + "/build/favicon.ico"));
// // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/ping", function(req, res) {
//   return res.send("pong");
// });
// app.get("/*", function(req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// app.listen(port);
app.use(helmet());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/*", function(req, res) {
  if (req.path === "/api/exercise/log") return ExerciseLogGet(req, res);
  res.sendFile(path.join(__dirname, "build", "index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(process.env.PORT || port);
