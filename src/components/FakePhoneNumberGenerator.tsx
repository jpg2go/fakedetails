import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone,
  RefreshCw, 
  Copy, 
  Download, 
  Settings, 
  Shield,TestTube2,ChevronDown,
  ArrowLeft,
  Menu,
  X,Globe,
  Briefcase,Hash,CheckCircle} from 'lucide-react';

interface GeneratedPhone {
  id: string;
  phone: string;
  country: string;
}

const FakePhoneNumberGenerator: React.FC = () => {
  const [generatedPhones, setGeneratedPhones] = useState<GeneratedPhone[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const [formatStyle, setFormatStyle] = useState<string>('national');
  const [includeSeparators, setIncludeSeparators] = useState<boolean>(true);
  const [batchCount, setBatchCount] = useState<number>(25);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const countries = [
    { id: 'US', name: 'United States' },
    { id: 'UK', name: 'United Kingdom' },
    { id: 'IN', name: 'India' },
    { id: 'AU', name: 'Australia' },
    { id: 'DE', name: 'Germany' }
  ];

  const features = [
    {
      icon: RefreshCw,
      title: 'Bulk Generation',
      description: 'Generate hundreds or thousands of phone numbers instantly for testing and fixtures.'
    },
    {
      icon: Settings,
      title: 'Multiple Country Formats',
      description: 'Choose from common country formats (US, UK, IN, AU, DE) and output national or E.164 style.'
    },
    {
      icon: Copy,
      title: 'One-Click Copy',
      description: 'Copy any generated phone number instantly or export the entire list as a text file.'
    },
    {
      icon: Download,
      title: 'Export & Save',
      description: 'Download generated numbers as a text file for use in tests, demos, or CSV import.'
    },
    {
      icon: Shield,
      title: 'Privacy-First',
      description: 'All generation happens locally in your browser. Nothing is sent to a server.'
    },
    {
      icon: TestTube2,
      title: 'Format Presets',
      description: 'Use presets for mobile, landline, or VoIP styles so generated numbers match common patterns quickly.'
    }
  ];

  const faqs = [
    { question: 'Are these actual working phone numbers?', answer: 'No. These numbers are generated for testing and mockups. They may match real numbers by chance — avoid using them for live outreach.' },
    { question: 'Can I create international formats?', answer: 'Yes. Choose a country and toggle E.164 to include the international dialing code for cross‑country formats.' },
    { question: 'How do I ensure numbers are unique?', answer: 'Each generated batch avoids duplicates within itself. For extra safety, export the list and run any additional uniqueness checks you require.' },
    { question: 'Can I use these numbers in automated tests?', answer: 'Absolutely — they are designed for test suites, demo data, and staging environments. Don\'t use them for sending real SMS or calls.' },
    { question: 'What export options are available?', answer: 'Copy single numbers, download a plain-text list, or export large batches for CSV import and seeding databases.' },
    { question: 'Is any data sent to a server?', answer: 'No. All generation runs locally in your browser — nothing is uploaded or stored on our servers.' }
  ];

  const randomDigits = (n: number) => Array.from({ length: n }).map(() => Math.floor(Math.random() * 10)).join('');

  const generateSinglePhone = (): string => {
    // Simple per-country generators (not exhaustive but practical for mock data)
    if (selectedCountry === 'US') {
      const area = String(200 + Math.floor(Math.random() * 700));
      const central = String(200 + Math.floor(Math.random() * 700));
      const line = String(1000 + Math.floor(Math.random() * 9000));
      if (formatStyle === 'e164') return `+1${area}${central}${line}`;
      return includeSeparators ? `(${area}) ${central}-${line}` : `${area}${central}${line}`;
    }

    if (selectedCountry === 'UK') {
      const part1 = String(7 + Math.floor(Math.random() * 3)) + randomDigits(2);
      const part2 = randomDigits(3);
      const part3 = randomDigits(4);
      if (formatStyle === 'e164') return `+44${part1}${part2}${part3}`;
      return includeSeparators ? `${part1} ${part2} ${part3}` : `${part1}${part2}${part3}`;
    }

    if (selectedCountry === 'IN') {
      const first = String(6 + Math.floor(Math.random() * 4)) + randomDigits(1);
      const rest = randomDigits(8);
      if (formatStyle === 'e164') return `+91${first}${rest}`;
      return includeSeparators ? `${first}-${rest}` : `${first}${rest}`;
    }

    if (selectedCountry === 'AU') {
      const part1 = '4' + randomDigits(2);
      const part2 = randomDigits(3);
      const part3 = randomDigits(3);
      if (formatStyle === 'e164') return `+61${part1}${part2}${part3}`;
      return includeSeparators ? `${part1} ${part2} ${part3}` : `${part1}${part2}${part3}`;
    }

    // Default / DE
    const code = '49';
    const num = randomDigits(10);
    if (formatStyle === 'e164') return `+${code}${num}`;
    return includeSeparators ? `${num.slice(0,3)} ${num.slice(3,6)} ${num.slice(6)}` : num;
  };

  const generatePhones = () => {
    const count = Math.max(1, batchCount);
    const newPhones: GeneratedPhone[] = [];
    const used = new Set<string>();
    while (newPhones.length < count) {
      const phone = generateSinglePhone();
      if (!used.has(phone)) {
        used.add(phone);
        newPhones.push({ id: Date.now().toString() + Math.random().toString(36).substr(2, 9), phone, country: selectedCountry });
      }
    }
    setGeneratedPhones(prev => [...newPhones, ...prev]);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (_err) {
      if (copyRef.current) {
        copyRef.current.value = text;
        copyRef.current.select();
        document.execCommand('copy');
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    }
  };

  const exportPhones = () => {
    const text = generatedPhones.map(p => p.phone).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phone-numbers.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearPhones = () => setGeneratedPhones([]);

  return (
    <div className="min-h-screen bg-white">
      <textarea ref={copyRef} className="absolute opacity-0 pointer-events-none" tabIndex={-1} />

      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Fake Detail</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
              <Link to="/generators" className="text-gray-600 hover:text-purple-600 transition-colors">Generators</Link>
              <Link to="/generators" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Getted</Link>
            </nav>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Phone Number Generator</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">Produce realistic, formatted phone numbers for tests, demos, and seed data — single entries or bulk lists with flexible formats.</p>
          </div>
        </div>
      </section>

      <section id="generator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Settings</h3>
                <div className="flex-1 lg:overflow-y-auto lg:min-h-0 pr-1">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <div className="relative">
                      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-gray-900 font-medium">
                        {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><ChevronDown className="w-5 h-5 text-gray-400" /></div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <div className="flex space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" name="format" checked={formatStyle === 'national'} onChange={() => setFormatStyle('national')} className="w-4 h-4" /> <span className="text-sm text-gray-700">National</span></label>
                      <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" name="format" checked={formatStyle === 'e164'} onChange={() => setFormatStyle('e164')} className="w-4 h-4" /> <span className="text-sm text-gray-700">E.164</span></label>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" checked={includeSeparators} onChange={(e) => setIncludeSeparators(e.target.checked)} className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                      <span className="text-sm text-gray-700">Include Separators (spaces/dashes)</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-3 bg-white flex-shrink-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Count</label>
                    <input type="number" min="1" value={batchCount} onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold" placeholder="25" />
                    <p className="text-xs text-gray-500 mt-1 text-center">Generate unlimited phone numbers at once</p>
                  </div>

                  <button onClick={generatePhones} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg font-semibold"><RefreshCw className="w-5 h-5" /><span>Generate</span></button>

                  {generatedPhones.length > 0 && (<div className="pt-2 border-t border-gray-200"><div className="text-sm text-gray-600 mb-2 text-center">{generatedPhones.length} result{generatedPhones.length !== 1 ? 's' : ''} generated</div></div>)}

                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button onClick={exportPhones} disabled={generatedPhones.length === 0} className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-sm ${generatedPhones.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}><Download className="w-3 h-3 sm:w-4 sm:h-4" /><span>Export All</span></button>
                    <button onClick={clearPhones} disabled={generatedPhones.length === 0} className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${generatedPhones.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}><span>Clear All</span></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated Phone Numbers</h3>
                <div className="flex-1 flex flex-col lg:min-h-0">
                  {generatedPhones.length === 0 ? (
                    <div className="text-center py-8 lg:py-12 flex-1 flex flex-col justify-center">
                      <Phone className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-base lg:text-lg text-gray-500">No phone numbers generated yet</p>
                      <p className="text-sm lg:text-base text-gray-400">Set your desired count and click "Generate" to get started</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:min-h-0">
                      <div className={`space-y-3 flex-1 lg:min-h-0 ${generatedPhones.length > 9 ? 'lg:overflow-y-auto' : ''}`} style={generatedPhones.length > 9 ? { maxHeight: 'calc(100% - 2rem)' } : {}}>
                        {generatedPhones.map((item) => (
                          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-0">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0"><Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-base sm:text-lg break-all">{item.phone}</p>
                                <p className="text-xs sm:text-sm text-gray-500 capitalize">{item.country} • format</p>
                              </div>
                            </div>
                            <button onClick={() => copyToClipboard(item.phone, item.id)} className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base flex-shrink-0 ${copiedId === item.id ? 'bg-green-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                              {copiedId === item.id ? (<><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /><span className="hidden sm:inline">Copied!</span><span className="sm:hidden">✓</span></>) : (<><Copy className="w-3 h-3 sm:w-4 sm:h-4" /><span className="hidden sm:inline">Copy</span><span className="sm:hidden">Copy</span></>)}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="pt-16 md:pt-20 pb-12 md:pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key benefits</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Fast local generation with flexible country and format presets so you can seed tests and demos quickly.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4"><feature.icon className="w-6 h-6 text-white" /></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="pt-10 md:pt-12 pb-16 md:pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Quick workflow</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Pick country and format, generate the batch, then copy or export for your tooling.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4"><Settings className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Country & Format</h3>
              <p className="text-gray-600 leading-relaxed">Pick a country and the format (national or E.164) so numbers match your target environment.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4"><RefreshCw className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate in Bulk</h3>
              <p className="text-gray-600 leading-relaxed">Specify the quantity and generate many numbers at once — each batch avoids duplicates for test seeding.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4"><Copy className="w-6 h-6 text-white" /></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Copy or Export</h3>
              <p className="text-gray-600 leading-relaxed">Copy single numbers or download the full list as a text file for CSV import or sharing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="pt-16 md:pt-20 pb-10 md:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready for any workflow</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Generate formatted numbers for QA, demos, mockups, and database seeding without contacting real users.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6"><Phone className="w-8 h-8 text-white" /></div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">QA & Testing</h3>
                <p className="text-gray-600 leading-relaxed">Seed your test suites and QA environments with realistic-looking numbers to validate flows without contacting real users.</p>
              </div>
            </div>

            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6"><Briefcase className="w-8 h-8 text-white" /></div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Demos & Mockups</h3>
                <p className="text-gray-600 leading-relaxed">Create believable screenshots and demo data for presentations, product tours, and marketing materials.</p>
              </div>
            </div>

            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6"><Globe className="w-8 h-8 text-white" /></div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Seed Data & Fixtures</h3>
                <p className="text-gray-600 leading-relaxed">Populate databases, staging environments, and seed files with varied, formatted numbers for more realistic testing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Options Section */}
      <section id="export-options" className="pt-8 md:pt-10 pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Export options</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Copy single entries, download lists, or export bulk files for imports and seeding.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6"><Copy className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Copy to Clipboard</h3>
              <p className="text-gray-600 leading-relaxed">Quickly copy single numbers or short lists to paste into forms and tools.</p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6"><Download className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Download List</h3>
              <p className="text-gray-600 leading-relaxed">Download a plain-text list to import into spreadsheets, CSVs, or other tools.</p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6"><Hash className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Bulk Generation</h3>
              <p className="text-gray-600 leading-relaxed">Produce large volumes quickly and export for seeding test suites or staging datasets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">Questions</span></h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/50 overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        openFaq === index 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600'
                      }`}>
                        <span className="font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      openFaq === index 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rotate-180' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'
                    }`}>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="ml-14 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-l-4 border-gradient-to-b border-purple-500">
                        <p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Generate phone numbers fast</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Produce single entries or large batches locally — ready to copy, download, or import into your workflows.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">t Generating Now</button>
            <Link to="/" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">Explore More Tools</Link>
          </div>
        </div>
      </section>

      {/* Footer is rendered globally by App */}
    </div>
  );
};

export default FakePhoneNumberGenerator; 