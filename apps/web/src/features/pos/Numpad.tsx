import React from 'react';
import { Delete } from 'lucide-react';

interface NumpadProps {
    onInput: (value: string) => void;
    onDelete: () => void;
    onClear: () => void;
    onModeChange: (mode: 'QTY' | 'DISC' | 'PRICE') => void;
    activeMode: 'QTY' | 'DISC' | 'PRICE';
}

export const Numpad: React.FC<NumpadProps> = ({ onInput, onDelete, onClear: _onClear, onModeChange, activeMode }) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Mode Toggles */}
            <div className="flex gap-1 p-2 bg-[var(--color-bg-subtle)]">
                {['QTY', 'DISC', 'PRICE'].map((mode) => (
                    <button
                        key={mode}
                        onClick={() => onModeChange(mode as any)}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-md transition-all ${activeMode === mode
                            ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-md'
                            : 'bg-white text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]'
                            }`}
                    >
                        {mode === 'DISC' ? '% Disc' : mode}
                    </button>
                ))}
            </div>

            {/* Keys Grid */}
            <div className="grid grid-cols-3 gap-1 p-2 flex-1">
                {keys.map((key) => (
                    <button
                        key={key}
                        onClick={() => onInput(key)}
                        className="text-xl font-semibold bg-[var(--color-bg-surface)] hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary)] active:scale-95 transition-all rounded-md border border-[var(--color-border-subtle)] shadow-sm"
                    >
                        {key}
                    </button>
                ))}

                {/* Backspace Key */}
                <button
                    onClick={onDelete}
                    className="flex items-center justify-center bg-red-50 hover:bg-red-100 active:scale-95 text-red-600 rounded-md border border-red-100 shadow-sm transition-all"
                >
                    <Delete size={20} />
                </button>
            </div>
        </div>
    );
};
