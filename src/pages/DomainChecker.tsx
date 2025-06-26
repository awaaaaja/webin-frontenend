import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrder } from '@/contexts/OrderContext';
import { Search, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DomainChecker = () => {
  const [domainName, setDomainName] = useState('');
  const [extension, setExtension] = useState('.com');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { updateOrder } = useOrder();
  const navigate = useNavigate();
  const { toast } = useToast();

  const extensions = [
    { value: '.com', label: '.com', price: 'Rp 150.000/tahun', description: 'Paling populer dan dipercaya' },
    { value: '.id', label: '.id', price: 'Rp 200.000/tahun', description: 'Khusus untuk Indonesia' },
    { value: '.co.id', label: '.co.id', price: 'Rp 180.000/tahun', description: 'Untuk perusahaan Indonesia' },
    { value: '.net', label: '.net', price: 'Rp 160.000/tahun', description: 'Alternatif terbaik .com' },
    { value: '.org', label: '.org', price: 'Rp 140.000/tahun', description: 'Untuk organisasi' }
  ];

  const handleSearch = async () => {
    if (!domainName.trim()) {
      toast({
        title: "Domain Required",
        description: "Please enter a domain name to check",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random availability (70% available)
    const isAvailable = Math.random() > 0.3;
    const selectedExt = extensions.find(ext => ext.value === extension);
    
    setResult({
      domain: domainName + extension,
      available: isAvailable,
      price: selectedExt?.price || 'Rp 150.000/tahun',
      alternatives: !isAvailable ? [
        { domain: domainName + '.net', available: true, price: 'Rp 160.000/tahun' },
        { domain: domainName + '.org', available: true, price: 'Rp 140.000/tahun' },
        { domain: domainName + '.id', available: true, price: 'Rp 200.000/tahun' }
      ] : null
    });
    
    setIsChecking(false);
  };

  const handleContinue = (selectedDomain: string, selectedExtension: string) => {
    updateOrder({
      domain: selectedDomain.replace(selectedExtension, ''),
      extension: selectedExtension
    });
    
    toast({
      title: "Domain Selected",
      description: `${selectedDomain} added to your order`,
    });
    
    navigate('/wizard');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cari Domain Untuk Website Anda
          </h1>
          <p className="text-xl text-gray-600">
            Temukan nama domain yang sempurna untuk bisnis UMKM Anda
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Cek Ketersediaan Domain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Masukkan nama domain (contoh: tokosaya)"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  onKeyPress={handleKeyPress}
                  className="text-lg h-12"
                />
              </div>
              <div className="w-full md:w-32">
                <Select value={extension} onValueChange={setExtension}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {extensions.map((ext) => (
                      <SelectItem key={ext.value} value={ext.value}>
                        {ext.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isChecking}
                className="bg-blue-600 hover:bg-blue-700 h-12 px-8"
              >
                {isChecking ? (
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
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Main Result */}
                <div className={`p-6 rounded-lg border-2 ${
                  result.available 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {result.available ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {result.domain}
                        </h3>
                        <p className={`text-sm ${
                          result.available ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {result.available ? 'Available' : 'Not Available'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{result.price}</p>
                      {result.available && (
                        <Button
                          onClick={() => handleContinue(result.domain, extension)}
                          className="mt-2 bg-green-600 hover:bg-green-700"
                        >
                          Pilih Domain <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Alternatives */}
                {result.alternatives && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Domain Alternatif yang Tersedia
                    </h4>
                    <div className="space-y-3">
                      {result.alternatives.map((alt: any, index: number) => (
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
                                onClick={() => handleContinue(alt.domain, alt.domain.substring(alt.domain.lastIndexOf('.')))}
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
            </CardContent>
          </Card>
        )}

        {/* Popular Domains */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Domain Populer untuk UMKM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {extensions.map((ext) => (
                <div key={ext.value} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <h4 className="font-semibold text-lg text-gray-900">{ext.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{ext.price}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {ext.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DomainChecker;
