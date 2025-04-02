const catchAsync = require('../utils/catchAsync.js');
const workoutExerciseService = require('../services/workoutExercise.service.js');

const store = catchAsync(async (req, res) => {
    const result = await workoutExerciseService.store(req.auth.userId, req.params.id, req.body);
    res.status(254).json(result);
});

module.exports = {
    store,
};