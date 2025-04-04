const catchAsync = require('../utils/catchAsync.js');
const exerciseService = require('../services/exercise.service.js');

const store = catchAsync(async (req, res) => {
    const result = await exerciseService.store(req.auth.userId, req.params.id, req.body);
    res.status(254).json(result);
});

module.exports = {
    store,
};