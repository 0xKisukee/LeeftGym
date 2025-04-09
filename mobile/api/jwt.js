import * as SecureStore from 'expo-secure-store';

export async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
    return true;
}

export async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

export async function forget(key) {
    await SecureStore.deleteItemAsync(key);
    return true;
}