import { Truck } from 'lucide-react'
import { Check } from 'lucide-react'
import { X } from 'lucide-react'
import { PackageCheck } from 'lucide-react'
import { Loader } from 'lucide-react'

export const statusOrder = {
    pending: {
        icon: <Loader size={14} />,
        color: 'bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        title: 'đang chờ xác nhận',
    },
    confirmed: {
        icon: <PackageCheck size={14} />,
        color: 'bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300',
        title: 'đã được xác nhận',
    },
    shipped: {
        icon: <Truck size={14} />,
        color: 'bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        title: 'đang được vận chuyển',
    },
    cancelled: {
        icon: <X size={14} />,
        color: 'bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300',
        title: 'đã bị hủy',
    },
    delivered: {
        icon: <Check size={14} />,
        color: 'bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300',
        title: 'đã được giao thành công',
    },
}
