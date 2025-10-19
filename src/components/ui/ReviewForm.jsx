import React from 'react'
import { DialogPanel, DialogTitle, Dialog, DialogBackdrop } from '@headlessui/react'
import { Button, Rating } from '@mui/material'
import FileInput from './File-input'
import { Controller, useForm } from 'react-hook-form'
import TextArea from './TextArea'
import { useCreateReviewMutaion } from '../../data/review'
import { useEffect } from 'react'

const ReviewForm = ({ orderId, productId, variantId, variantName, isOpen, onClose }) => {
    const {
        handleSubmit,
        control,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            orderId,
            productId,
            variantId,
            variant_name: variantName,
            rating: 5,
            text: '',
            images: [],
        },
    })

    const { mutate: createReview, isSuccess } = useCreateReviewMutaion()

    const onSubmit = (value) => {
        createReview(value)
    }

    useEffect(() => {
        if (isSuccess) {
            reset()
            onClose()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, reset])

    useEffect(() => {
        reset({
            orderId: orderId || '',
            productId: productId || '',
            variantId: variantId || null,
            variant_name: variantName || null,
            rating: 5,
            text: '',
            images: [],
        })
    }, [orderId, productId, variantId, reset, variantName])

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-xl rounded-xl bg-black/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                            Viết đánh giá
                        </DialogTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="">
                                <p className="mt-2 text-sm/6 text-white/50">Đánh giá</p>
                                <Controller
                                    name="rating"
                                    control={control}
                                    render={({ field }) => (
                                        <Rating
                                            {...field}
                                            value={field.value} // Gán giá trị từ react-hook-form
                                            onChange={(_, newValue) => field.onChange(newValue)} // Cập nhật giá trị khi thay đổi
                                            precision={1}
                                            size="medium"
                                            sx={{
                                                '& .MuiRating-iconEmpty': {
                                                    color: 'white', // Màu border của sao rỗng
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className="">
                                <p className="mt-2 text-sm/6 text-white/50">Mô tả</p>
                                <TextArea
                                    {...register('text', {
                                        required: 'Mô tả là bắt buộc',
                                        onChange: (e) => setValue('text', e.target.value.trimStart()),
                                    })}
                                    error={errors?.text?.message}
                                />
                            </div>
                            <div className="">
                                <p className="mt-2 text-sm/6 text-white/50">Tải hình ảnh lên</p>
                                <FileInput control={control} name="images" />
                            </div>

                            <Button variant="contained" type="submit">
                                Gửi
                            </Button>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default ReviewForm
