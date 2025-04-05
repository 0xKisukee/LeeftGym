const API_URL_2 = 'https://gym.leeft.fun/api';
const API_URL = 'http://localhost:3000/api';

export default async function me(jwtToken) {
    try {
        const response = await fetch(
            API_URL + '/me',
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
        console.error(error);
    }
}