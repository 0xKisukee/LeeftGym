import * as SecureStore from 'expo-secure-store';
import me from "./me";

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
    return true;
}

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

async function forget(key) {
    await SecureStore.deleteItemAsync(key);
    return true;
}

async function isAuth() {
    const token = await getValueFor("userJWT");
    if (!token) {
        console.log("not auth");
        return false;
    }

    const userInfos = await me(token);
    console.log(userInfos);

    if (!userInfos.userId) {
        console.log("auth expired");
        return false;
    } else {
        console.log("auth ok");
        return userInfos;
    }
}

module.exports = {
    save,
    getValueFor,
    forget,
    isAuth,
}