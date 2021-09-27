const express = require('express');
const { Workouts } = require('../models/Workout');
const mongoose = require("mongoose");
const logger = require('morgan');

const app = express();

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

app.get('/api/workouts', (req, res) => {
    Workouts.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.get('/api/workouts/range');

app.post('/exercise', async (req, res) => {
    try {
        const newWorkout = await Workouts.create(req.body);
        res.status(200).json(newWorkout)
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = app;