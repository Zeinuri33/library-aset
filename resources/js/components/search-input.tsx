import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
}

export function SearchInput({ placeholder = 'Cari...', className, ...props }: SearchInputProps) {
    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                className={`pl-8 rounded-lg shadow-sm ${className || ''}`}
                {...props}
            />
        </div>
    );
}
