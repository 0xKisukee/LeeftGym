const {AppError} = require('../utils/appError');
const models = require('../../database/models');

async function show(id) {
    return await models.Exercise.findByPk(id);
}

async function store(data) {
    return await models.Exercise.create({
        name: data.name,
    });
}

module.exports = {
    show,
    store,
};