import axios from 'axios';

const baseURL = import.meta.env.VITE_REACT_APP_API;

export const register = async (value) => {
    try {
        return await axios.post(`${baseURL}/register`, value);
    } catch (error) {
        console.error('Failed to register:', error);
        throw error;
    }
};

export const login = async (value) => {
    try {
        return await axios.post(`${baseURL}/login`, value);
    } catch (error) {
        console.error('Failed to login:', error);
        throw error;
    }
};

const makeAuthenticatedRequest = async (url, Authorization) => {
    try {
        return await axios.post(url, {}, {
            headers: {
                Authorization: Authorization,
            },
        });
    } catch (error) {
        console.error('Failed to make authenticated request:', error);
        throw error;
    }
};

export const currentUser = async (Authorization) => {
    return await makeAuthenticatedRequest(`${baseURL}/current-user`, Authorization);
};

export const currentAdmin = async (Authorization) => {
    return await makeAuthenticatedRequest(`${baseURL}/current-admin`, Authorization);
};
