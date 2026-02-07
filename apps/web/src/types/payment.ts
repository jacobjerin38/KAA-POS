export type PaymentMethod = 'CASH' | 'UPI' | 'CARD';

export interface PaymentDetails {
    method: PaymentMethod;
    amount: number;
    transactionId?: string; // For UPI/Card
}
