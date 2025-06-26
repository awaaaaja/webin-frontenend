
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: 'Domain & Hosting',
      questions: [
        {
          question: 'Berapa lama proses pembuatan website?',
          answer: 'Website Anda akan selesai dalam 24-48 jam setelah konfirmasi pembayaran dan kelengkapan data yang diperlukan.'
        },
        {
          question: 'Apakah domain .id bisa digunakan untuk bisnis?',
          answer: 'Ya, domain .id sangat cocok untuk bisnis lokal Indonesia dan membantu meningkatkan kredibilitas bisnis Anda di mata customer lokal.'
        },
        {
          question: 'Bagaimana cara mengganti domain setelah website jadi?',
          answer: 'Anda bisa mengganti domain kapan saja dengan menghubungi tim support kami. Ada biaya tambahan untuk proses migrasi domain.'
        }
      ]
    },
    {
      category: 'Template & Design',
      questions: [
        {
          question: 'Bisakah saya request custom design?',
          answer: 'Ya, kami menyediakan layanan custom design dengan biaya tambahan. Tim designer kami akan bekerja sesuai dengan brief yang Anda berikan.'
        },
        {
          question: 'Apakah template bisa diubah setelah website jadi?',
          answer: 'Template bisa diubah, namun ada biaya redesign. Kami sarankan untuk memilih template dengan hati-hati di awal.'
        },
        {
          question: 'Apakah website responsive di mobile?',
          answer: 'Ya, semua template kami sudah responsive dan otomatis menyesuaikan tampilan di desktop, tablet, dan mobile.'
        }
      ]
    },
    {
      category: 'Pembayaran & Harga',
      questions: [
        {
          question: 'Apa saja metode pembayaran yang tersedia?',
          answer: 'Kami menerima transfer bank, e-wallet (OVO, GoPay, DANA), dan kartu kredit/debit melalui gateway payment yang aman.'
        },
        {
          question: 'Apakah ada biaya maintenance bulanan?',
          answer: 'Paket dasar sudah termasuk maintenance 1 tahun. Setelah itu ada biaya maintenance Rp 50.000/bulan untuk update dan backup.'
        },
        {
          question: 'Bisakah refund jika tidak puas?',
          answer: 'Kami memberikan garansi 7 hari. Jika tidak puas, kami akan revisi sesuai permintaan atau refund 100%.'
        }
      ]
    },
    {
      category: 'Fitur & Add-ons',
      questions: [
        {
          question: 'Bagaimana cara kerja integrasi WhatsApp?',
          answer: 'Integrasi WhatsApp memungkinkan customer langsung chat ke nomor WhatsApp bisnis Anda dengan sekali klik dari website.'
        },
        {
          question: 'Apakah SEO sudah termasuk dalam paket?',
          answer: 'SEO dasar sudah termasuk (meta tags, sitemap, speed optimization). Untuk SEO premium ada paket tambahan.'
        },
        {
          question: 'Bisakah menambah fitur e-commerce?',
          answer: 'Ya, kami bisa menambahkan fitur toko online dengan katalog produk, keranjang belanja, dan payment gateway.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      qa => 
        qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qa.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Temukan jawaban untuk pertanyaan yang sering ditanyakan
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFaqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((qa, qaIndex) => {
                  const itemIndex = categoryIndex * 100 + qaIndex;
                  const isOpen = openItems.includes(itemIndex);
                  
                  return (
                    <Card key={qaIndex} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleItem(itemIndex)}
                          className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">
                            {qa.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-600 leading-relaxed">
                              {qa.answer}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <Card className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tidak Menemukan Jawaban?
              </h2>
              <p className="text-gray-600 mb-6">
                Tim support kami siap membantu Anda dengan pertanyaan apapun
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 mr-4">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat dengan Support
              </Button>
              <Button variant="outline">
                Email Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
