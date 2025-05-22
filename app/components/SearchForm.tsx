// components/SearchForm.tsx
import { FormEvent } from 'react';
import { Input } from '@/components/ui/input'; // shadcn
import { Button } from '@/components/ui/button'; // shadcn

interface SearchFormProps {
  searchTerm: string;
  loading: boolean;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: FormEvent) => void;
}

export default function SearchForm({
  searchTerm,
  loading,
  onSearchChange,
  onSearchSubmit,
}: SearchFormProps) {
  return (
    <form onSubmit={onSearchSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Enter country code (e.g. US)"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  );
}
