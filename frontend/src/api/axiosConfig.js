import axios from "axios";

const api = axios.create({
    baseURL: "/api/rest",
});

let redirectingToLogin = false;

// REQUEST Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem("token");

            const onLoginPage = window.location.pathname.startsWith("/login");
            if (!redirectingToLogin && !onLoginPage) {
                redirectingToLogin = true;
                window.location.replace("/login?expired=true");
            }
        }
        return Promise.reject(error);
    }
);

export default api;
