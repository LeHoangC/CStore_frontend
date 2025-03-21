import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINT } from "./api-endpoints"
import { axiosInstance } from "../configs/axios.config";

const productsApi = {
    getAll: (searchParams) => axiosInstance.get(API_ENDPOINT.PRODUCTS, { params: { ...searchParams } }),
    getBySlug: (slug) => axiosInstance.get(`${API_ENDPOINT.PRODUCTS}/${slug}`),
};

export const useProducts = (searchParams) => {
    return useQuery({
        queryKey: [API_ENDPOINT.PRODUCTS, searchParams],
        queryFn: () => productsApi.getAll(searchParams)
    })
}

export const useProduct = (slug) => {
    return useQuery({
        queryKey: [API_ENDPOINT.PRODUCTS, slug],
        queryFn: () => productsApi.getBySlug(slug)
    })
}
