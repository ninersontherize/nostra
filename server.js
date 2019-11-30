const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const leagues = require("./routes/api/leagues");
const tournaments = require("./routes/api/tournaments");
const teams = require("./routes/api/teams");
const matches = require("./routes/api/matches");
const wagers = require("./routes/api/wagers");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
app.use(express.static("client/public"));
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/leagues", leagues);
app.use("/api/tournaments", tournaments);
app.use("/api/teams", teams);
app.use("/api/matches", matches);
app.use("/api/wagers", wagers);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
// this is heroku's port when we deploy there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));