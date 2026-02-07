import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Session {
    id: string;
    openedAt: number;
    closedAt?: number;
    openingBalance: number;
    closingBalance?: number;
    totalSales: number;
    status: 'OPEN' | 'CLOSED';
}

interface SessionState {
    currentSession: Session | null;
    openSession: (openingBalance: number) => void;
    closeSession: (closingBalance: number) => void;
    addSale: (amount: number) => void;
    checkSession: () => boolean; // Returns true if open
}

export const useSessionStore = create<SessionState>()(
    persist(
        (set, get) => ({
            currentSession: null,
            openSession: (openingBalance) => set({
                currentSession: {
                    id: crypto.randomUUID(),
                    openedAt: Date.now(),
                    openingBalance,
                    totalSales: 0,
                    status: 'OPEN'
                }
            }),
            closeSession: (closingBalance) => set((state) => {
                if (!state.currentSession) return {};
                return {
                    currentSession: null, // Logic might vary: keep history? For now, reset current.
                    // In real app, we'd append to a history array or sync to DB.
                };
            }),
            addSale: (amount) => set((state) => {
                if (!state.currentSession) return {};
                return {
                    currentSession: {
                        ...state.currentSession,
                        totalSales: state.currentSession.totalSales + amount
                    }
                };
            }),
            checkSession: () => {
                const { currentSession } = get();
                return currentSession?.status === 'OPEN';
            }
        }),
        {
            name: 'pos-session-storage',
        }
    )
);
