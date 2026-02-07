import React, { useState } from 'react';
import { X, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../../components/ui/Button';
import { orderService } from '../../services/orderService';
import type { PaymentMethod } from '../../types/payment';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { totals } = useCartStore();
    const { total } = totals();
    const [method, setMethod] = useState<PaymentMethod | null>(null);
    const [processing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const handlePayment = async () => {
        if (!method) return;
        setProcessing(true);
        try {
            await orderService.createOrder({
                method,
                amount: total
            });
            // alert('Order Placed Successfully!'); // Removed alert for smoother flow
            onClose();
            if (onSuccess) onSuccess();
        } catch (e) {
            console.error(e);
            alert('Failed to place order');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--color-bg-base)] w-full max-w-md rounded-lg shadow-2xl overflow-hidden glass border border-[var(--color-border)]">
                <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-surface)]">
                    <h2 className="text-xl font-bold">Checkout</h2>
                    <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="text-center mb-8">
                        <p className="text-[var(--color-text-muted)] mb-1">Total Amount</p>
                        <h1 className="text-4xl font-extrabold text-[var(--color-primary)]">
                            ₹{total.toFixed(2)}
                        </h1>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {[
                            { id: 'CASH', label: 'Cash', icon: Banknote },
                            { id: 'UPI', label: 'UPI', icon: QrCode },
                            { id: 'CARD', label: 'Card', icon: CreditCard },
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMethod(m.id as PaymentMethod)}
                                className={`flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all ${method === m.id
                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                                    : 'border-transparent bg-[var(--color-bg-surface)] hover:bg-gray-100'
                                    }`}
                            >
                                <m.icon size={28} className="mb-2" />
                                <span className="font-semibold text-sm">{m.label}</span>
                            </button>
                        ))}
                    </div>

                    <Button
                        className="w-full text-lg py-6"
                        disabled={!method || processing}
                        onClick={handlePayment}
                    >
                        {processing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                    </Button>
                </div>
            </div>
        </div>
    );
};
