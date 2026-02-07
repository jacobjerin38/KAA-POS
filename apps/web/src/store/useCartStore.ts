import { create } from 'zustand';
import type { Product, CartItem } from '../types';

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (cartItemId: string) => void;
    updateItemField: (cartItemId: string, field: 'quantity' | 'discount' | 'price' | 'note', value: number | string) => void;
    clearCart: () => void;
    totals: () => { subtotal: number; tax: number; total: number };
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (product) => set((state) => {
        const existing = state.items.find(i => i.id === product.id);
        if (existing) {
            return {
                items: state.items.map(i =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            };
        }
        return {
            // Default discount 0
            items: [...state.items, { ...product, cartItemId: crypto.randomUUID(), quantity: 1, discount: 0 }]
        };
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.cartItemId !== id)
    })),
    updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map(i => {
            if (i.cartItemId === id) {
                const newQty = Math.max(0, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }).filter(i => i.quantity > 0)
    })),
    updateItemField: (id, field, value) => set((state) => ({
        items: state.items.map(i => {
            if (i.cartItemId === id) {
                // If quantity becomes 0, we can filter it out later or keep it as 0? 
                // Let's filter out if QTY is explicitly 0, but for field update let's keeps it simple
                const updated = { ...i, [field]: value };
                if (field === 'quantity' && typeof value === 'number' && value <= 0) return null; // Logic to remove
                return updated;
            }
            return i;
        }).filter(Boolean) as CartItem[]
    })),
    clearCart: () => set({ items: [] }),
    totals: () => {
        const { items } = get();
        // Subtotal = sum of (Price - Discount) * Qty
        const subtotal = items.reduce((acc, item) => {
            const price = item.price;
            const discountAmount = (price * (item.discount || 0) / 100);
            const finalPrice = price - discountAmount;
            return acc + (finalPrice * item.quantity);
        }, 0);

        const tax = items.reduce((acc, item) => {
            const price = item.price;
            const discountAmount = (price * (item.discount || 0) / 100);
            const taxableAmount = (price - discountAmount) * item.quantity;
            return acc + (taxableAmount * item.taxRate);
        }, 0);

        return {
            subtotal,
            tax,
            total: subtotal + tax
        };
    }
}));
