const {AppError} = require('../utils/appError');
const models = require('../../database/models');

async function index(userId) {
    return await models.Workout.findAll({
        where: {
            user_id: userId,
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
        ]
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
                        as: 'Exos',
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
        started_at: data.started_at,
        completed_at: data.completed_at,
        user_id: userId
    });
}

module.exports = {
    index,
    show,
    store,
};