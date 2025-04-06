const catchAsync = require('../utils/catchAsync.js');
const workoutService = require('../services/workout.service.js');

const index = catchAsync(async (req, res) => {
    const result = await workoutService.index(req.auth.userId);
    res.status(254).json(result);
});

const show = catchAsync(async (req, res) => {
    const result = await workoutService.show(req.auth.userId, req.params.id);
    res.status(254).json(result);
});

const store = catchAsync(async (req, res) => {
    const result = await workoutService.store(req.auth.userId, req.body);
    res.status(254).json(result);
});

const getRoutines = catchAsync(async (req, res) => {
    const result = await workoutService.getRoutines(req.auth.userId);
    res.status(254).json(result);
});

module.exports = {
    index,
    show,
    store,
    getRoutines,
};