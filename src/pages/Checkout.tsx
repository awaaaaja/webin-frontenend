import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useOrder } from '@/contexts/OrderContext';
import { CreditCard, Smartphone, Building, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCreateOrder } from '@/hooks/useOrders';

const Checkout = () => {
  const { order, updateOrder } = useOrder();
  const [formData, setFormData] = useState(order.userDetails);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const createOrderMutation = useCreateOrder();

  const addons = [
    { id: 'custom-email', name: 'Email Kustom', price: 99000 },
    { id: 'seo-optimization', name: 'SEO Optimization', price: 299000 },
    { id: 'whatsapp-integration', name: 'Integrasi WhatsApp', price: 149000 },
    { id: 'multilingual', name: 'Website Multibahasa', price: 199000 },
    { id: 'online-store', name: 'Toko Online', price: 399000 },
    { id: 'premium-support', name: 'Premium Support', price: 199000 }
  ];

  const extensionPrices: { [key: string]: number } = {
    '.com': 150000,
    '.id': 200000,
    '.co.id': 180000,
    '.net': 160000,
    '.org': 140000
  };

  const templatePrices: { [key: string]: number } = {
    'Warung Makan Sederhana': 499000,
    'Butik Fashion Modern': 599000,
    'Bengkel Motor': 399000,
    'Toko Sayuran Segar': 449000,
    'Salon Kecantikan': 549000,
    'Toko Kelontong': 349000
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Domain price
    total += extensionPrices[order.extension] || 150000;
    
    // Template price
    total += templatePrices[order.template?.name] || 0;
    
    // Add-ons price
    order.addons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) {
        total += addon.price;
      }
    });
    
    return total;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Prepare order data for Laravel API
      const orderData = {
        domain: order.domain,
        extension: order.extension,
        template_name: order.template?.name || '',
        addons: order.addons,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        total_amount: calculateTotal(),
        payment_method: paymentMethod,
        status: 'pending' as const,
      };

      // Send to Laravel backend
      const createdOrder = await createOrderMutation.mutateAsync(orderData);
      
      // Update order context
      updateOrder({ 
        userDetails: formData,
        orderId: createdOrder.id 
      });
      
      navigate('/thankyou');
    } catch (error) {
      console.error('Order creation failed:', error);
      toast({
        title: "Order Failed",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">
            Lengkapi data dan pilih metode pembayaran untuk menyelesaikan pesanan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pelanggan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Nama Lengkap *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor WhatsApp *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
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
                        <div className={`p-2 rounded ${
                          paymentMethod === method.id ? 'bg-blue-600' : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`h-5 w-5 ${
                            paymentMethod === method.id ? 'text-white' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Domain */}
                <div className="flex justify-between">
                  <span>Domain: {order.domain}{order.extension}</span>
                  <span>Rp {(extensionPrices[order.extension] || 150000).toLocaleString()}</span>
                </div>

                {/* Template */}
                {order.template && (
                  <div className="flex justify-between">
                    <span>Template: {order.template.name}</span>
                    <span>Rp {(templatePrices[order.template.name] || 0).toLocaleString()}</span>
                  </div>
                )}

                {/* Add-ons */}
                {order.addons.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="font-medium mb-2">Add-ons:</p>
                      {order.addons.map(addonId => {
                        const addon = addons.find(a => a.id === addonId);
                        if (!addon) return null;
                        
                        return (
                          <div key={addonId} className="flex justify-between text-sm ml-4">
                            <span>• {addon.name}</span>
                            <span>Rp {addon.price.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                <Separator />
                
                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">Rp {calculateTotal().toLocaleString()}</span>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      Bayar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
