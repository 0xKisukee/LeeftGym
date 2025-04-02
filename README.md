# Leeft API

A comprehensive workout tracking system built with Node.js, Express, and Sequelize ORM.

## Overview

This RESTful API allows users to create, manage, and track their workouts. Users can build custom workout routines, track exercises, sets, reps, and weights, and monitor their progress over time.

## Database Schema

The application uses the following data models:

- **User**: Manages user accounts and authentication
- **Workout**: Represents a complete workout session
- **Exercise**: Represents a specific exercise type (e.g., Bench Press, Squat)
- **WorkoutExercise**: Links exercises to workouts with specific ordering and rest times
- **Set**: Tracks individual sets within workout exercises

### Entity Relationships

```js
// Users have multiple workouts
User.hasMany(Workout);
Workout.belongsTo(User);
// Each workout has a list of ordered exercises
Workout.hasMany(WorkoutExercise);
WorkoutExercise.belongsTo(Workout);
// Each workout exercise corresponds to an exercise
WorkoutExercise.belongsTo(Exercise);
Exercise.hasMany(WorkoutExercise);
// Each workout exercise has many ordered sets
WorkoutExercise.hasMany(Set);
Set.belongsTo(WorkoutExercise);
```

## Features

- **User Authentication**: Secure login and registration
- **Workout Management**: Create, view, update, and delete workouts
- **Exercise Library**: Pre-defined exercises with descriptions and categories
- **Set Tracking**: Record weights, reps, and completion status for each set
- **Workout Privacy**: Mark workouts as private or public
- **Workout Duration Tracking**: Calculate total workout time

## API Endpoints

### Authentication
- `POST /api/register`: Create a new user account
- `POST /api/login`: User login
- `GET /api/ME`: User infos

### Workouts
- `GET /api/workouts`: Get user's workouts
- `GET /api/workouts/:id`: Get specific workout details
- `POST /api/workouts`: Create a new workout

### Workout Exercises
- `POST /api/workouts/:id/exercises`: Add exercise to workout

### Sets
- `POST /api/exercises/:id/sets`: Add set to workout exercise

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Backend framework
- **Sequelize**: ORM for database interactions
- **PostgreSQL**: Database
- **JWT**: Authentication
- **bcrypt**: Password hashing