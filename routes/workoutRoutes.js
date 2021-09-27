const express = require('express');
const { Workouts } = require('../models/Workout');
const mongoose = require("mongoose");
const logger = require('morgan');
const path = require('path');

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

app.get('/exercise', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/exercise.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/stats.html'));
});

app.get('/api/workouts/range', async (req, res) => {
    try {
        const dbWorkouts = await Workouts
            .find({})
            .sort({ day: -1 })
            .limit(7);
        res.status(200).json(dbWorkouts);
    } catch (err) {
        res.status(400).json(err);
    } 
});

app.post('/api/workouts', async (req, res) => {
    try {
        const newWorkout = await Workouts.create({
            day: new Date(new Date().setDate(new Date().getDate())), 
            exercises: [] });
        res.status(200).json(newWorkout);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.put('/api/workouts/:id', async (req, res) => {
    try {
        const updateWorkout = await Workouts.findOneAndUpdate(
            { _id: req.params.id }, 
            { $push: { exercises: req.body } }, 
            { new: true, runValidators: true },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
        res.status(200).json(updateWorkout);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = app;