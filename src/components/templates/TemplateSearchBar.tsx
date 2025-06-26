
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TemplateSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TemplateSearchBar = ({ searchQuery, onSearchChange }: TemplateSearchBarProps) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Cari template..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>
    </div>
  );
};
