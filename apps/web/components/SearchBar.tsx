import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Search...'}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-10 text-sm outline-none transition-all focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[var(--text-light)] hover:text-[var(--text)] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {!value && (
        <p className="mt-1.5 text-center text-[11px] text-[var(--text-light)]">
          Tip: search works in all three languages
        </p>
      )}
    </div>
  );
}
