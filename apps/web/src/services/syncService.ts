import { api } from './api';
import { db } from '../lib/db';
import type { Product } from '../types';

export const syncService = {
    // Pull products from Backend -> IndexedDB
    pullProducts: async () => {
        try {
            console.log('Syncing products...');
            const products = await api.get('/products') as Product[];

            // Upsert into IDB
            // In a real optimized app, we'd use a transaction or bulk put.
            // idb 'put' is efficient enough for small datasets.
            for (const p of products) {
                await db.addProduct(p);
            }

            console.log(`Synced ${products.length} products to offline DB.`);
            return products.length;
        } catch (error) {
            console.error('Sync failed:', error);
            throw error;
        }
    },

    // Push offline orders Backend -> Sync
    pushOrders: async () => {
        // TODO: Implement order push
    }
};
