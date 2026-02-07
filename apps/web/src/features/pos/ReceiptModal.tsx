import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { Order } from '../../types';

interface ReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, order }) => {
    if (!isOpen || !order) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in print:static print:bg-white print:p-0">
            <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-scale-in print:shadow-none print:w-full print:max-w-none">

                {/* Screen Header (Hidden in Print) */}
                <div className="p-4 bg-green-600 text-white flex justify-between items-center print:hidden">
                    <h3 className="font-bold flex items-center gap-2">
                        <CheckCircle size={20} /> Order Success
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Receipt Content (Visible in Print) */}
                <div className="p-8 print:p-0 font-mono text-sm">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold uppercase tracking-wider mb-1">India Retail Store</h2>
                        <p className="text-gray-500">123, Market Road, Mumbai</p>
                        <p className="text-gray-500">GST: 27ABCDE1234F1Z5</p>
                        <p className="text-gray-500 mt-2">Ph: +91 98765 43210</p>
                    </div>

                    <div className="border-b-2 border-dashed border-gray-300 my-4"></div>

                    <div className="flex justify-between mb-2">
                        <span>Date: {new Date(order.timestamp).toLocaleString()}</span>
                        <span>#{order.id.slice(-6).toUpperCase()}</span>
                    </div>

                    <table className="w-full text-left mb-4">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-2">Item</th>
                                <th className="py-2 text-right">Qty</th>
                                <th className="py-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-100">
                                    <td className="py-2">
                                        <div>{item.name}</div>
                                        {item.discount && item.discount > 0 && (
                                            <div className="text-xs text-gray-500">Disc: {item.discount}%</div>
                                        )}
                                        {item.quantity < 0 && (
                                            <div className="text-xs text-red-500 font-bold">REFUND</div>
                                        )}
                                    </td>
                                    <td className="py-2 text-right">{item.quantity}</td>
                                    <td className="py-2 text-right">
                                        ₹{((item.price * item.quantity) - (item.price * item.quantity * (item.discount || 0) / 100)).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="border-b-2 border-dashed border-gray-300 my-4"></div>

                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>₹{order.taxTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-2">
                            <span>Total</span>
                            <span>₹{order.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-dashed border-gray-300 my-6"></div>

                    <div className="text-center text-gray-500 text-xs">
                        <p>Thank you for shopping with us!</p>
                        <p className="mt-1">Visit Again</p>
                    </div>
                </div>

                {/* Footer Actions (Hidden in Print) */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 print:hidden">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        New Order
                    </Button>
                    <Button className="flex-1 gap-2" onClick={handlePrint}>
                        <Printer size={18} /> Print Check
                    </Button>
                </div>
            </div>
        </div>
    );
};
