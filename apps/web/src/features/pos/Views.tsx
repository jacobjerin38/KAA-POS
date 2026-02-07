import React from 'react';
import { db } from '../../lib/db';
import type { Order } from '../../types';
import { SessionControlWidget } from './SessionModal';

export const OrdersView = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
        db.getAllOrders().then(setOrders);
    }, []);

    if (orders.length === 0) return <div className="p-8 text-center text-[var(--color-text-muted)]">No orders placed yet.</div>;

    return (
        <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {orders.slice().reverse().map(order => (
                <div key={order.id} className="p-4 bg-[var(--color-bg-surface)] rounded-md border border-[var(--color-border)] flex justify-between items-center glass">
                    <div>
                        <p className="font-bold">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">{new Date(order.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-[var(--color-primary)]">₹{Number(order.total).toFixed(2)}</p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">{order.status}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const SettingsView = () => {
    return (
        <div className="p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            <div className="space-y-6">
                <div className="p-4 border border-[var(--color-border)] rounded-md">
                    <h3 className="font-semibold mb-2">Sync Status</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">Backend URL: http://localhost:3000</p>
                    <p className="text-sm text-red-500 mt-2">Status: Offline (DB Connection Failed)</p>
                </div>

                <div className="p-4 border border-[var(--color-border)] rounded-md">
                    <h3 className="font-semibold mb-2">Device Info</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">Terminal ID: T-800</p>
                    <p className="text-sm text-[var(--color-text-muted)]">Version: 1.0.0 (MVP)</p>
                </div>
                <div className="p-4 border border-[var(--color-border)] rounded-md flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold mb-1">Session Control</h3>
                        <p className="text-sm text-[var(--color-text-muted)]">Manage opening/closing of daily register.</p>
                    </div>
                    <SessionControlWidget />
                </div>
            </div>
        </div>
    );
};
