import {getValueFor} from "./jwt";
import getExoNameById from "./exercises";

const API_URL = 'https://gym.leeft.fun/api';

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
        const workoutId = workoutJson.id;



        // Push Exercises
        const workoutExos = workout.WorkoutExercises;

        for (let i = 0; i < workoutExos.length; i++) {
            const workoutExo = workoutExos[i];

            const exoResponse = await fetch(
                API_URL + '/workouts/' + workoutId + '/exercises',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        exercise_id: workoutExo.exercise_id,
                        order: workoutExo.order,
                        rest_time: workoutExo.rest_time,
                    }),
                }
            );
            const exoJson = await exoResponse.json();
            console.log("exo pushed:", exoJson);
            const exoId = exoJson.id;



            // Push sets
            const sets = await workoutExo.Sets;

            for (let i = 0; i < sets.length; i++) {
                const set = sets[i];

                if (!set.completed) continue;

                const setResponse = await fetch(
                    API_URL + '/exercises/' + exoId + '/sets',
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
                const qqq = await setResponse.json();
                console.log("set pushed:", qqq);
            }
        }
        return true

    } catch (error) {
        alert(error);
    }
}