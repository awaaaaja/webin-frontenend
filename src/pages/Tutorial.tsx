
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Users } from 'lucide-react';

const Tutorial = () => {
  const tutorials = [
    {
      id: 1,
      title: 'Cara Memilih Domain yang Tepat',
      description: 'Pelajari tips memilih nama domain yang mudah diingat dan SEO-friendly untuk bisnis UMKM Anda.',
      duration: '5 menit',
      views: '1.2K',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Memilih Template Website yang Cocok',
      description: 'Panduan lengkap memilih template website berdasarkan jenis bisnis dan target market Anda.',
      duration: '8 menit',
      views: '2.1K',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Setting WhatsApp Integration',
      description: 'Langkah-langkah mengintegrasikan WhatsApp ke website untuk memudahkan customer menghubungi Anda.',
      duration: '6 menit',
      views: '1.8K',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Optimasi SEO untuk UMKM',
      description: 'Tips dasar SEO untuk meningkatkan visibilitas website bisnis UMKM di mesin pencari.',
      duration: '12 menit',
      views: '3.5K',
      thumbnail: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Mengelola Konten Website',
      description: 'Cara menambah, mengedit, dan mengelola konten website Anda dengan mudah.',
      duration: '10 menit',
      views: '1.9K',
      thumbnail: 'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?w=400&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'Menambahkan Produk ke Website',
      description: 'Tutorial lengkap cara menambahkan katalog produk dengan foto dan deskripsi yang menarik.',
      duration: '15 menit',
      views: '2.7K',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
    }
  ];

  const categories = [
    'Semua Tutorial',
    'Domain & Hosting',
    'Template & Design',
    'SEO & Marketing',
    'Teknis Website'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tutorial UMKM Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pelajari cara membangun dan mengelola website bisnis Anda dengan panduan video step-by-step
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img 
                  src={tutorial.thumbnail} 
                  alt={tutorial.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    <Play className="h-5 w-5 mr-2" />
                    Play
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {tutorial.duration}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{tutorial.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{tutorial.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {tutorial.views} views
                  </div>
                  <Button variant="outline" size="sm">
                    Tonton
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Butuh Bantuan Lebih Lanjut?
              </h2>
              <p className="text-gray-600 mb-6">
                Tim support kami siap membantu Anda 24/7 melalui WhatsApp
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Hubungi Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
