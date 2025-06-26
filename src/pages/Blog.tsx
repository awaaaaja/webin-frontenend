
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Semua Artikel' },
    { id: 'business', name: 'Tips Bisnis' },
    { id: 'digital', name: 'Digital Marketing' },
    { id: 'tech', name: 'Teknologi' },
    { id: 'success', name: 'Success Story' }
  ];

  const articles = [
    {
      id: 1,
      title: '10 Tips Memulai Bisnis Online untuk UMKM',
      excerpt: 'Panduan lengkap untuk UMKM yang ingin memulai bisnis online. Mulai dari persiapan hingga strategi marketing digital.',
      category: 'business',
      author: 'Tim UMKM Builder',
      date: '15 Januari 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Cara Optimasi SEO Website Bisnis Lokal',
      excerpt: 'Strategi SEO khusus untuk bisnis lokal agar mudah ditemukan customer di area sekitar.',
      category: 'digital',
      author: 'Sarah Digital',
      date: '12 Januari 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: 3,
      title: 'Success Story: Warung Makan Jadi Go Digital',
      excerpt: 'Kisah sukses Pak Budi yang berhasil meningkatkan omzet 300% setelah memiliki website.',
      category: 'success',
      author: 'Tim Editorial',
      date: '10 Januari 2024',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop',
      featured: true
    },
    {
      id: 4,
      title: 'Tren Website Design 2024 untuk UMKM',
      excerpt: 'Trend design website terbaru yang cocok untuk bisnis UMKM agar tampil modern dan profesional.',
      category: 'tech',
      author: 'Designer Team',
      date: '8 Januari 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: 5,
      title: 'WhatsApp Business: Maksimalkan Customer Service',
      excerpt: 'Tips menggunakan WhatsApp Business untuk meningkatkan pelayanan customer dan boost penjualan.',
      category: 'digital',
      author: 'Marketing Team',
      date: '5 Januari 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: 6,
      title: 'Domain .id vs .com: Mana yang Lebih Baik?',
      excerpt: 'Perbandingan lengkap antara domain .id dan .com untuk bisnis lokal Indonesia.',
      category: 'tech',
      author: 'Tech Team',
      date: '3 Januari 2024',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog UMKM Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tips, tutorial, dan insight terbaru untuk mengembangkan bisnis UMKM Anda
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Artikel Pilihan</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                      Featured
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600">{article.excerpt}</p>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artikel Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge variant="secondary" className="absolute top-4 left-4">
                    {categories.find(cat => cat.id === article.category)?.name}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm">{article.excerpt}</p>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    Baca Artikel <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Subscribe Newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Dapatkan tips bisnis dan update artikel terbaru langsung di email Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Email Anda" className="flex-1" />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;
