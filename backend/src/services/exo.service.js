const {AppError} = require('../utils/appError');
const models = require('../../database/models');

async function show(id) {
    return await models.Exo.findByPk(id);
}

async function store(data) {
    return await models.Exo.create({
        name: data.name,
    });
}

module.exports = {
    show,
    store,
};