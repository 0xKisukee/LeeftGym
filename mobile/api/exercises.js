import {getValueFor} from "./jwt";

const API_URL_2 = 'https://gym.leeft.fun/api';
const API_URL = 'http://localhost:3000/api';

export default async function getExoNameById(exoId) {
    try {
        const jwtToken = await getValueFor("userJWT");

        const response = await fetch(
            API_URL + '/exos/' + exoId,
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