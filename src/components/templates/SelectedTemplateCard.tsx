
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Template {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  features: string[];
  popular: boolean;
}

interface SelectedTemplateCardProps {
  selectedTemplate: Template;
  onContinue: () => void;
}

export const SelectedTemplateCard = ({ selectedTemplate, onContinue }: SelectedTemplateCardProps) => {
  return (
    <div className="text-center">
      <Card className="inline-block p-6 bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-4">
          <div className="text-left">
            <p className="text-sm text-gray-600">Template yang dipilih:</p>
            <p className="font-semibold text-gray-900">{selectedTemplate.name}</p>
            <p className="text-blue-600 font-bold">{selectedTemplate.price}</p>
          </div>
          <Button onClick={onContinue} className="bg-blue-600 hover:bg-blue-700">
            Lanjutkan ke Add-ons <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
