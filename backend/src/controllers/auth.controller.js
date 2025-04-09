const catchAsync = require('../utils/catchAsync.js');
const authService = require('../services/auth.service.js');

const register = catchAsync(async (req, res) => {
    const result = await authService.register(req.body);
    res.status(254).json(result);
});

const login = catchAsync(async (req, res) => {
    const result = await authService.login(req.body);
    res.status(254).json(result);
});

const me = catchAsync(async (req, res) => {
    res.status(254).json(req.auth);
});

const likes = catchAsync(async (req, res) => {
    const result = await authService.getLikedWorkouts(req.auth.userId);
    res.status(254).json(result);
});

module.exports = {
    register,
    login,
    me,
    likes,
};