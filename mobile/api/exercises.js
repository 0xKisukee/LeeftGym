import {getValueFor, save} from "./jwt";

const API_URL = 'https://gym.leeft.fun/api';
const API_URL2 = 'http://localhost:3000/api';

export async function getAllExos() {
    try {
        const response = await fetch(
            API_URL + '/exos',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );

        const json = await response.json();
        return json;

    } catch (error) {
        alert(error);
    }
}

module.exports = {
    getAllExos
}