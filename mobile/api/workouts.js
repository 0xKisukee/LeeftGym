import {getValueFor} from "./jwt";

const API_URL = 'https://gym.leeft.fun/api';

export default async function getWorkouts(jwtToken) {
    try {
        const response = await fetch(
            API_URL + '/workouts',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
            }
        );

        const json = await response.json();
        return json;

    } catch (error) {
        alert(error);
    }
}

export async function createWorkout(workout) {
    try {
        const jwtToken = await getValueFor("userJWT");

        const response = await fetch(
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
                    started_at: Date.now(),
                }),
            }
        );

        const json = await response.json();
        console.log(json);
        return json;

    } catch (error) {
        alert(error);
    }
}