import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrder } from '@/contexts/OrderContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Eye, 
  Mail, 
  Search, 
  MessageCircle, 
  Globe, 
  ShoppingCart, 
  Star,
  CreditCard,
  Smartphone,
  Building,
  Camera,
  BarChart3,
  Calendar,
  Users,
  MapPin,
  Phone,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [domainName, setDomainName] = useState('');
  const [extension, setExtension] = useState('.com');
  const [domainResult, setDomainResult] = useState<any>(null);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const { order, updateOrder, addAddon, removeAddon } = useOrder();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    { number: 1, title: 'Pilih Domain', description: 'Pilih nama domain Anda' },
    { number: 2, title: 'Pilih Template', description: 'Pilih desain website Anda' },
    { number: 3, title: 'Add-ons', description: 'Tambahkan fitur ekstra' },
    { number: 4, title: 'Data Diri', description: 'Lengkapi informasi' },
    { number: 5, title: 'Pembayaran', description: 'Konfirmasi pembayaran' }
  ];

  const extensions = [
    { value: '.com', label: '.com', price: 'Rp 150.000/tahun' },
    { value: '.id', label: '.id', price: 'Rp 200.000/tahun' },
    { value: '.co.id', label: '.co.id', price: 'Rp 180.000/tahun' },
    { value: '.net', label: '.net', price: 'Rp 160.000/tahun' },
    { value: '.org', label: '.org', price: 'Rp 140.000/tahun' }
  ];

  const templateCategories = {
    restaurant: [
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
        name: 'Restaurant Mewah',
        category: 'restaurant',
        price: 'Rp 699.000',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
        features: ['Menu Premium', 'Reservasi Online', 'Gallery Photos', 'Review System'],
        popular: false
      }
    ],
    fashion: [
      {
        id: 3,
        name: 'Butik Fashion Modern',
        category: 'fashion',
        price: 'Rp 599.000',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
        features: ['Katalog Produk', 'Size Chart', 'Instagram Feed', 'Payment Gateway'],
        popular: false
      },
      {
        id: 4,
        name: 'Toko Fashion Online',
        category: 'fashion',
        price: 'Rp 799.000',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
        features: ['E-commerce', 'Wishlist', 'Fashion Blog', 'Social Media'],
        popular: true
      }
    ],
    automotive: [
      {
        id: 5,
        name: 'Bengkel Motor',
        category: 'automotive',
        price: 'Rp 399.000',
        image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop',
        features: ['Layanan Service', 'Booking Online', 'Galeri', 'Kontak Darurat'],
        popular: false
      },
      {
        id: 6,
        name: 'Showroom Mobil',
        category: 'automotive',
        price: 'Rp 899.000',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
        features: ['Katalog Mobil', 'Test Drive', 'Financing', 'Trade-in'],
        popular: false
      }
    ],
    health: [
      {
        id: 7,
        name: 'Klinik Kesehatan',
        category: 'health',
        price: 'Rp 549.000',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
        features: ['Jadwal Dokter', 'Booking Appointment', 'Info Layanan', 'Emergency Contact'],
        popular: true
      }
    ],
    education: [
      {
        id: 8,
        name: 'Lembaga Kursus',
        category: 'education',
        price: 'Rp 649.000',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
        features: ['Course Catalog', 'Online Learning', 'Student Portal', 'Certificate'],
        popular: false
      }
    ],
    agriculture: [
      {
        id: 9,
        name: 'Toko Sayuran Segar',
        category: 'agriculture',
        price: 'Rp 449.000',
        image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop',
        features: ['Fresh Products', 'Delivery Service', 'Farm Gallery', 'Seasonal Offers'],
        popular: true
      }
    ]
  };

  const addons = [
    {
      id: 'custom-email',
      name: 'Email Kustom',
      description: 'Email profesional dengan nama domain Anda (info@domain.com)',
      price: 'Rp 99.000/tahun',
      icon: Mail,
      popular: true
    },
    {
      id: 'seo-optimization',
      name: 'SEO Optimization',
      description: 'Optimasi untuk mesin pencari Google dan Bing',
      price: 'Rp 299.000',
      icon: Search,
      popular: true
    },
    {
      id: 'whatsapp-integration',
      name: 'Integrasi WhatsApp',
      description: 'Tombol WhatsApp otomatis untuk customer service',
      price: 'Rp 149.000',
      icon: MessageCircle,
      popular: true
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Tracking pengunjung dan analisis website',
      price: 'Rp 199.000',
      icon: BarChart3,
      popular: false
    },
    {
      id: 'social-media',
      name: 'Social Media Integration',
      description: 'Instagram, Facebook, dan TikTok feed otomatis',
      price: 'Rp 179.000',
      icon: Camera,
      popular: false
    },
    {
      id: 'booking-system',
      name: 'Sistem Booking',
      description: 'Reservasi online dengan kalender dan notifikasi',
      price: 'Rp 349.000',
      icon: Calendar,
      popular: false
    },
    {
      id: 'customer-reviews',
      name: 'Customer Reviews',
      description: 'Sistem review dan rating dari pelanggan',
      price: 'Rp 229.000',
      icon: Star,
      popular: false
    },
    {
      id: 'live-chat',
      name: 'Live Chat',
      description: 'Chat langsung dengan pengunjung website',
      price: 'Rp 279.000',
      icon: Users,
      popular: false
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      description: 'Integrasi peta lokasi bisnis Anda',
      price: 'Rp 129.000',
      icon: MapPin,
      popular: false
    },
    {
      id: 'contact-form',
      name: 'Advanced Contact Form',
      description: 'Form kontak dengan multiple fields dan auto-reply',
      price: 'Rp 159.000',
      icon: Phone,
      popular: false
    }
  ];

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Kartu Kredit/Debit',
      icon: CreditCard,
      description: 'Visa, Mastercard, dan kartu lokal'
    },
    {
      id: 'bank-transfer',
      name: 'Transfer Bank',
      icon: Building,
      description: 'BCA, Mandiri, BNI, BRI'
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      icon: Smartphone,
      description: 'GoPay, OVO, DANA, LinkAja'
    }
  ];

  // Auto-check domain if coming from homepage
  useEffect(() => {
    const domainParam = searchParams.get('domain');
    if (domainParam && !domainResult) {
      setDomainName(domainParam);
      // Auto-check domain after setting the name
      setTimeout(() => {
        handleDomainCheck(domainParam);
      }, 500);
    }
  }, [searchParams]);

  const handleDomainCheck = async (domainToCheck?: string) => {
    const checkDomain = domainToCheck || domainName;
    
    if (!checkDomain.trim()) {
      toast({
        title: "Domain Required",
        description: "Please enter a domain name to check",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingDomain(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random availability (70% available)
    const isAvailable = Math.random() > 0.3;
    const selectedExt = extensions.find(ext => ext.value === extension);
    
    setDomainResult({
      domain: checkDomain + extension,
      available: isAvailable,
      price: selectedExt?.price || 'Rp 150.000/tahun',
      alternatives: !isAvailable ? [
        { domain: checkDomain + '.net', available: true, price: 'Rp 160.000/tahun' },
        { domain: checkDomain + '.org', available: true, price: 'Rp 140.000/tahun' },
        { domain: checkDomain + '.id', available: true, price: 'Rp 200.000/tahun' }
      ] : null
    });
    
    setIsCheckingDomain(false);
  };

  const handleDomainSelect = (selectedDomain: string, selectedExtension: string) => {
    updateOrder({
      domain: selectedDomain.replace(selectedExtension, ''),
      extension: selectedExtension
    });
    
    toast({
      title: "Domain Selected",
      description: `${selectedDomain} added to your order`,
    });
  };

  const handleNext = () => {
    if (currentStep === 1 && !domainResult?.domain) {
      toast({
        title: "Domain Required",
        description: "Please check and select a domain before continuing",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 2 && !selectedTemplate) {
      toast({
        title: "Template Required",
        description: "Please select a template before continuing",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 4) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: "Form Incomplete",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      updateOrder({ 
        template: selectedTemplate,
        addons: selectedAddons,
        userDetails: formData 
      });
      navigate('/thankyou');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
  };

  const handleAddonChange = (addonId: string, checked: boolean) => {
    if (checked) {
      setSelectedAddons(prev => [...prev, addonId]);
    } else {
      setSelectedAddons(prev => prev.filter(id => id !== addonId));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Domain Website</h2>
              <p className="text-gray-600 font-medium">Cari dan pilih nama domain untuk website Anda</p>
            </div>
            
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Cek Ketersediaan Domain</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Masukkan nama domain (contoh: tokosaya)"
                      value={domainName}
                      onChange={(e) => setDomainName(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                      className="text-lg h-12"
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={extension} onValueChange={setExtension}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {extensions.map((ext) => (
                          <SelectItem key={ext.value} value={ext.value}>
                            <div className="flex justify-between items-center w-full">
                              <span>{ext.label}</span>
                              <span className="text-sm text-gray-500 ml-2">{ext.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={() => handleDomainCheck()}
                    disabled={isCheckingDomain}
                    className="bg-blue-600 hover:bg-blue-700 h-12 px-8"
                  >
                    {isCheckingDomain ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Checking...
                      </div>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Cek Domain
                      </>
                    )}
                  </Button>
                </div>

                {domainResult && (
                  <div className="space-y-4">
                    {/* Main Result */}
                    <div className={`p-6 rounded-lg border-2 ${
                      domainResult.available 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-red-200 bg-red-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {domainResult.available ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-600" />
                          )}
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {domainResult.domain}
                            </h3>
                            <p className={`text-sm ${
                              domainResult.available ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {domainResult.available ? 'Available' : 'Not Available'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">{domainResult.price}</p>
                          {domainResult.available && (
                            <Button
                              onClick={() => handleDomainSelect(domainResult.domain, extension)}
                              className="mt-2 bg-green-600 hover:bg-green-700"
                            >
                              Pilih Domain
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Alternatives */}
                    {domainResult.alternatives && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          Domain Alternatif yang Tersedia
                        </h4>
                        <div className="space-y-3">
                          {domainResult.alternatives.map((alt: any, index: number) => (
                            <div
                              key={index}
                              className="p-4 border border-gray-200 rounded-lg bg-white"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="h-6 w-6 text-green-600" />
                                  <div>
                                    <h5 className="font-medium text-gray-900">{alt.domain}</h5>
                                    <p className="text-sm text-green-600">Available</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-gray-900">{alt.price}</p>
                                  <Button
                                    onClick={() => handleDomainSelect(alt.domain, alt.domain.substring(alt.domain.lastIndexOf('.')))}
                                    variant="outline"
                                    size="sm"
                                    className="mt-1"
                                  >
                                    Pilih
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Template Website</h2>
              <p className="text-gray-600 font-medium">Template profesional untuk UMKM Indonesia</p>
            </div>
            
            <Tabs defaultValue="restaurant" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8">
                <TabsTrigger value="restaurant" className="font-medium">Restoran</TabsTrigger>
                <TabsTrigger value="fashion" className="font-medium">Fashion</TabsTrigger>
                <TabsTrigger value="automotive" className="font-medium">Otomotif</TabsTrigger>
                <TabsTrigger value="health" className="font-medium">Kesehatan</TabsTrigger>
                <TabsTrigger value="education" className="font-medium">Pendidikan</TabsTrigger>
                <TabsTrigger value="agriculture" className="font-medium">Pertanian</TabsTrigger>
              </TabsList>
              
              {Object.entries(templateCategories).map(([category, templates]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                      <Card 
                        key={template.id} 
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedTemplate?.id === template.id 
                            ? 'ring-2 ring-blue-500 shadow-lg' 
                            : ''
                        }`}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <div className="relative">
                          <img 
                            src={template.image} 
                            alt={template.name}
                            className="w-full h-40 object-cover rounded-t-lg"
                          />
                          {template.popular && (
                            <Badge className="absolute top-2 left-2 bg-red-500">Popular</Badge>
                          )}
                          {selectedTemplate?.id === template.id && (
                            <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold">{template.name}</h3>
                            <span className="text-blue-600 font-bold">{template.price}</span>
                          </div>
                          <div className="space-y-2 mb-4">
                            {template.features.slice(0, 2).map((feature, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <Check className="h-3 w-3 text-green-500 mr-2" />
                                <span className="font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" size="sm" className="w-full font-semibold">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Add-ons</h2>
              <p className="text-gray-600 font-medium">Tingkatkan website dengan fitur tambahan</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                const IconComponent = addon.icon;
                
                return (
                  <Card 
                    key={addon.id} 
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleAddonChange(addon.id, !isSelected)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600' : 'bg-gray-100'}`}>
                            <IconComponent className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{addon.name}</h3>
                            <p className="text-blue-600 font-bold">{addon.price}</p>
                          </div>
                        </div>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleAddonChange(addon.id, !!checked)}
                        />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">{addon.description}</p>
                      {addon.popular && (
                        <Badge className="mt-2 bg-green-500 text-white">Recommended</Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Diri</h2>
              <p className="text-gray-600 font-medium">Lengkapi informasi untuk melanjutkan</p>
            </div>
            
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="fullName" className="font-semibold">Nama Lengkap *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Masukkan nama lengkap"
                    className="font-medium"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-semibold">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                    className="font-medium"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-semibold">Nomor WhatsApp *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="08xxxxxxxxxx"
                    className="font-medium"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran</h2>
              <p className="text-gray-600 font-medium">Konfirmasi pesanan dan pilih metode pembayaran</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold">Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between font-medium">
                    <span>Domain: {order.domain}{order.extension}</span>
                    <span>Rp 150.000</span>
                  </div>
                  {selectedTemplate && (
                    <div className="flex justify-between font-medium">
                      <span>Template: {selectedTemplate.name}</span>
                      <span>{selectedTemplate.price}</span>
                    </div>
                  )}
                  {selectedAddons.length > 0 && selectedAddons.map(addonId => {
                    const addon = addons.find(a => a.id === addonId);
                    return addon ? (
                      <div key={addonId} className="flex justify-between text-sm font-medium">
                        <span>• {addon.name}</span>
                        <span>{addon.price}</span>
                      </div>
                    ) : null;
                  })}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-600">Rp 948.000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold">Metode Pembayaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <div
                        key={method.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-500 font-medium">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto flex">
        {/* Progress Stepper - Vertical */}
        <div className="w-80 bg-white border-r min-h-screen p-6">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-16 mt-2 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-base font-semibold ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 p-8">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center font-semibold"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 flex items-center font-semibold"
              >
                {currentStep === 5 ? 'Bayar Sekarang' : 'Next'}
                {currentStep < 5 && <ChevronRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
