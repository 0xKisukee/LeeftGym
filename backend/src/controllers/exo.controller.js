const catchAsync = require('../utils/catchAsync.js');
const exoService = require('../services/exo.service.js');

const index = catchAsync(async (req, res) => {
    const result = await exoService.index();
    res.status(254).json(result);
});

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
    index,
    show,
    store,
};