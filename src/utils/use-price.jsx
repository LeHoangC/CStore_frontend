import { cn } from '../helpers/cn'

export function FormatPrice({ amount, className }) {
    const formatCurrency = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 2,
    })

    return <span className={cn('text-sm font-semibold', className)}>{formatCurrency.format(amount ?? 0)}</span>
}

export function FormatPriceVariant({ variants, className }) {
    const formatCurrency = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 2,
    })

    const allPrice = variants.map((variant) => variant.price)

    const maxPrice = Math.max(...allPrice)
    const minPrice = Math.min(...allPrice)

    return (
        <span className={cn('text-base font-semibold', className)}>
            {`${formatCurrency.format(minPrice ?? 0)} - ${formatCurrency.format(maxPrice ?? 0)}`}
        </span>
    )
}
