const catchAsync = require('../utils/catchAsync.js');
const setService = require('../services/set.service.js');

const store = catchAsync(async (req, res) => {
    const result = await setService.store(req.auth.userId, req.params.id, req.body);
    res.status(254).json(result);
});

module.exports = {
    store,
};