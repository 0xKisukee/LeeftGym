// Import models
const User = require('./User.model');
const Exo = require('./Exo.model');
const Workout = require('./Workout.model');
const Exercise = require('./Exercise.model');
const Set = require('./Set.model');

// Users have multiple workouts
User.hasMany(Workout, {
    foreignKey: 'user_id'
});
Workout.belongsTo(User, {
    foreignKey: 'user_id'
});

// Each workout has a list of ordered exercises
Workout.hasMany(Exercise, {
    foreignKey: 'workout_id'
});
Exercise.belongsTo(Workout, {
    foreignKey: 'workout_id'
});

// Each workout exercise corresponds to an exercise
Exo.hasMany(Exercise, {
    foreignKey: 'exo_id'
});
Exercise.belongsTo(Exo, {
    foreignKey: 'exo_id'
});

// Each workout exercise has many ordered sets
Exercise.hasMany(Set, {
    foreignKey: 'exercise_id'
});
Set.belongsTo(Exercise, {
    foreignKey: 'exercise_id'
});

// Export all models
module.exports = {
    User,
    Exo,
    Workout,
    Exercise,
    Set,
};