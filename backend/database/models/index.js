// Import models
const User = require('./User.model');
const Exercise = require('./Exercise.model');
const Workout = require('./Workout.model');
const WorkoutExercise = require('./WorkoutExercise.model');
const Set = require('./Set.model');

// Users have multiple workouts
User.hasMany(Workout, {
    foreignKey: 'user_id'
});
Workout.belongsTo(User, {
    foreignKey: 'user_id'
});

// Each workout has a list of ordered exercises
Workout.hasMany(WorkoutExercise, {
    foreignKey: 'workout_id'
});
WorkoutExercise.belongsTo(Workout, {
    foreignKey: 'workout_id'
});

// Each workout exercise corresponds to an exercise
Exercise.hasMany(WorkoutExercise, {
    foreignKey: 'exercise_id'
});
WorkoutExercise.belongsTo(Exercise, {
    foreignKey: 'exercise_id'
});

// Each workout exercise has many ordered sets
WorkoutExercise.hasMany(Set, {
    foreignKey: 'workout_exercise_id'
});
Set.belongsTo(WorkoutExercise, {
    foreignKey: 'workout_exercise_id'
});

// Export all models
module.exports = {
    User,
    Exercise,
    Workout,
    WorkoutExercise,
    Set,
};