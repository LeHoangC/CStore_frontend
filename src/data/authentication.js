
import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../configs/axios.config";
import { API_ENDPOINT } from "./api-endpoints"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const authenApi = {
    login: (data) => axiosInstance.post(API_ENDPOINT.LOGIN, data),
    logout: () => axiosInstance.post(API_ENDPOINT.LOGOUT),
};

export const useLoginMutation = () => {
    const { login } = useAuthStore()

    const navigate = useNavigate()
    const returnUrl = localStorage.getItem('returnUrl') || '/';

    return useMutation({
        mutationFn: authenApi.login,
        onSuccess: (data) => {

            login(data.user, data.tokens)

            navigate(returnUrl, { replace: true })
            localStorage.removeItem('returnUrl'); // Xóa sau khi dùng xong
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}

export const useLogoutMutation = () => {
    const navigate = useNavigate()
    const { logout } = useAuthStore()

    return useMutation({
        mutationFn: authenApi.logout,
        onSuccess: () => {
            logout()
            navigate('/login', { replace: true })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}