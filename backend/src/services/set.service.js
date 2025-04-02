const {AppError} = require('../utils/appError');
const models = require('../../database/models');
const {Op} = require("sequelize");

async function store(userId, exerciseId, data) {
    const exercise = await models.WorkoutExercise.findByPk(exerciseId);
    if (!exercise) {
        throw new AppError('Exercise not found', 404);
    }

    const workoutId = exercise.workout_id;
    const workout = await models.Workout.findByPk(workoutId);
    if (userId !== workout.user_id) {
        throw new AppError('You can\'t add a to this workout', 400);
    }

    // Calculate orderValue
    let orderValue;
    // Get amount of exercises in the workout
    const sets = await models.Set.findAll({
        where: {workout_exercise_id: exerciseId}
    });

    if (!data.order) {
        // Place this set at the last place
        orderValue = sets.length + 1;
    } else if (data.order > sets.length + 1) {
        orderValue = sets.length + 1;
    } else {
        // Use the specified order
        orderValue = data.order;

        // If a set with this order already exists, shift other sets
        const existingSets = await models.Set.findAll({
            where: {
                workout_exercise_id: exerciseId,
                order: {[Op.gte]: orderValue}
            }
        });

        // Increment the order of all sets that come after this one
        for (const set of existingSets) {
            await set.update({order: set.order + 1});
        }
    }

    return await models.Set.create({
        workout_exercise_id: exerciseId,
        order: orderValue,
        weight: data.weight,
        reps: data.reps,
        completed: data.completed,
    });
}

module.exports = {
    store,
};