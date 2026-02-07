import { db } from '../lib/db';
import { useCartStore } from '../store/useCartStore';
import type { Order } from '../types';
import type { PaymentDetails } from '../types/payment';

export const orderService = {
    createOrder: async (_payment: PaymentDetails) => {
        const store = useCartStore.getState();
        const { items, totals } = store;
        const { subtotal, tax, total } = totals();

        if (items.length === 0) throw new Error("Cart is empty");

        const order: Order = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            items: [...items],
            subtotal,
            taxTotal: tax,
            total,
            status: 'pending', // Pending sync to backend
            // In a real app we'd store payment info too
        };

        // 1. Save to Offline DB
        await db.saveOrder(order);

        // 2. Clear Cart
        store.clearCart();

        // 3. Trigger Sync (Background)
        // syncService.pushOrders(); 

        return order;
    }
};
