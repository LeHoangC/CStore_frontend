import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINT } from "./api-endpoints"
import { axiosInstance } from "../configs/axios.config";

const settingApi = {
    getSettings: () => axiosInstance.get(API_ENDPOINT.SETTING),
};

export const useSettings = () => {
    return useQuery({
        queryKey: [API_ENDPOINT.SETTING],
        queryFn: settingApi.getSettings
    })
}