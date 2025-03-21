import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../configs/axios.config";
import { API_ENDPOINT } from "./api-endpoints"

const categoriesApi = {
    getAll: () => axiosInstance.get(API_ENDPOINT.CATEGORIES),
};

export const useCategories = () => {
    return useQuery({
        queryKey: [API_ENDPOINT.CATEGORIES],
        queryFn: categoriesApi.getAll,
        staleTime: Infinity,
        cacheTime: Infinity
    })
}