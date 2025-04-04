const express = require('express');
const router = express.Router();
const auth = require("./middlewares/authentication")
const authController = require('./controllers/auth.controller');
const exoController = require('./controllers/exo.controller');
const workoutController = require('./controllers/workout.controller');
const exerciseController = require('./controllers/exo.controller');
const setController = require('./controllers/set.controller');

// Public routes

router.post(
    '/register',
    authController.register,
);

router.post(
    '/login',
    authController.login,
);

// Auth routes

router.get(
    '/me',
    auth.authenticateJwt,
    authController.me,
);

router.get(
    '/workouts',
    auth.authenticateJwt,
    workoutController.index,
);
router.get(
    '/workouts/:id',
    auth.authenticateJwt,
    workoutController.show,
);
router.post(
    '/workouts',
    auth.authenticateJwt,
    workoutController.store,
);

router.post(
    '/workouts/:id/exercises',
    auth.authenticateJwt,
    exerciseController.store,
);

router.get(
    '/exos/:id',
    auth.authenticateJwt,
    exoController.show,
);

router.post(
    '/exercises/:id/sets',
    auth.authenticateJwt,
    setController.store,
);

// Admin routes

// Setup admin auth later, now it's just a simple auth
router.post(
    '/exos',
    auth.authenticateJwt,
    exoController.store,
);

module.exports = router;