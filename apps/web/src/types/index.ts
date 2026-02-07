export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    sku: string;
    taxRate: number; // e.g. 0.05, 0.18
    imageUrl?: string;
}

export interface CartItem extends Product {
    cartItemId: string;
    quantity: number;
    discount?: number; // 0-100%
    note?: string;
}

export interface Order {
    id: string;
    timestamp: number;
    items: CartItem[];
    subtotal: number;
    taxTotal: number;
    total: number;
    status: 'pending' | 'synced';
}
