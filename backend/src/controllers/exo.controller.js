const catchAsync = require('../utils/catchAsync.js');
const exoService = require('../services/exo.service.js');

const show = catchAsync(async (req, res) => {
    const result = await exoService.show(req.params.id);
    res.status(254).json(result);
});

const store = catchAsync(async (req, res) => {
    // Check role here later
    const result = await exoService.store(req.body);
    res.status(254).json(result);
});

module.exports = {
    show,
    store,
};