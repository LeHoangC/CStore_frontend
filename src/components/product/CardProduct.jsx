import React from 'react'
import { FormatPrice, FormatPriceVariant } from '../../utils/use-price'
import { Star } from 'lucide-react'
import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'

const CardProduct = ({ product }) => {
    return (
        <Link
            to={`/product/${product.slug}`}
            className="group relative border border-gray-200 rounded-md overflow-hidden"
        >
            <img
                src={product.mainImage.url}
                alt="Front of men&#039;s Basic Tee in black."
                className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 p-4 flex flex-col gap-2 justify-between">
                <h3 className="text-base text-gray-700 line-clamp-2">{product.name}</h3>

                {!product.hasVariants
                    ? FormatPrice({ amount: product.price, className: 'text-lg font-medium text-gray-900' })
                    : FormatPriceVariant({
                          variants: product.variants,
                          className: 'text-lg font-medium text-gray-900',
                      })}

                <div className="flex items-center gap-2">
                    <Star size={16} fill="#ffbc1c" stroke="#ffbc1c" />
                    <span>
                        {product.ratings.average} Đã bán: {product.sold_quantity}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default CardProduct
