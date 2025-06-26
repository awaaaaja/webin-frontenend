
import { TemplateCard } from './TemplateCard';

interface Template {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  features: string[];
  popular: boolean;
}

interface TemplateGridProps {
  templates: Template[];
  selectedTemplate: Template | null;
  onSelectTemplate: (template: Template) => void;
}

export const TemplateGrid = ({ templates, selectedTemplate, onSelectTemplate }: TemplateGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplate?.id === template.id}
          onSelect={onSelectTemplate}
        />
      ))}
    </div>
  );
};
