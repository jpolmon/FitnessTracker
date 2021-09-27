const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
    },
    
    exercises: {
        type: Array,
    }
});

const Workouts = mongoose.model("Workouts", WorkoutSchema);

module.exports = { Workouts };