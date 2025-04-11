import {get, post} from "./main";
import {forget, getValueFor} from "./jwt";

export async function login(email, password) {
    try {
        return await post(
            "/login",
            {
                email: email,
                password: password,
            }
        );

    } catch (error) {
        console.error(error);
    }
}

export async function me() {
    try {
        return await get("/me");
    } catch (error) {
        console.error(error);
        throw error; // Propager l'erreur pour que isAuth puisse la gérer
    }
}