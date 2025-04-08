const express = require('express');
const router = express.Router();
const auth = require("./middlewares/authentication")
const authController = require('./controllers/auth.controller');
const exoController = require('./controllers/exo.controller');
const workoutController = require('./controllers/workout.controller');
const exerciseController = require('./controllers/exercise.controller');
const setController = require('./controllers/set.controller');

// Auth routes

router.post(
    '/register',
    authController.register,
);

router.post(
    '/login',
    authController.login,
);

router.get(
    '/me',
    auth.authenticateJwt,
    authController.me,
);

// Workouts

router.get(
    '/workouts/getAll',
    auth.authenticateJwt,
    workoutController.getAll,
);
router.get(
    '/workouts',
    auth.authenticateJwt,
    workoutController.index,
);
router.post(
    '/workouts',
    auth.authenticateJwt,
    workoutController.store,
);
router.get(
    '/workouts/routines',
    auth.authenticateJwt,
    workoutController.getRoutines,
);
router.get(
    '/workouts/:id',
    auth.authenticateJwt,
    workoutController.show,
);

// Exercises

router.post(
    '/workouts/:id/exercises',
    auth.authenticateJwt,
    exerciseController.store,
);

// Exos

router.get(
    '/exos',
    exoController.index,
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