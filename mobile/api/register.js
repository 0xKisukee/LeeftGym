const API_URL_2 = 'https://gym.leeft.fun/api';
const API_URL = 'http://localhost:3000/api';

export default async function register(email, password) {
    try {
        const response = await fetch(
            API_URL + '/register',
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
        alert(error);
    }
}