import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../configs/axios.config";
import { API_ENDPOINT } from "./api-endpoints"
import { invalidateQueries } from "../configs/react-query.config";
import { toast } from "react-toastify";

const reviewApi = {
    getAllReviewsWithProduct: (productId) => axiosInstance.get(`${API_ENDPOINT.REVIEW}/${productId}`),
    createReview: (data) => axiosInstance.post(API_ENDPOINT.REVIEW, data),
};

export const useReviews = () => {
    return useQuery({
        queryKey: API_ENDPOINT.REVIEW,
        queryFn: (productId) => reviewApi.getAllReviewsWithProduct(productId),
    })
}

export const useCreateReviewMutaion = () => {
    return useMutation({
        mutationFn: reviewApi.createReview,
        onSuccess: () => {
            invalidateQueries(API_ENDPOINT.PRODUCTS)
            toast.success('Gửi đánh giá thành công')
        },
        onError: err => {
            toast.warning(err.message)
        }
    })
}