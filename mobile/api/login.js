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
        console.error(error);
    }
}

export async function isAuth() {
    const token = await getValueFor("userJWT");
    if (!token) {
        console.log("not auth");
        return false;
    }

    const userInfos = await me();

    if (!userInfos.userId) {
        console.log("auth expired");
        return false;
    } else {
        console.log("auth ok");
        return userInfos;
    }
}