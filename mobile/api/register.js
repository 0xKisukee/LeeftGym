import {post} from "./main";

const API_URL2 = 'https://gym.leeft.fun/api';
const API_URL = 'http://localhost:3000/api';

export default async function register(email, password) {
    try {
        return await post(
            "/register",
            {
                email: email,
                password: password,
            }
        );
    } catch (error) {
        alert(error);
    }
}