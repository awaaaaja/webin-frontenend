
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/d1d74ae2-6141-4d83-8337-ea5f8d99baa3.png" 
                alt="WebinAsia Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">WebinAsia</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Solusi terpercaya untuk UMKM di Indonesia dalam membangun kehadiran online dengan website profesional dan layanan domain terbaik.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@webinasia.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+62 751 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Padang, Sumatera Barat, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li><Link to="/domain" className="text-gray-300 hover:text-white transition-colors">Registrasi Domain</Link></li>
              <li><Link to="/templates" className="text-gray-300 hover:text-white transition-colors">Template Website</Link></li>
              <li><span className="text-gray-300">Optimasi SEO</span></li>
              <li><span className="text-gray-300">Integrasi WhatsApp</span></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dukungan</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Pusat Bantuan</span></li>
              <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Hubungi Kami</span></li>
              <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</span></li>
              <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Syarat Layanan</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 WebinAsia. Semua hak dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
