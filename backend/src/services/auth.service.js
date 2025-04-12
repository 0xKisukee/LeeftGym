const { AppError } = require('../utils/appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../../database/models');

async function register(data) {
    const { email, username, password } = data;

    // Check if email already used
    const existingUser = await models.User.findOne({
        where: { email: email }
    });
    if (existingUser) {
        throw new AppError('Email already used', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user to the database
    await models.User.create({
        email: email,
        username: username,
        password: hashedPassword,
    });

    // Login
    return await login({ email: email, password: password });
}

async function login(data) {
    const { email, password } = data;

    // Check email
    const user = await models.User.findOne({
        where: { email }
    });
    if (!user) {
        throw new AppError('Wrong email', 400);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Wrong password', 400);
    }

    // Generate JWT token with user infos
    const token = jwt.sign(
        {
            userId: user.id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return {
        token,
        user: {
            userId: user.id,
            username: user.username,
            email: user.email
        }
    };
}

async function getLikedWorkouts(userId) {
    const user = await models.User.findByPk(userId, {
        include: [{
            model: models.Workout,
            as: 'LikedWorkouts',
            attributes: ['id', 'name'],
            through: { attributes: [] }
        }]
    });

    return user.LikedWorkouts;
}

module.exports = {
    register,
    login,
    getLikedWorkouts,
};