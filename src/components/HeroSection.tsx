
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, Shield, TrendingUp, Headphones, Star, Sparkles } from 'lucide-react';
import { useTypingEffect } from '@/hooks/useTypingEffect';

const HeroSection = () => {
  const [domain, setDomain] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get domain from URL params if exists
  useEffect(() => {
    const domainParam = searchParams.get('domain');
    if (domainParam) {
      setDomain(domainParam);
    }
  }, [searchParams]);

  const typingTexts = [
    "Paket lengkap domain + website profesional",
    "Kembangkan bisnis UMKM Anda", 
    "Online dengan mudah"
  ];

  const { text: typingText, showCursor } = useTypingEffect({
    texts: typingTexts,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 1500
  });

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      // Navigate to wizard with domain parameter
      navigate(`/wizard?domain=${encodeURIComponent(domain.trim())}`);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-16 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-24 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-yellow-400 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white rounded-full blur-lg opacity-60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-white space-y-10">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                Wujudkan Website
                <span className="block text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text">
                  UMKM Impian Anda
                </span>
              </h1>
              
              {/* Typing Effect Text */}
              <div className="min-h-[80px] flex items-center">
                <p className="text-2xl md:text-3xl text-blue-100 leading-relaxed font-light max-w-2xl">
                  {typingText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 text-yellow-300`}>|</span>
                </p>
              </div>
            </div>

            {/* Domain Search Form - Enhanced */}
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-2xl font-semibold text-white">
                  Mulai dengan Domain Anda
                </h3>
              </div>
              <form onSubmit={handleDomainSearch} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Masukkan nama domain (contoh: tokosaya)"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="h-16 text-xl bg-white border-0 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:text-gray-900 transition-all font-medium shadow-lg rounded-xl"
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg" 
                    className="h-16 px-10 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-xl transition-all transform hover:scale-105 shadow-lg rounded-xl"
                  >
                    <Search className="mr-3 h-6 w-6" />
                    Mulai Sekarang
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-blue-100 text-lg font-medium flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
                    Domain .com mulai Rp 150.000/tahun
                  </p>
                  <div className="flex items-center text-yellow-300">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-2 text-blue-100 text-sm">4.9/5 Rating</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Enhanced Benefits Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white font-semibold text-lg block">Website Siap 24 Jam</span>
                  <span className="text-blue-200 text-sm">Proses cepat & mudah</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white font-semibold text-lg block">SSL Gratis</span>
                  <span className="text-blue-200 text-sm">Keamanan terjamin</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white font-semibold text-lg block">SEO Optimized</span>
                  <span className="text-blue-200 text-sm">Mudah ditemukan Google</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white font-semibold text-lg block">Support 24/7</span>
                  <span className="text-blue-200 text-sm">Tim siap membantu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Clean Image */}
          <div className="relative">
            <div className="relative">
              {/* Main Image with elegant styling */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=700&fit=crop&crop=face"
                  alt="Happy person using laptop for business"
                  className="w-full h-[700px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Elegant overlay content */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">12,000+</h4>
                        <p className="text-gray-600 font-medium">UMKM Sukses Bergabung</p>
                      </div>
                      <div className="text-green-500">
                        <TrendingUp className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
