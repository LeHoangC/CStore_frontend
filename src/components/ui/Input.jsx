import React, { forwardRef } from 'react'
import { Asterisk } from 'lucide-react'
import { cn } from '../../helpers/cn'

const Input = forwardRef(
    ({ label, name, type = 'text', placeholder, className = '', error, required, ...rest }, ref) => {
        return (
            <div className={cn('w-full', className)}>
                <div className="flex items-center">
                    {label && <label className="block text-md font-medium text-white">{label}</label>}
                    {required && <Asterisk size={12} />}
                </div>
                <div className="relative mt-2">
                    <input
                        ref={ref}
                        name={name}
                        type={type}
                        id={name}
                        placeholder={placeholder}
                        className={`
            w-full rounded-md border border-gray-600 bg-[#1e293b] py-2.5 px-4
            text-md text-gray-300 placeholder-gray-500
            outline-none transition-all
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            disabled:cursor-not-allowed disabled:opacity-75
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          `}
                        {...rest}
                    />
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
