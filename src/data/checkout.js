import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios.config";
import { API_ENDPOINT } from "./api-endpoints";
import { toast } from "react-toastify";

const checkoutApi = {
    checkoutReview: (payload) => axiosInstance.post(API_ENDPOINT.CHECKOUT_REVIEW, payload),
};

export const useCheckoutReviewMutation = () => {
    return useMutation({
        mutationFn: checkoutApi.checkoutReview,
        onError: err => {
            toast.error(err.message)
        }
    })
}