
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOrder } from '@/contexts/OrderContext';
import { 
  CheckCircle, 
  Mail, 
  MessageCircle, 
  Calendar,
  ArrowRight,
  Download,
  Star
} from 'lucide-react';

const ThankYou = () => {
  const { order, clearOrder } = useOrder();

  useEffect(() => {
    // You might want to clear the order after successful completion
    // clearOrder();
  }, []);

  const nextSteps = [
    {
      icon: Mail,
      title: 'Konfirmasi Email',
      description: 'Anda akan menerima email konfirmasi dalam 5-10 menit',
      time: 'Sekarang'
    },
    {
      icon: MessageCircle,
      title: 'Kontak WhatsApp',
      description: 'Tim kami akan menghubungi Anda via WhatsApp untuk koordinasi',
      time: '1-2 jam'
    },
    {
      icon: Calendar,
      title: 'Proses Pembuatan',
      description: 'Website Anda akan dikerjakan oleh tim developer profesional',
      time: '24-48 jam'
    },
    {
      icon: CheckCircle,
      title: 'Website Selesai',
      description: 'Anda akan mendapat notifikasi ketika website sudah siap',
      time: '2-3 hari'
    }
  ];

  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terima Kasih!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Pesanan Anda berhasil diterima
          </p>
          <p className="text-lg text-gray-500">
            Order ID: <span className="font-mono font-semibold text-blue-600">#{orderNumber}</span>
          </p>
        </div>

        {/* Order Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detail Pesanan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Informasi Website</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">Domain:</span> {order.domain}{order.extension}</p>
                  <p><span className="font-medium">Template:</span> {order.template?.name || 'Not selected'}</p>
                  <p><span className="font-medium">Add-ons:</span> {order.addons.length} items</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Kontak</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">Nama:</span> {order.userDetails.fullName}</p>
                  <p><span className="font-medium">Email:</span> {order.userDetails.email}</p>
                  <p><span className="font-medium">WhatsApp:</span> {order.userDetails.phone}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Langkah Selanjutnya</h2>
            <div className="space-y-6">
              {nextSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">Informasi Penting</h2>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Pastikan nomor WhatsApp Anda aktif untuk koordinasi dengan tim kami
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Siapkan konten website seperti logo, foto produk, dan deskripsi bisnis
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Domain akan aktif dalam 24 jam setelah pembayaran dikonfirmasi
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Invoice
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Hubungi Support
            </Button>
          </div>
          
          <div className="pt-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              <Link to="/">
                Kembali ke Beranda <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Rating Request */}
          <Card className="mt-8 max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                Bagaimana pengalaman pemesanan Anda?
              </p>
              <Button variant="outline" size="sm">
                Berikan Rating
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
