const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express()
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
    
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://jpolmon-admin:O3ft0ojjSXXmjLWo@cluster0.pgqht.mongodb.net/workoutDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(require('./routes/workoutRoutes.js'));

app.listen(PORT, () => {
console.log(`App running on port ${PORT}!`);
});