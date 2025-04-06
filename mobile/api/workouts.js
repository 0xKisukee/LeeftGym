import {getValueFor} from "./jwt";

const API_URL2 = 'https://gym.leeft.fun/api';
const API_URL = 'http://localhost:3000/api';

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