import { useState, useEffect } from 'react';
import { Trash2, User, StickyNote } from 'lucide-react';
import clsx from 'clsx';
import { useCartStore } from '../../store/useCartStore';
import { useSessionStore } from '../../store/useSessionStore';
import { Button } from '../../components/ui/Button';
import { Numpad } from './Numpad';
import { CheckoutModal } from './CheckoutModal';
import { CustomerModal } from './CustomerModal';
import { NoteModal } from './NoteModal';
import { ReceiptModal } from './ReceiptModal';
import type { Order } from '../../types';

export const CartPanel = () => {
    const { items, removeItem: _removeItem, updateItemField, totals, clearCart } = useCartStore();
    const { subtotal, tax, total: finalTotal } = totals();
    const { addSale, checkSession } = useSessionStore();

    // UI State
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isCustomerOpen, setIsCustomerOpen] = useState(false);
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [lastOrder, setLastOrder] = useState<Order | null>(null);

    // Customer State
    const [customer, setCustomer] = useState({ id: 'walk-in', name: 'Walk-in Customer' });

    // Selection & Numpad State
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [activeMode, setActiveMode] = useState<'QTY' | 'DISC' | 'PRICE'>('QTY');

    // Auto-select last added item
    useEffect(() => {
        if (items.length > 0 && !selectedItemId) {
            setSelectedItemId(items[items.length - 1].cartItemId);
        }
    }, [items.length, selectedItemId]);

    const handleNumpadInput = (value: string) => {
        if (!selectedItemId) return;
        const item = items.find(i => i.cartItemId === selectedItemId);
        if (!item) return;

        if (activeMode === 'QTY') {
            const currentQtyStr = Math.abs(item.quantity).toString();
            if (currentQtyStr.length >= 4) return;
            const newQty = parseInt(`${currentQtyStr}${value}`);
            updateItemField(selectedItemId, 'quantity', item.quantity < 0 ? -newQty : newQty);
        } else if (activeMode === 'DISC') {
            const currentDiscStr = (item.discount || 0).toString();
            if (currentDiscStr.length >= 2) return;
            const newDisc = parseInt(`${currentDiscStr}${value}`);
            updateItemField(selectedItemId, 'discount', Math.min(newDisc, 100));
        } else if (activeMode === 'PRICE') {
            const currentPriceStr = item.price.toString().replace('.', '');
            const newPriceRaw = parseInt(`${currentPriceStr}${value}`);
            updateItemField(selectedItemId, 'price', newPriceRaw);
        }
    };

    const handleBackspace = () => {
        if (!selectedItemId) return;
        const item = items.find(i => i.cartItemId === selectedItemId);
        if (!item) return;

        if (activeMode === 'QTY') {
            const currentQtyStr = Math.abs(item.quantity).toString();
            if (currentQtyStr.length <= 1) {
                updateItemField(selectedItemId, 'quantity', 0);
            } else {
                const newQty = parseInt(currentQtyStr.slice(0, -1));
                updateItemField(selectedItemId, 'quantity', item.quantity < 0 ? -newQty : newQty);
            }
        } else if (activeMode === 'DISC') {
            const currentDiscStr = (item.discount || 0).toString();
            if (currentDiscStr.length <= 1) {
                updateItemField(selectedItemId, 'discount', 0);
            } else {
                updateItemField(selectedItemId, 'discount', parseInt(currentDiscStr.slice(0, -1)));
            }
        } else if (activeMode === 'PRICE') {
            const currentPriceStr = item.price.toString();
            if (currentPriceStr.length <= 1) {
                updateItemField(selectedItemId, 'price', 0);
            } else {
                updateItemField(selectedItemId, 'price', parseInt(currentPriceStr.slice(0, -1)));
            }
        }
    };

    const handleClearInput = () => {
        if (!selectedItemId) return;
        if (activeMode === 'QTY') updateItemField(selectedItemId, 'quantity', 0);
    };

    const handleRefundToggle = () => {
        if (!selectedItemId) return;
        const item = items.find(i => i.cartItemId === selectedItemId);
        if (!item) return;
        updateItemField(selectedItemId, 'quantity', item.quantity * -1);
    };

    const getSelectedNote = () => {
        if (!selectedItemId) return '';
        const item = items.find(i => i.cartItemId === selectedItemId);
        return item?.note || '';
    };

    const saveNote = (note: string) => {
        if (selectedItemId) {
            updateItemField(selectedItemId, 'note', note);
        }
    };

    const handlePaymentComplete = () => {
        if (checkSession()) {
            const newOrder: Order = {
                id: crypto.randomUUID(),
                timestamp: Date.now(),
                items: [...items],
                subtotal,
                taxTotal: tax,
                total: finalTotal,
                status: 'synced'
            };

            addSale(finalTotal);
            setLastOrder(newOrder);
            setIsCheckoutOpen(false);
            setIsReceiptOpen(true);
            clearCart();
        } else {
            alert("Please Open a Session first!");
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--color-bg-surface)] border-l border-[var(--color-border)] shadow-xl">
            {/* 1. Header & Customer */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-subtle)]">
                <div
                    onClick={() => setIsCustomerOpen(true)}
                    className="flex items-center gap-2.5 text-[var(--color-primary)] font-semibold cursor-pointer hover:bg-white/60 px-3 py-2 rounded-lg transition-all border border-transparent hover:border-[var(--color-border)] hover:shadow-sm"
                >
                    <User size={18} />
                    <span className="text-sm">{customer.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:bg-red-50">
                    <Trash2 size={18} />
                </Button>
            </div>

            {/* 2. Scrollable Items List */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)]">
                        <div className="w-20 h-20 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center mb-3">
                            <svg className="w-10 h-10 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium">Cart is Empty</p>
                        <p className="text-xs mt-1">Add items to get started</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {items.map((item) => {
                            const isSelected = item.cartItemId === selectedItemId;
                            return (
                                <div
                                    key={item.cartItemId}
                                    onClick={() => setSelectedItemId(item.cartItemId)}
                                    className={clsx(
                                        "p-3 rounded-lg cursor-pointer transition-all border",
                                        isSelected
                                            ? "bg-[var(--color-primary-subtle)] border-[var(--color-primary)] shadow-sm"
                                            : "bg-white border-[var(--color-border-subtle)] hover:border-[var(--color-border)] hover:shadow-sm",
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-sm w-2/3 truncate text-[var(--color-text-main)]">{item.name}</span>
                                        <span className="font-bold text-[var(--color-primary)]">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-[var(--color-text-muted)]">₹{item.price} × {Math.abs(item.quantity)}</span>
                                        <div className="flex gap-2 items-center">
                                            {item.quantity < 0 && (
                                                <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">REFUND</span>
                                            )}
                                            {item.discount && item.discount > 0 ? (
                                                <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded font-medium border border-green-100">
                                                    -{item.discount}%
                                                </span>
                                            ) : null}
                                            {item.note && (
                                                <span
                                                    className="text-[var(--color-primary)] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1"
                                                    title={item.note}
                                                >
                                                    <StickyNote size={10} /> Note
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 3. Totals Summary */}
            <div className="px-4 py-3 border-t border-[var(--color-border-subtle)] bg-gradient-to-br from-[var(--color-bg-subtle)] to-white">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">Total</span>
                    <span className="text-3xl font-extrabold text-[var(--color-primary)]">₹{finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
                    <span>Tax: ₹{tax.toFixed(2)}</span>
                    <span>Items: {items.length}</span>
                </div>
            </div>

            {/* 4. Numpad & Actions */}
            <div className="h-[320px] bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)] flex flex-col">
                <div className="flex-1 flex">
                    <div className="flex-1">
                        <Numpad
                            onInput={handleNumpadInput}
                            onDelete={handleBackspace}
                            onClear={handleClearInput}
                            onModeChange={setActiveMode}
                            activeMode={activeMode}
                        />
                    </div>
                    <div className="w-1/4 flex flex-col border-l border-[var(--color-border)]">
                        <button
                            className="flex-1 bg-white border-b border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-main)] hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary)] transition-colors"
                            onClick={() => setIsNoteOpen(true)}
                            title="Add Note"
                        >
                            Note
                        </button>
                        <button
                            className="flex-1 bg-white border-b border-[var(--color-border)] text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                            onClick={handleRefundToggle}
                            title="Refund / Return"
                        >
                            Refund
                        </button>
                        <button
                            className="flex-[2] bg-gradient-to-br from-[var(--color-success)] to-green-600 text-white font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1 shadow-md"
                            onClick={() => setIsCheckoutOpen(true)}
                        >
                            <span>Pay</span>
                            <span className="text-xs font-normal opacity-90">Enter ⏎</span>
                        </button>
                    </div>
                </div>
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onSuccess={handlePaymentComplete}
            />

            <CustomerModal
                isOpen={isCustomerOpen}
                onClose={() => setIsCustomerOpen(false)}
                onSelect={(c) => setCustomer(c)}
                activeCustomerId={customer.id}
            />

            <NoteModal
                isOpen={isNoteOpen}
                onClose={() => setIsNoteOpen(false)}
                onSave={saveNote}
                initialNote={getSelectedNote()}
            />

            <ReceiptModal
                isOpen={isReceiptOpen}
                onClose={() => setIsReceiptOpen(false)}
                order={lastOrder}
            />
        </div>
    );
};
