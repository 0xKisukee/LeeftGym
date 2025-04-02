const API_URL = 'https://gym.leeft.fun/api';

export default async function login(email, password) {
    try {
        const response = await fetch(
            API_URL + '/login',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );

        const json = await response.json();
        return json;

    } catch (error) {
        console.error(error);
    }
}