import {getValueFor} from "./jwt";
import getExoNameById from "./exercises";

const API_URL2 = 'https://gym.leeft.fun/api';
const API_URL = 'http://localhost:3000/api';

export default async function pushWorkout(workout) {
    try {
        const jwtToken = await getValueFor("userJWT");
        console.log("Pushing this workout to db:", workout);

        // Push Workout
        const workoutResponse = await fetch(
            API_URL + '/workouts',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    name: workout.name,
                    is_private: workout.is_private,
                    started_at: workout.started_at,
                }),
            }
        );
        const workoutJson = await workoutResponse.json();
        console.log("workout pushed:", workoutJson);
        const workoutId = workoutJson.id;



        // Push Exercises
        const exercises = workout.Exercises;

        for (let i = 0; i < exercises.length; i++) {
            const exercise = exercises[i];

            const exerciseResponse = await fetch(
                API_URL + '/workouts/' + workoutId + '/exercises',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        exo_id: exercise.exo_id,
                        order: exercise.order,
                        rest_time: exercise.rest_time,
                    }),
                }
            );
            const exerciseJson = await exerciseResponse.json();
            console.log("exercise pushed:", exerciseJson);
            const exerciseId = exerciseJson.id;



            // Push sets
            const sets = await exercise.Sets;

            for (let i = 0; i < sets.length; i++) {
                const set = sets[i];

                if (!set.completed) continue;

                const setResponse = await fetch(
                    API_URL + '/exercises/' + exerciseId + '/sets',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({
                            order: set.name,
                            weight: set.weight,
                            reps: set.reps,
                            completed: set.completed,
                        }),
                    }
                );
                const setJson = await setResponse.json();
                console.log("set pushed:", setJson);
            }
        }
        return true

    } catch (error) {
        alert(error);
    }
}