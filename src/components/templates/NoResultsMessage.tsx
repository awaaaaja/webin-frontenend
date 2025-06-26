
import { Button } from '@/components/ui/button';

interface NoResultsMessageProps {
  searchQuery: string;
  onReset: () => void;
}

export const NoResultsMessage = ({ searchQuery, onReset }: NoResultsMessageProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        Tidak ada template yang sesuai dengan pencarian "{searchQuery}"
      </p>
      <Button 
        variant="outline" 
        onClick={onReset}
        className="mt-4"
      >
        Reset Pencarian
      </Button>
    </div>
  );
};
