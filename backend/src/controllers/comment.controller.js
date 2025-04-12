const catchAsync = require('../utils/catchAsync.js');
const commentService = require('../services/comment.service.js');

const index = catchAsync(async (req, res) => {
    const result = await commentService.index(req.params.workout_id);
    res.status(254).json(result);
});

const store = catchAsync(async (req, res) => {
    const result = await commentService.store(req.auth.userId, req.params.workout_id, req.body);
    res.status(254).json(result);
});

const destroy = catchAsync(async (req, res) => {
    const result = await commentService.destroy(req.auth.userId, req.params.id);
    res.status(254).json(result);
});

module.exports = {
    index,
    store,
    destroy,
}; 