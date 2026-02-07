import React from 'react';
import '../../index.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    className = '',
    ...props
}) => {
    // Base classes provided by CSS, but we can compose them here logic-wise if we moved to Utility-First.
    // Since we are using Vanilla CSS, we will map props to classes.

    const getVariantClass = () => {
        switch (variant) {
            case 'primary': return 'btn-primary';
            case 'secondary': return 'btn-secondary'; // Need to define this in global css
            case 'outline': return 'btn-outline';     // Need to define this
            case 'ghost': return 'btn-ghost';         // Need to define this
            default: return 'btn-primary';
        }
    };

    return (
        <button
            className={`btn ${getVariantClass()} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? '...' : children}
        </button>
    );
};
