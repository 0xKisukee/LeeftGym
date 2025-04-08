import {getValueFor} from "./jwt";

const API_URL = 'https://gym.leeft.fun/api';
const API_URL2 = 'http://localhost:3000/api';

export async function getWorkouts() {
    try {
        const jwtToken = await getValueFor("userJWT");

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

export async function getRoutines() {
    try {
        const jwtToken = await getValueFor("userJWT");

        const response = await fetch(
            API_URL + '/workouts/routines',
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

export async function getAll() {
    try {
        const jwtToken = await getValueFor("userJWT");

        const response = await fetch(
            API_URL + '/workouts/getAll',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
            }
        );
        if (!response.ok) {
            throw new Error('Failed to fetch workouts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching workouts:', error);
        throw error;
    }
}