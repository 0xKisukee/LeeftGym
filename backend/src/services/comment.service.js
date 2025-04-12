const {AppError} = require('../utils/appError');
const models = require('../../database/models');

async function index(workoutId) {
    // Check if workout exists
    const workout = await models.Workout.findByPk(workoutId);
    if (!workout) {
        throw new AppError('Workout not found', 404);
    }

    // Get all comments for the workout
    return await models.Comment.findAll({
        where: { workout_id: workoutId },
        include: [
            {
                model: models.User,
                as: 'User',
                attributes: ['id', 'username']
            }
        ],
        order: [['created_at', 'DESC']]
    });
}

async function store(userId, workoutId, data) {
    // Check if workout exists
    const workout = await models.Workout.findByPk(workoutId);
    if (!workout) {
        throw new AppError('Workout not found', 404);
    }

    // Create the comment
    const comment = await models.Comment.create({
        content: data.content,
        user_id: userId,
        workout_id: workoutId
    });

    // Fetch the comment with user information
    return await models.Comment.findByPk(comment.id, {
        include: [
            {
                model: models.User,
                as: 'User',
                attributes: ['id', 'username']
            }
        ]
    });
}

async function destroy(userId, commentId) {
    // Find the comment
    const comment = await models.Comment.findByPk(commentId);
    if (!comment) {
        throw new AppError('Comment not found', 404);
    }

    // Check if the user is the owner of the comment
    if (comment.user_id !== userId) {
        throw new AppError('Unauthorized to delete this comment', 403);
    }

    // Delete the comment
    await comment.destroy();

    return { message: 'Comment deleted successfully' };
}

module.exports = {
    index,
    store,
    destroy,
}; 