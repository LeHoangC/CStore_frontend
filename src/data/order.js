import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { API_ENDPOINT } from "./api-endpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { invalidateQueries } from '../configs/react-query.config'

const ordersApi = {
    getAllOrders: () => axiosInstance.get(`${API_ENDPOINT.ORDERS}/orderByUser`),
    getOrder: (orderId) => axiosInstance.get(`${API_ENDPOINT.ORDERS}/orderByUser/${orderId}`),
    createOrder: (payload) => axiosInstance.post(API_ENDPOINT.CREATE_ORDER, payload),
};

export const useOrders = () => {
    return useQuery({
        queryKey: [API_ENDPOINT.ORDERS],
        queryFn: ordersApi.getAllOrders
    })
}

export const useOrder = (orderId) => {
    return useQuery({
        queryKey: [API_ENDPOINT.ORDERS, orderId],
        queryFn: () => ordersApi.getOrder(orderId)
    })
}

export const useCreateOrderMutation = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: ordersApi.createOrder,
        onSuccess: () => {
            toast.success('Đặt hàng thành công')
            localStorage.removeItem('itemCheckout')
            navigate('/orders', { replace: true })
            invalidateQueries(API_ENDPOINT.ORDERS)
        },
        onError: err => {
            toast.error(err.message)
        }
    })
}