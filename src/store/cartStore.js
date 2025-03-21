import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export const useCartStore = create(
    persist(
        (set) => ({
            cartItems: null,
            setCart: (data) => {
                set(() => ({
                    cartItems: data
                }))
            }
        }),
        {
            name: 'cart-storage', // Tên key trong localStorage
        }
    )
);