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
        console.log(error);
        throw error; // Propager l'erreur pour que isAuth puisse la gérer
    }
}

export async function isAuth() {
    const token = await getValueFor("userJWT");
    console.log("starting isAuth() index function, token:", token);
    if (!token) {
        console.log("not auth - no token");
        return false;
    }

    try {
        console.log("trying to call me() function from isAuth()");
        const userInfos = await me();
        return userInfos;
    } catch (error) {
        console.log("Auth error - token expired or invalid:", error);
        forget("userJWT");
        return false;
    }
}