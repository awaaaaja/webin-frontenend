
import { useQuery } from '@tanstack/react-query';
import { TemplateService } from '@/services/templateService';

// Hook untuk mendapatkan semua templates
export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: TemplateService.getTemplates,
  });
};

// Hook untuk mendapatkan templates berdasarkan kategori
export const useTemplatesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['templates', 'category', category],
    queryFn: () => TemplateService.getTemplatesByCategory(category),
    enabled: !!category,
  });
};

// Hook untuk mendapatkan template berdasarkan ID
export const useTemplate = (templateId: number) => {
  return useQuery({
    queryKey: ['templates', templateId],
    queryFn: () => TemplateService.getTemplate(templateId),
    enabled: !!templateId,
  });
};

// Hook untuk mendapatkan popular templates
export const usePopularTemplates = () => {
  return useQuery({
    queryKey: ['templates', 'popular'],
    queryFn: TemplateService.getPopularTemplates,
  });
};
