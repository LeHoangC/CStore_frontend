import { Avatar, Rating, Typography, Divider } from '@mui/material'
import React from 'react'

const ReviewProduct = ({ reviews }) => {
    return (
        <div className="py-10">
            <p className="mb-6 text-3xl">Đánh giá sản phẩm</p>
            {reviews.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {reviews.map((review, index) => (
                        <div key={index}>
                            <div className="flex items-start gap-4">
                                <Avatar alt={review.user?.name} src={review.user?.avatar} className="w-12 h-12" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <Typography variant="subtitle1" className="font-semibold">
                                            {review.review_user?.user_name || 'Người dùng ẩn danh'}
                                        </Typography>
                                        <Rating
                                            name={`review-rating-${index}`}
                                            value={review.rating}
                                            precision={0.5}
                                            readOnly
                                            size="small"
                                        />
                                    </div>
                                    <Typography variant="caption" className="text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                        {review.review_variantId && ` | ${review.review_variant_name}`}
                                    </Typography>
                                    <Typography variant="body2" className="mt-2">
                                        {review.review_text}
                                    </Typography>
                                    <div className="mt-4">
                                        {review?.review_images?.map((image) => (
                                            <img
                                                key={image.url}
                                                src={image.url}
                                                alt="ProductImage"
                                                width={100}
                                                height={100}
                                                className="object-contain"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {index < reviews.length - 1 && <Divider className="my-4" />}
                        </div>
                    ))}
                </div>
            ) : (
                <Typography variant="body1" className="text-gray-500">
                    Chưa có đánh giá nào cho sản phẩm này.
                </Typography>
            )}
        </div>
    )
}

export default ReviewProduct
