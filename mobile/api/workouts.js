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