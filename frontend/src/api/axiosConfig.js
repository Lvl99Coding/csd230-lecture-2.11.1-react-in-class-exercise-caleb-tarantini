import axios from 'axios';

const api = axios.create({
    baseURL: '/api/rest'
});

// REQUEST Interceptor: Runs right before ANY request is sent
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// RESPONSE Interceptor: Handles data returning from the server
api.interceptors.response.use(
    (response) => {
        return response; // Success (2xx)
    },
    (error) => {
        // Handle 401 (Expired/Unauthorized) or 403 (Forbidden)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn("Security error detected. Prompting re-login...");

            // Notify the user about session expiration
            alert("Your session has expired. Please log in again.");

            // Wipe the stale token from storage
            localStorage.removeItem('token');

            // Redirect to Login page
            window.location.href = '/login?expired=true';
        }
        return Promise.reject(error);
    }
);

export default api;