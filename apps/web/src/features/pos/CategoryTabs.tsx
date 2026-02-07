import React from 'react';

interface CategoryTabsProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onSelect }) => {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-sm ${activeCategory === cat
                            ? 'bg-[var(--color-primary)] text-white shadow-md transform scale-105'
                            : 'bg-white text-[var(--color-text-muted)] hover:bg-gray-100 border border-transparent'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};
