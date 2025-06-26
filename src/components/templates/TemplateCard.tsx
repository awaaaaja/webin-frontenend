
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Check } from 'lucide-react';

interface Template {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  features: string[];
  popular: boolean;
}

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
}

export const TemplateCard = ({ template, isSelected, onSelect }: TemplateCardProps) => {
  return (
    <Card 
      className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'ring-2 ring-blue-500 shadow-lg' 
          : ''
      }`}
      onClick={() => onSelect(template)}
    >
      <div className="relative">
        <img 
          src={template.image} 
          alt={template.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {template.popular && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600 text-black">
            Popular
          </Badge>
        )}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
          <span className="text-lg font-bold text-blue-600">{template.price}</span>
        </div>
        <div className="space-y-2 mb-4">
          {template.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button 
            size="sm" 
            className={`flex-1 ${
              isSelected 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
