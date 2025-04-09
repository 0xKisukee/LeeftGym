import {post} from "./main";

const API_URL2 = 'https://gym.leeft.fun/api';
const API_URL = 'http://localhost:3000/api';

export default async function pushWorkout(workout) {
    try {
        console.log("Pushing this workout to db:", workout);

        return await post(
            "/workouts/storeFull",
            {
                name: workout.name,
                is_private: workout.is_private,
                is_routine: workout.is_routine || false,
                started_at: workout.started_at,
                completed_at: new Date(),
                Exercises: workout.Exercises, // this contains sets
            }
        );
    } catch (error) {
        alert(error);
    }
}