import React, { useState } from 'react';
import { X, StickyNote } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (note: string) => void;
    initialNote?: string;
}

export const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, onSave, initialNote = '' }) => {
    const [note, setNote] = useState(initialNote);

    // Reset note when opening logic might be needed if modal is reused without unmounting,
    // but for now simpler is fine.
    React.useEffect(() => {
        setNote(initialNote);
    }, [initialNote, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-sm rounded-lg shadow-xl overflow-hidden animate-scale-in">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold flex items-center gap-2 text-gray-800">
                        <StickyNote size={18} /> Item Note
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <textarea
                        className="w-full h-32 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none text-sm"
                        placeholder="Add kitchen instructions (e.g., Less spicy, No sugar)..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="p-4 flex gap-3 border-t border-gray-100">
                    <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                    <Button
                        className="flex-1"
                        onClick={() => { onSave(note); onClose(); }}
                    >
                        Save Note
                    </Button>
                </div>
            </div>
        </div>
    );
};
