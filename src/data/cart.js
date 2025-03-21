import { useMutation, useQuery } from "@tanstack/react-query"
import { API_ENDPOINT } from "./api-endpoints"
import { axiosInstance } from "../configs/axios.config";
import { invalidateQueries } from "../configs/react-query.config";
import { useLocation } from "react-router-dom";

const cartApi = {
    getAll: () => axiosInstance.get(API_ENDPOINT.CART),
    addToCart: (payload) => axiosInstance.post(API_ENDPOINT.CART, { product: payload }),
    removeItem: (payload) => axiosInstance.patch(`${API_ENDPOINT.CART}/remove-item-cart`, payload),
};

export const useCart = () => {
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    return useQuery({
        queryKey: [API_ENDPOINT.CART],
        queryFn: cartApi.getAll,
        enabled: !isAuthPage
    })
}

export const useAddToCartMutation = () => {
    return useMutation({
        mutationFn: cartApi.addToCart,
        onSuccess: () => {
            invalidateQueries(API_ENDPOINT.CART)
        }
    })
}

export const useRemoveItemMutation = () => {
    return useMutation({
        mutationFn: cartApi.removeItem,
        onSuccess: () => {
            invalidateQueries(API_ENDPOINT.CART)
        }
    })
}