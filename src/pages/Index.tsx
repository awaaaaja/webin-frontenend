
import HeroSection from '@/components/HeroSection';
import TemplateShowcase from '@/components/TemplateShowcase';
import PricingSection from '@/components/PricingSection';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Index = () => {
  const [stats, setStats] = useState({ businesses: 0, websites: 0, domains: 0 });

  useEffect(() => {
    // Animate counters
    const animateCounter = (target: number, key: keyof typeof stats) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 20);
    };

    animateCounter(12000, 'businesses');
    animateCounter(25000, 'websites');
    animateCounter(18000, 'domains');
  }, []);

  // Blog articles
  const blogArticles = [
    {
      id: 1,
      title: 'Tips Memulai Bisnis Online untuk UMKM',
      excerpt: 'Panduan lengkap untuk UMKM yang ingin memulai bisnis online dengan strategi yang tepat...',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      author: 'Tim WebinAsia',
      date: '15 Jun 2025',
      category: 'Tips Bisnis'
    },
    {
      id: 2,
      title: 'Mengoptimalkan Website untuk SEO',
      excerpt: 'Cara mudah meningkatkan ranking website Anda di Google dengan teknik SEO yang efektif...',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop',
      author: 'Ahli Digital WebinAsia',
      date: '12 Jun 2025',
      category: 'SEO'
    },
    {
      id: 3,
      title: 'Strategi Media Sosial untuk UMKM',
      excerpt: 'Manfaatkan kekuatan media sosial untuk meningkatkan brand awareness dan penjualan...',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
      author: 'Konsultan Digital',
      date: '10 Jun 2025',
      category: 'Social Media'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Template Showcase Section */}
      <TemplateShowcase />

      {/* Pricing Packages Section */}
      <PricingSection />

      {/* Blog/Articles Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tips & Artikel Terbaru
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Pelajari strategi terbaik untuk mengembangkan bisnis online Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    {article.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 font-medium">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span className="font-medium">{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="font-medium">{article.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link to="/blog">
                Baca Artikel Lainnya <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Mengembangkan Bisnis Online Anda?
          </h2>
          <p className="text-xl mb-8 text-blue-100 font-medium">
            Bergabunglah dengan ribuan UMKM yang telah sukses meningkatkan penjualan melalui website profesional dari WebinAsia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg">
              <Link to="/wizard">
                Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
              <Link to="/templates">
                Lihat Template
              </Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-blue-500/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">12,000+</div>
                <div className="text-blue-100 font-medium">UMKM Terdaftar</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">25,000+</div>
                <div className="text-blue-100 font-medium">Website Aktif</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">98%</div>
                <div className="text-blue-100 font-medium">Tingkat Kepuasan</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
