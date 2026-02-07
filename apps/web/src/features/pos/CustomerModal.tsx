import React, { useState } from 'react';
import { X, User, Search, Check } from 'lucide-react';

interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
}

// Mock Customers
const MOCK_CUSTOMERS: Customer[] = [
    { id: 'walk-in', name: 'Walk-in Customer', phone: '', email: '' },
    { id: 'c1', name: 'Rahul Dravid', phone: '9876543210', email: 'rahul@example.com' },
    { id: 'c2', name: 'Priya Sharma', phone: '9876500000', email: 'priya@example.com' },
    { id: 'c3', name: 'Amit Patel', phone: '8888888888', email: 'amit@example.com' },
    { id: 'c4', name: 'Sneha Gupta', phone: '7777777777', email: 'sneha@example.com' },
];

interface CustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (customer: Customer) => void;
    activeCustomerId: string;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose, onSelect, activeCustomerId }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filtered = MOCK_CUSTOMERS.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-[var(--color-bg-base)] w-full max-w-lg rounded-lg shadow-2xl overflow-hidden glass border border-[var(--color-border)] flex flex-col max-h-[80vh]">
                <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-surface)]">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <User size={20} /> Select Customer
                    </h2>
                    <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 border-b border-[var(--color-border)]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Name or Phone..."
                            className="w-full pl-10 pr-4 py-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="overflow-y-auto flex-1 p-2">
                    {filtered.map(c => (
                        <div
                            key={c.id}
                            onClick={() => { onSelect(c); onClose(); }}
                            className={`flex items-center justify-between p-4 rounded-md cursor-pointer mb-1 transition-colors ${activeCustomerId === c.id
                                    ? 'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]'
                                    : 'hover:bg-[var(--color-bg-subtle)] border border-transparent'
                                }`}
                        >
                            <div>
                                <h3 className="font-bold text-[var(--color-text-main)]">{c.name}</h3>
                                {c.phone && <p className="text-sm text-[var(--color-text-muted)]">{c.phone}</p>}
                            </div>
                            {activeCustomerId === c.id && <Check size={20} className="text-[var(--color-primary)]" />}
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="p-8 text-center text-[var(--color-text-muted)]">
                            No customers found.
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-surface)]">
                    <button className="w-full py-3 rounded-md bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-base)] text-[var(--color-primary)] font-semibold">
                        + Create New Customer
                    </button>
                </div>
            </div>
        </div>
    );
};
