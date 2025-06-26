
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Eye } from 'lucide-react';

const TemplateShowcase = () => {
  const featuredTemplates = [
    {
      id: 1,
      name: 'Warung Makan Sederhana',
      category: 'Restoran',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      popular: true
    },
    {
      id: 2,
      name: 'Butik Fashion Modern',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      popular: false
    },
    {
      id: 3,
      name: 'Bengkel Motor',
      category: 'Otomotif',
      image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop',
      popular: false
    },
    {
      id: 4,
      name: 'Toko Sayuran Segar',
      category: 'Pertanian',
      image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop',
      popular: true
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Template Pilihan Terbaik
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Pilih dari berbagai template profesional yang dirancang khusus untuk berbagai jenis bisnis UMKM
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {template.popular && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{template.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 font-semibold">
            <Link to="/templates">
              Lihat Semua Template <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
