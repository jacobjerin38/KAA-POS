import { openDB, type DBSchema } from 'idb';
import type { Product, Order } from '../types';

interface POSDB extends DBSchema {
    products: {
        key: string;
        value: Product;
        indexes: { 'by-category': string };
    };
    orders: {
        key: string;
        value: Order;
        indexes: { 'by-status': string, 'by-timestamp': number };
    };
    syncQueue: {
        key: string;
        value: { id: string; payload: any; type: 'ORDER' | 'UPDATE'; timestamp: number };
    };
}

const dbPromise = openDB<POSDB>('pos-db', 1, {
    upgrade(db) {
        // Products Store
        const productStore = db.createObjectStore('products', { keyPath: 'id' });
        productStore.createIndex('by-category', 'category');

        // Orders Store
        const orderStore = db.createObjectStore('orders', { keyPath: 'id' });
        orderStore.createIndex('by-status', 'status');
        orderStore.createIndex('by-timestamp', 'timestamp');

        // Sync Queue
        db.createObjectStore('syncQueue', { keyPath: 'id' });
    },
});

export const db = {
    getProducts: async () => (await dbPromise).getAll('products'),
    addProduct: async (product: Product) => (await dbPromise).put('products', product),

    saveOrder: async (order: Order) => {
        const d = await dbPromise;
        await d.put('orders', order);
        // Add to sync queue if offline (this logic usually in service layer, but safe to add here for now)
        if (!navigator.onLine) {
            await d.put('syncQueue', {
                id: crypto.randomUUID(),
                payload: order,
                type: 'ORDER',
                timestamp: Date.now()
            });
        }
    },

    getAllOrders: async () => (await dbPromise).getAll('orders'),

    seedStart: async () => {
        const count = await (await dbPromise).count('products');
        if (count === 0) {
            // Seed dummy data
            const dummy: Product[] = [
                {
                    id: '1', name: 'Masala Chai', price: 20, category: 'Beverages', sku: 'BV001', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '2', name: 'Samosa', price: 15, category: 'Snacks', sku: 'SN001', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '3', name: 'Veg Sandwich', price: 80, category: 'Food', sku: 'fd001', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '4', name: 'Cold Coffee', price: 120, category: 'Beverages', sku: 'BV002', taxRate: 0.18,
                    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '5', name: 'Paneer Wrap', price: 150, category: 'Food', sku: 'FD002', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '6', name: 'Lassi', price: 60, category: 'Beverages', sku: 'BV003', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400'
                },
            ];
            const d = await dbPromise;
            const tx = d.transaction('products', 'readwrite');
            await Promise.all(dummy.map(p => tx.store.put(p)));
            await tx.done;
            console.log('Database seeded!');
        }
    }
};
