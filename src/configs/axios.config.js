import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = '/api';

// Danh sách các public endpoints không cần auth headers
const PUBLIC_ENDPOINTS = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
];

export const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});


// Biến để theo dõi nếu đang refresh token
let isRefreshing = false;
// Mảng chứa các requests đang đợi refresh token hoàn tất
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Request interceptor - thêm token vào header
axiosInstance.interceptors.request.use(
    config => {
        const endpoint = config.url.replace(API_URL, '');

        if (!PUBLIC_ENDPOINTS.includes(endpoint)) {
            const { user, tokens } = useAuthStore.getState();

            if (tokens?.accessToken) {
                config.headers.authorization = tokens.accessToken;
            }
            if (user) {
                config.headers['x-client-id'] = user._id;
            }
        }

        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor - xử lý refresh token
axiosInstance.interceptors.response.use(
    response => response.data,
    async error => {
        const originalRequest = error.config;

        const isAuthError = error.response?.status === 401;
        const isServerError = error.response?.status === 500;

        const isExpiredTokenError = isServerError &&
            error.response?.data?.message?.includes('jwt expired');

        if ((isAuthError || isExpiredTokenError) && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.authorization = token;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;


            try {
                const { user: userStore, tokens: tokensStore, login } = useAuthStore.getState();
                if (!tokens?.refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Gọi API refresh token bằng axios thông thường để tránh vòng lặp
                const response = await axios.post(`${API_URL}/auth/refreshToken`, {}, {
                    headers: {
                        "x-client-id": userStore._id,
                        "x-rtoken-id": tokensStore.refreshToken,
                    }
                });
                const { user, tokens } = response.data;
                login(user, tokens)

                // Cập nhật token cho request ban đầu
                originalRequest.headers.authorization = tokens.accessToken;

                // Xử lý queue
                processQueue(null, tokens.accessToken);
                isRefreshing = false;

                // Thực hiện lại request ban đầu
                return axiosInstance(originalRequest);

            } catch (err) {
                processQueue(err, null);
                isRefreshing = false;
                localStorage.setItem('returnUrl', window.location.pathname);
                window.location.href = '/login'

                return Promise.reject(err);
            }
        }

        return Promise.reject(error.response?.data || error);
    }
);