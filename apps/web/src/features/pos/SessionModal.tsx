import { useState } from 'react';
import { useSessionStore } from '../../store/useSessionStore';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, LogOut, Banknote } from 'lucide-react';

export const SessionModal = () => {
    const { currentSession, openSession } = useSessionStore();
    const [amount, setAmount] = useState('');

    // If no session is open, force "Open Session" screen (acting as a blocker)
    if (!currentSession || currentSession.status === 'CLOSED') {
        const handleOpen = () => {
            const val = parseFloat(amount || '0');
            openSession(val);
        };

        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/90 backdrop-blur-md">
                <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center animate-scale-in">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <Banknote size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Open POS Session</h2>
                    <p className="text-gray-600 mb-6">Enter opening cash float to start selling.</p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Opening Cash</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                            <input
                                type="number"
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg font-bold"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>

                    <Button className="w-full py-6 text-lg" onClick={handleOpen}>
                        Start Session
                    </Button>
                </div>
            </div>
        );
    }

    // Checking if we want to render the "Close Session" modal (triggered often by a button elsewhere, 
    // but for now let's expose a small trigger or rely on parent passing a prop. 
    // Actually, to make it 'self-contained' and annoying (as per Cash Control requirements), 
    // we usually put the triggering button in the UI. 
    // For this implementation, I'll export a separate `SessionControl` component or similar.
    // BUT, the prompt asked for "Session & Cash Control". 
    // Let's make this component JUST the Blocker for Opening. 
    // And I will add a `CloseSessionButton` separately or handle it here if passed a prop?
    // Let's stick to the BLOCKED view handle here.

    return null;
};

// Separate component for the Close Button/Modal to be placed in Settings or Header
export const SessionControlWidget = () => {
    const { currentSession, closeSession } = useSessionStore();
    const [isClosing, setIsClosing] = useState(false);

    if (!currentSession) return null;

    const handleClose = () => {
        closeSession(0); // In real app, we'd input counted cash.
        setIsClosing(false);
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className="text-gray-600 border-gray-300"
                onClick={() => setIsClosing(true)}
            >
                <LogOut size={16} className="mr-2" />
                Close Session
            </Button>

            {isClosing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl animate-scale-in">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <ShieldAlert className="text-orange-500" /> Close Session?
                        </h3>

                        <div className="bg-gray-50 p-4 rounded mb-4 text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Opening Cash</span>
                                <span className="font-mono">₹{currentSession.openingBalance.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total Sales</span>
                                <span className="font-mono text-green-600">+ ₹{currentSession.totalSales.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 flex justify-between font-extrabold text-base">
                                <span>Expected Cash</span>
                                <span>₹{(currentSession.openingBalance + currentSession.totalSales).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setIsClosing(false)}>Cancel</Button>
                            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={handleClose}>
                                Confirm Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
