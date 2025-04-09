import {post} from "./main";

export default async function register(email, username, password) {
    try {
        return await post(
            "/register",
            {
                email: email,
                username: username,
                password: password,
            }
        );
    } catch (error) {
        alert(error);
    }
}