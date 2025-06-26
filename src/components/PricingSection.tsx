
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const PricingSection = () => {
  const pricingPackages = [
    {
      name: 'Starter',
      price: 'Rp 299.000',
      period: '/tahun',
      description: 'Cocok untuk bisnis kecil yang baru memulai',
      features: [
        'Domain .com gratis 1 tahun',
        'Website responsive',
        'SSL Certificate',
        'Basic SEO',
        'Support email'
      ],
      popular: false,
      buttonText: 'Pilih Starter'
    },
    {
      name: 'Professional',
      price: 'Rp 599.000',
      period: '/tahun',
      description: 'Untuk bisnis yang ingin berkembang pesat',
      features: [
        'Domain .com gratis 1 tahun',
        'Website premium design',
        'SSL Certificate',
        'Advanced SEO',
        'WhatsApp integration',
        'Google Analytics',
        'Support prioritas'
      ],
      popular: true,
      buttonText: 'Pilih Professional'
    },
    {
      name: 'Enterprise',
      price: 'Rp 999.000',
      period: '/tahun',
      description: 'Solusi lengkap untuk bisnis besar',
      features: [
        'Domain .com gratis 1 tahun',
        'Custom website design',
        'SSL Certificate',
        'Full SEO optimization',
        'E-commerce ready',
        'Multiple integrations',
        'Dedicated support',
        'Monthly consultations'
      ],
      popular: false,
      buttonText: 'Pilih Enterprise'
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Paket Website Terjangkau
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPackages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-xl transition-all duration-300 ${
                pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Paling Populer
                  </span>
                </div>
              )}
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-600">{pkg.price}</span>
                    <span className="text-gray-600 font-medium">{pkg.period}</span>
                  </div>
                  <p className="text-gray-600 font-medium">{pkg.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full font-semibold ${
                    pkg.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  {pkg.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
