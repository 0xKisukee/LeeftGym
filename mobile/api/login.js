import {get, post} from "./main";
import {getValueFor} from "./jwt";

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
        console.log(error);
        throw error; // Propager l'erreur pour que isAuth puisse la gérer
    }
}

export async function isAuth() {
    const token = await getValueFor("userJWT");
    if (!token) {
        console.log("not auth - no token");
        return false;
    }

    try {
        const userInfos = await me();
        return userInfos;
    } catch (error) {
        console.log("Auth error - token expired or invalid:", error);
        return false;
    }
}