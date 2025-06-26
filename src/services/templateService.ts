
import { apiService } from './api';

export interface Template {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  features: string[];
  popular: boolean;
  description?: string;
  demo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export class TemplateService {
  // Get all templates
  static async getTemplates(): Promise<Template[]> {
    return apiService.get<Template[]>('/templates');
  }

  // Get templates by category
  static async getTemplatesByCategory(category: string): Promise<Template[]> {
    return apiService.get<Template[]>(`/templates/category/${category}`);
  }

  // Get template by ID
  static async getTemplate(templateId: number): Promise<Template> {
    return apiService.get<Template>(`/templates/${templateId}`);
  }

  // Get popular templates
  static async getPopularTemplates(): Promise<Template[]> {
    return apiService.get<Template[]>('/templates/popular');
  }
}
