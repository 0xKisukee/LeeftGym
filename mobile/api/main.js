import {BASE_URL, HEADERS} from './config';
import {forget, getValueFor} from './jwt';
import {router} from "expo-router";

const getAuthHeaders = async () => {
    const jwtToken = await getValueFor("userJWT");
    if (!jwtToken) {
        return {
            ...HEADERS
        };
    }
    return {
        ...HEADERS,
        'Authorization': `Bearer ${jwtToken}`
    };
}

const request = async (endpoint, options = {}) => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = new Error(`HTTP error! status: ${response.status}`);
            error.status = response.status;
            console.error(error);
            if (error.status === 401) {
                return await response.json();
            }
            return await response.json();
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Request failed:', error);
        return null;
    }
}

export const get = async (endpoint) => {
    return request(endpoint, {method: 'GET'});
}

export const post = async (endpoint, body) => {
    return request(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    });
}

export const del = async (endpoint) => {
    return request(endpoint, {
        method: 'DELETE',
    });
}