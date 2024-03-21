const express = require("express");
const path = require("path");
const dbConn = require("./config/dbConn");
const { default: mongoose } = require("mongoose");
const { PORT = 4000 } = process.env;

const app = express();

// Middleware that looks at requests where the Content-Type header matches the type option, and converts the body into a JavaScript object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
// app.use('/', express.static(path.join(__dirname, '..', 'dist')));

// Serve requests from the router
app.use("/users", require(path.join(__dirname, "routes", "userRoutes")));
app.use("/blogs", require(path.join(__dirname, "routes", "blogRoutes")));

// // Handle client routing, return all requests to the app
// app.get("*", (_, res) => {
// res.sendFile(path.join(__dirname, "..", "dist", "index.html"), (err) => {
//   if (err) console.log(err);
// });
// });

dbConn();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB", error);
});
