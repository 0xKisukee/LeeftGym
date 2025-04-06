const {AppError} = require('../utils/appError');
const models = require('../../database/models');

async function index() {
    return await models.Exo.findAll();
}

async function show(id) {
    return await models.Exo.findByPk(id);
}

async function store(data) {
    return await models.Exo.create({
        name: data.name,
    });
}

module.exports = {
    index,
    show,
    store,
};