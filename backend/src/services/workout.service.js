const {AppError} = require('../utils/appError');
const models = require('../../database/models');
const exerciseService = require('./exercise.service');
const setService = require('./set.service');

// This getAll function doesnt return routines
async function getAll() {
    return await models.Workout.findAll({
        where: {
            is_routine: false
        },
        include: [
            {
                model: models.User,
                as: 'User',
                attributes: {
                    exclude: ['password'],
                }
            },
            {
                model: models.Exercise,
                as: 'Exercises',
                include: [
                    {
                        model: models.Exo,
                        as: 'Exo',
                    },
                    {
                        model: models.Set,
                        as: 'Sets',
                    }
                ]
            },
            {
                model: models.User,
                as: 'LikedByUsers',
                attributes: ['id'],
                through: { attributes: [] }
            },
            {
                model: models.Comment,
                as: 'Comments',
                attributes: ['id', 'content'],
                include: [
                    {
                        model: models.User,
                        as: 'User',
                        attributes: {
                            exclude: ['password', 'email', 'createdAt'],
                        }
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']],
        limit: 20,
    })
}

async function index(userId) {
    return await models.Workout.findAll({
        where: {
            user_id: userId,
        },
        include: [
            {
                model: models.User,
                as: 'User',
                attributes: {
                    exclude: ['password'],
                }
            },
            {
                model: models.Exercise,
                as: 'Exercises',
                include: [
                    {
                        model: models.Exo,
                        as: 'Exo',
                    },
                    {
                        model: models.Set,
                        as: 'Sets',
                    }
                ]
            },
            {
                model: models.User,
                as: 'LikedByUsers',
                attributes: ['id', 'email'],
                through: { attributes: [] }
            },
            {
                model: models.Comment,
                as: 'Comments',
                attributes: ['id', 'content'],
                include: [
                    {
                        model: models.User,
                        as: 'User',
                        attributes: {
                            exclude: ['password', 'email', 'createdAt'],
                        }
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']]
    })
}

async function show(userId, workoutId) {
    const workout = await models.Workout.findByPk(workoutId, {
        include: [
            {
                model: models.Exercise,
                as: 'Exercises',
                include: [
                    {
                        model: models.Exo,
                        as: 'Exo',
                    },
                    {
                        model: models.Set,
                        as: 'Sets',
                    }
                ],
                order: [['order', 'ASC']]
            },
            {
                model: models.User,
                as: 'LikedByUsers',
                attributes: ['id'],
                through: { attributes: [] }
            },
            {
                model: models.Comment,
                as: 'Comments',
                attributes: ['id', 'content'],
                include: [
                    {
                        model: models.User,
                        as: 'User',
                        attributes: {
                            exclude: ['password', 'email', 'createdAt'],
                        }
                    }
                ]
            }
        ]
    });
    if (!workout) {
        throw new AppError('Workout not found', 404);
    }

    if (userId !== workout.user_id && workout.is_private) {
        throw new AppError('You can\'t see this workout', 400);
    }

    return workout;
}

async function store(userId, data) {
    return await models.Workout.create({
        name: data.name,
        is_private: data.is_private,
        is_routine: data.is_routine || false,
        started_at: data.started_at,
        completed_at: data.completed_at,
        user_id: userId
    });
}

async function storeFull(userId, data) {
    // Pushing workout
    const workout = await models.Workout.create({
        name: data.name,
        is_private: data.is_private,
        is_routine: data.is_routine || false,
        started_at: data.started_at,
        completed_at: data.completed_at,
        user_id: userId
    });

    // Pushing exercises
    const exercisesData = data.Exercises;
    for (const exerciseData of exercisesData) {
        const exercise = await exerciseService.store(userId, workout.id, exerciseData);

        // Pushing sets
        const setsData = exerciseData.Sets;
        for (const setData of setsData) {
            await setService.store(userId, exercise.id, setData);
        }
    }

    // Fetch the complete workout with all relations
    const completeWorkout = await models.Workout.findByPk(workout.id, {
        include: [
            {
                model: models.Exercise,
                as: 'Exercises',
                include: [
                    {
                        model: models.Exo,
                        as: 'Exo',
                    },
                    {
                        model: models.Set,
                        as: 'Sets',
                    }
                ],
                order: [['order', 'ASC']]
            }
        ]
    });

    return completeWorkout;
}

async function getRoutines(userId) {
    const workouts = await models.Workout.findAll({
        where: {
            user_id: userId,
            is_routine: true
        },
        include: [
            {
                model: models.Exercise,
                as: 'Exercises',
                include: [
                    {
                        model: models.Exo,
                        as: 'Exo',
                    },
                    {
                        model: models.Set,
                        as: 'Sets',
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']]
    })

    return workouts;
}

async function like(userId, workoutId) {
    const user = await models.User.findByPk(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
    }
    const workout = await models.Workout.findByPk(workoutId);
    if (!workout) {
        throw new Error(`Workout with ID ${workoutId} not found.`);
    }

    // Check if the user has already liked this workout
    const likedWorkouts = await user.getLikedWorkouts({
        where: { id: workoutId }
    });
    const hasLiked = likedWorkouts.length > 0;
    
    if (hasLiked) {
        // Remove the like
        await user.removeLikedWorkout(workout);
    } else {
        // Add the like
        await user.addLikedWorkout(workout);
    }
    
    // Fetch the updated workout with likes count
    const updatedWorkout = await models.Workout.findByPk(workoutId, {
        include: [
            {
                model: models.User,
                as: 'User',
                attributes: {
                    exclude: ['password'],
                }
            },
            {
                model: models.Exercise,
                as: 'Exercises',
            },
            {
                model: models.User,
                as: 'LikedByUsers',
                attributes: ['id'],
                through: { attributes: [] }
            }
        ]
    });
    
    return updatedWorkout;
}

async function deleteWorkout(userId, workoutId) {
    const workout = await models.Workout.findByPk(workoutId);
    if (!workout) {
        throw new AppError('Workout not found', 404);
    }

    // Check if the user owns this workout
    if (workout.user_id !== userId) {
        throw new AppError('You do not have permission to delete this workout', 403);
    }

    // Delete the workout (this will cascade delete related exercises and sets)
    await workout.destroy();
    
    return { message: 'Workout deleted successfully' };
}

module.exports = {
    index,
    show,
    store,
    storeFull,
    getRoutines,
    getAll,
    like,
    deleteWorkout,
};