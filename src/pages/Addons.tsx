
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useOrder } from '@/contexts/OrderContext';
import { ArrowRight, Mail, Search, MessageCircle, Globe, ShoppingCart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Addons = () => {
  const { order, addAddon, removeAddon } = useOrder();
  const [selectedAddons, setSelectedAddons] = useState<string[]>(order.addons);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addons = [
    {
      id: 'custom-email',
      name: 'Email Kustom',
      description: 'Dapatkan email profesional dengan nama domain Anda (contoh: info@tokosaya.com)',
      price: 'Rp 99.000/tahun',
      icon: Mail,
      popular: true,
      features: [
        'Email dengan domain sendiri',
        '5 GB storage per email',
        'Akses IMAP/POP3',
        'Anti-spam protection'
      ]
    },
    {
      id: 'seo-optimization',
      name: 'SEO Optimization',
      description: 'Optimasi website agar mudah ditemukan di Google dan mesin pencari lainnya',
      price: 'Rp 299.000',
      icon: Search,
      popular: true,
      features: [
        'Setup Google Analytics',
        'Meta tags optimization',
        'Sitemap XML',
        'Google Search Console'
      ]
    },
    {
      id: 'whatsapp-integration',
      name: 'Integrasi WhatsApp',
      description: 'Tombol WhatsApp otomatis untuk memudahkan pelanggan menghubungi Anda',
      price: 'Rp 149.000',
      icon: MessageCircle,
      popular: true,
      features: [
        'Floating WhatsApp button',
        'Auto message template',
        'Multiple phone numbers',
        'Chat analytics'
      ]
    },
    {
      id: 'multilingual',
      name: 'Website Multibahasa',
      description: 'Tambahkan bahasa Inggris atau bahasa daerah untuk menjangkau lebih banyak pelanggan',
      price: 'Rp 199.000',
      icon: Globe,
      popular: false,
      features: [
        'Bahasa Indonesia + English',
        'Language switcher',
        'Translate content',
        'SEO multilingual'
      ]
    },
    {
      id: 'online-store',
      name: 'Toko Online',
      description: 'Fitur lengkap toko online dengan keranjang belanja dan payment gateway',
      price: 'Rp 399.000',
      icon: ShoppingCart,
      popular: false,
      features: [
        'Katalog produk unlimited',
        'Shopping cart',
        'Payment gateway',
        'Order management'
      ]
    },
    {
      id: 'premium-support',
      name: 'Premium Support',
      description: 'Dukungan prioritas 24/7 dan maintenance bulanan untuk website Anda',
      price: 'Rp 199.000/tahun',
      icon: Star,
      popular: false,
      features: [
        'Priority support 24/7',
        'Monthly maintenance',
        'Performance monitoring',
        'Backup & security'
      ]
    }
  ];

  const handleAddonChange = (addonId: string, checked: boolean) => {
    if (checked) {
      addAddon(addonId);
      setSelectedAddons(prev => [...prev, addonId]);
    } else {
      removeAddon(addonId);
      setSelectedAddons(prev => prev.filter(id => id !== addonId));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) {
        const priceStr = addon.price.replace(/[^\d]/g, '');
        total += parseInt(priceStr);
      }
    });
    return total;
  };

  const handleContinue = () => {
    if (selectedAddons.length === 0) {
      toast({
        title: "Continue without add-ons?",
        description: "You can add these features later. Continue to checkout?",
      });
    }
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tingkatkan Website Anda
          </h1>
          <p className="text-xl text-gray-600">
            Pilih fitur tambahan untuk memaksimalkan potensi bisnis online Anda
          </p>
        </div>

        {/* Order Summary */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Domain</p>
                <p className="font-semibold">{order.domain}{order.extension}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Template</p>
                <p className="font-semibold">{order.template?.name || 'No template selected'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Add-ons</p>
                <p className="font-semibold">{selectedAddons.length} selected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {addons.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);
            const IconComponent = addon.icon;
            
            return (
              <Card 
                key={addon.id} 
                className={`transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => handleAddonChange(addon.id, !isSelected)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600' : 'bg-gray-100'}`}>
                        <IconComponent className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg">{addon.name}</CardTitle>
                          {addon.popular && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-lg font-bold text-blue-600 mt-1">{addon.price}</p>
                      </div>
                    </div>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleAddonChange(addon.id, !!checked)}
                      className="mt-1"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">{addon.description}</p>
                  <div className="space-y-2">
                    {addon.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Selected Add-ons Summary */}
        {selectedAddons.length > 0 && (
          <Card className="mb-8 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Add-ons yang Dipilih</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedAddons.map(addonId => {
                  const addon = addons.find(a => a.id === addonId);
                  if (!addon) return null;
                  
                  return (
                    <div key={addonId} className="flex justify-between items-center">
                      <span className="font-medium">{addon.name}</span>
                      <span className="font-bold text-green-600">{addon.price}</span>
                    </div>
                  );
                })}
                <div className="border-t border-green-300 pt-3 mt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Add-ons:</span>
                    <span className="text-green-600">Rp {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={handleContinue}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
          >
            {selectedAddons.length > 0 ? 'Lanjut ke Checkout' : 'Skip Add-ons & Continue'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {selectedAddons.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Anda dapat menambahkan fitur ini kapan saja setelah website selesai
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addons;
