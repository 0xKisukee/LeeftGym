const {AppError} = require('../utils/appError');
const {Op} = require('sequelize');
const models = require('../../database/models');

async function store(userId, workoutId, data) {
    const workout = await models.Workout.findByPk(workoutId);
    if (!workout) {
        throw new AppError('Workout not found', 404);
    }
    if (userId !== workout.user_id) {
        throw new AppError('You can\'t add an exercise this workout', 400);
    }

    // Check if exercise exists
    const exercise = await models.Exercise.findByPk(data.exercise_id);
    if (!exercise) {
        throw new AppError('Exercise not found', 404);
    }

    // Calculate orderValue
    let orderValue;
    // Get amount of exercises in the workout
    const workoutExercises = await models.WorkoutExercise.findAll({
        where: {workout_id: workoutId}
    });

    if (!data.order) {
        // Place this exercise at the last place
        orderValue = workoutExercises.length + 1;
    } else if (data.order > workoutExercises.length + 1) {
        orderValue = workoutExercises.length + 1;
    } else {
        // Use the specified order
        orderValue = data.order;

        // If an exercise with this order already exists, shift other exercises
        const existingExercises = await models.WorkoutExercise.findAll({
            where: {
                workout_id: workoutId,
                order: {[Op.gte]: orderValue}
            }
        });

        // Increment the order of all exercises that come after this one
        for (const exercise of existingExercises) {
            await exercise.update({order: exercise.order + 1});
        }
    }

    return await models.WorkoutExercise.create({
        workout_id: workoutId,
        exercise_id: data.exercise_id,
        order: orderValue,
        rest_time: data.rest_time, // maybe add || 180
    });
}

module.exports = {
    store,
};