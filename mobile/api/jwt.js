import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://gym.leeft.fun/api';
const API_URL2 = 'http://localhost:3000/api';

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

async function me() {
    try {
        const jwtToken = await getValueFor("userJWT");

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

async function isAuth() {
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

module.exports = {
    save,
    getValueFor,
    forget,
    isAuth,
    me,
}