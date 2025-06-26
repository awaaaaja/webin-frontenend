
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { TemplateSearchBar } from '@/components/templates/TemplateSearchBar';
import { CategoryFilter } from '@/components/templates/CategoryFilter';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { NoResultsMessage } from '@/components/templates/NoResultsMessage';
import { SelectedTemplateCard } from '@/components/templates/SelectedTemplateCard';

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { updateOrder } = useOrder();
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'Semua Template' },
    { id: 'restaurant', name: 'Restoran & Kuliner' },
    { id: 'fashion', name: 'Fashion & Butik' },
    { id: 'automotive', name: 'Otomotif' },
    { id: 'agriculture', name: 'Pertanian' },
    { id: 'services', name: 'Jasa' },
    { id: 'retail', name: 'Retail & Toko' }
  ];

  const templates = [
    {
      id: 1,
      name: 'Warung Makan Sederhana',
      category: 'restaurant',
      price: 'Rp 499.000',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      features: ['Menu Online', 'Reservasi', 'Lokasi Maps', 'WhatsApp Order'],
      popular: true
    },
    {
      id: 2,
      name: 'Butik Fashion Modern',
      category: 'fashion',
      price: 'Rp 599.000',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      features: ['Katalog Produk', 'Size Chart', 'Instagram Feed', 'Payment Gateway'],
      popular: false
    },
    {
      id: 3,
      name: 'Bengkel Motor',
      category: 'automotive',
      price: 'Rp 399.000',
      image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop',
      features: ['Layanan Service', 'Booking Online', 'Galeri', 'Kontak Darurat'],
      popular: false
    },
    {
      id: 4,
      name: 'Toko Sayuran Segar',
      category: 'agriculture',
      price: 'Rp 449.000',
      image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop',
      features: ['Produk Fresh', 'Delivery Area', 'Pre-Order', 'Harga Update'],
      popular: true
    },
    {
      id: 5,
      name: 'Salon Kecantikan',
      category: 'services',
      price: 'Rp 549.000',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      features: ['Booking Treatment', 'Price List', 'Before/After', 'Staff Profile'],
      popular: false
    },
    {
      id: 6,
      name: 'Toko Kelontong',
      category: 'retail',
      price: 'Rp 349.000',
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=300&fit=crop',
      features: ['Katalog Lengkap', 'Stok Real-time', 'Promo/Diskon', 'Multi Payment'],
      popular: true
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    updateOrder({ template });
    
    toast({
      title: "Template Selected",
      description: `${template.name} has been added to your order`,
    });
  };

  const handleContinue = () => {
    if (!selectedTemplate) {
      toast({
        title: "No Template Selected",
        description: "Please select a template before continuing",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/addons');
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pilih Template Website Anda
          </h1>
          <p className="text-xl text-gray-600">
            Template profesional yang dirancang khusus untuk UMKM Indonesia
          </p>
        </div>

        {/* Search Bar */}
        <TemplateSearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Templates Grid */}
        <TemplateGrid 
          templates={filteredTemplates}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
        />

        {/* No Results Message */}
        {filteredTemplates.length === 0 && (
          <NoResultsMessage 
            searchQuery={searchQuery}
            onReset={handleReset}
          />
        )}

        {/* Continue Button */}
        {selectedTemplate && (
          <SelectedTemplateCard 
            selectedTemplate={selectedTemplate}
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  );
};

export default Templates;
