import {getValueFor} from "./jwt";

const API_URL = 'https://gym.leeft.fun/api';

export default async function getExoNameById(exerciseId) {
    try {
        const jwtToken = await getValueFor("userJWT");

        const response = await fetch(
            API_URL + '/exercises/' + exerciseId,
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
        return json.name;

    } catch (error) {
        alert(error);
    }
}