import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  RefreshCw,
  Copy,
  Download,
  Settings,
  Shield,ChevronDown,
  ArrowLeft,
  Menu,
  X,Gamepad2,
  Briefcase,
  Sparkles,
  AtSign,
  CheckCircle} from 'lucide-react';


function randomDigits(len: number) {
  let s = '';
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
}

// Luhn algorithm for IMEI
function luhnCheckDigit(base: string) {
  const digits = base.split('').map(d => parseInt(d, 10));
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let val = digits[digits.length - 1 - i];
    if (i % 2 === 0) {
      val *= 2;
      if (val > 9) val -= 9;
    }
    sum += val;
  }
  const check = (10 - (sum % 10)) % 10;
  return String(check);
}

const IMEINumberGenerator: React.FC = () => {
  const [generated, setGenerated] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('mobile');
  const [count, setCount] = useState<number>(10);
  const [_grouped, _setGrouped] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const types = [
    { id: 'mobile', name: 'Mobile' },
    { id: 'apple', name: 'Apple (15-digit IMEI / Type)' },
    { id: 'generic', name: 'Generic IMEI' }
  ];

  const features = [
    { icon: RefreshCw, title: 'Fast Generation', description: 'Generate large batches of IMEI numbers instantly.' },
    { icon: Settings, title: 'Multiple Formats', description: 'Choose mobile, apple, or generic IMEI patterns.' },
    { icon: Copy, title: 'One-Click Copy', description: 'Copy individual IMEIs or export the list.' },
    { icon: Download, title: 'Export', description: 'Download IMEIs as a text file for fixtures and testing.' },
    { icon: Shield, title: 'Privacy-First', description: 'All generation happens locally in your browser.' },
    { icon: Sparkles, title: 'Valid Check Digit', description: 'Generated IMEIs include a correct Luhn check digit.' }
  ];


  const faqs = [
    { question: 'Are generated IMEIs usable on networks?', answer: 'No. These are for test and mock data only — do not use them to attempt registration on real networks.' },
    { question: 'Can I control vendor codes?', answer: 'You can switch between types (mobile/apple/generic) — further vendor control can be added.' }
  ];

  const generateSingleIMEI = (type: string) => {
    // IMEI: 15 digits usually. We'll generate base 14 digits then add Luhn check digit
    let base = '';
    if (type === 'apple') {
      // Apple often uses specific TACs; use a common pattern: 35xxxx
      base = '35' + randomDigits(12);
    } else if (type === 'mobile') {
      // random TAC then serial
      base = randomDigits(14);
    } else {
      base = randomDigits(14);
    }
    const check = luhnCheckDigit(base);
    return base + check;
  };

  const generate = () => {
    const n = Math.max(1, count);
    const out: string[] = [];
    const used = new Set<string>();
    while (out.length < n) {
      const imei = generateSingleIMEI(selectedType);
      if (!used.has(imei)) {
        used.add(imei);
        out.push(imei);
      }
    }
    setGenerated(prev => [...out, ...prev]);
  };

  const copy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (_err) {
      if (copyRef.current) {
        copyRef.current.value = text;
        copyRef.current.select();
        document.execCommand('copy');
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    }
  };

  const exportAll = () => {
    const blob = new Blob([generated.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imeis.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => setGenerated([]);

  return (
    <div className="min-h-screen bg-white">
      <textarea ref={copyRef} className="absolute opacity-0 pointer-events-none" tabIndex={-1} />

      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
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

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              <Link to="/" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">Home</Link>
              <Link to="/about" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">About</Link>
              <Link to="/generators" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">Generators</Link>
            </div>
          </div>
        )}
      </header>

      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"><ArrowLeft className="w-4 h-4 mr-2" />Back to Tools</Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">IMEI Number Generator</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">Generate valid IMEI numbers (Luhn) for testing, inventories, and mockups. All generated locally.</p>
          </div>
        </div>
      </section>

      <section id="generator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">IMEI Settings</h3>
                <div className="flex-1 lg:overflow-y-auto lg:min-h-0 pr-1">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <div className="relative">
                      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-gray-900 font-medium">
                        {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><ChevronDown className="w-5 h-5 text-gray-400" /></div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Count: {count}</label>
                    <input type="range" min={1} max={500} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1</span><span>500</span></div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-3 bg-white flex-shrink-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch Size</label>
                    <input type="number" min="1" value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold" placeholder="25" />
                    <p className="text-xs text-gray-500 mt-1 text-center">Generate many IMEIs at once (deduplicated)</p>
                  </div>

                  <button onClick={generate} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg font-semibold"><RefreshCw className="w-5 h-5" /><span>Generate IMEIs</span></button>

                  {generated.length > 0 && (
                    <div className="pt-2 border-t border-gray-200"><div className="text-sm text-gray-600 mb-2 text-center">{generated.length} IMEI{generated.length !== 1 ? 's' : ''} generated</div></div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button onClick={exportAll} disabled={generated.length === 0} className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-sm ${generated.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}><Download className="w-3 h-3 sm:w-4 sm:h-4" /><span>Export All</span></button>
                    <button onClick={clearAll} disabled={generated.length === 0} className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${generated.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}><span>Clear All</span></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated IMEIs</h3>

                <div className="flex-1 flex flex-col lg:min-h-0">
                  {generated.length === 0 ? (
                    <div className="text-center py-8 lg:py-12 flex-1 flex flex-col justify-center">
                      <User className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-base lg:text-lg text-gray-500">No IMEIs generated yet</p>
                      <p className="text-sm lg:text-base text-gray-400">Set your options and click "Generate" to get started</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:min-h-0">
                      <div className={`space-y-3 flex-1 lg:min-h-0 ${generated.length > 9 ? 'lg:overflow-y-auto' : ''}`} style={generated.length > 9 ? { maxHeight: 'calc(100% - 2rem)' } : {}}>
                        {generated.map((item, idx) => (
                          <div key={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-0">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0"><AtSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
                              <div className="min-w-0 flex-1"><p className="font-semibold text-gray-900 text-base sm:text-lg break-all">{item}</p><p className="text-xs sm:text-sm text-gray-500">IMEI</p></div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => copy(item, idx)} className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base flex-shrink-0 ${copiedIndex === idx ? 'bg-green-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                                {copiedIndex === idx ? (<><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /><span className="hidden sm:inline">Copied!</span><span className="sm:hidden">✓</span></>) : (<><Copy className="w-3 h-3 sm:w-4 sm:h-4" /><span className="hidden sm:inline">Copy</span><span className="sm:hidden">Copy</span></>)}
                              </button>
                            </div>
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Use</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Generate valid-looking IMEIs quickly: choose a format, set batch size, generate, and export for testing.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <Settings className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Select Format</h3>
              <p className="text-gray-600 leading-relaxed">Pick Mobile, Apple, or Generic IMEI formats to match your test needs.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Set Batch Size</h3>
              <p className="text-gray-600 leading-relaxed">Choose how many IMEIs to create and whether to deduplicate across the batch.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <Copy className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate & Inspect</h3>
              <p className="text-gray-600 leading-relaxed">Create deduplicated IMEIs with valid Luhn digits and preview results immediately.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export</h3>
              <p className="text-gray-600 leading-relaxed">Download IMEIs as plain-text for import into QA environments and inventory systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Fast bulk generation, multiple formats, valid Luhn check digits, and private local generation.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Generate valid-looking IMEIs locally with correct check digits — ideal for QA, inventory, and mockups.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Valid Digits</h3>
              <p className="text-gray-600 leading-relaxed">IMEIs include a correct Luhn check digit so they look realistic for testing.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Export lists for your QA teams, inventory managers, or development environments.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Flexible Formats</h3>
              <p className="text-gray-600 leading-relaxed">Choose mobile, Apple-specific patterns, or generic IMEI formats depending on your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30"><div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl"></div><div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8"><div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2></div>
          <div className="space-y-4">{faqs.map((faq, index) => (<div key={index} className="group"><div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/50 overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-300"><div className="flex items-center space-x-4"><div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600'}`}><span className="font-bold text-sm">{index + 1}</span></div><h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">{faq.question}</h3></div><div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'}`}><ChevronDown className="w-5 h-5 transition-transform duration-300" /></div></button><div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}><div className="px-6 md:px-8 pb-6 md:pb-8"><div className="ml-14 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-l-4 border-gradient-to-b border-purple-500"><p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p></div></div></div></div></div>))}</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Generate valid IMEIs for testing</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Create Luhn-checked IMEIs for QA, inventory seeding, and demos — fast, private, and export-ready.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><button onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">Start Generating</button><Link to="/" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">Explore More Tools</Link></div>
        </div>
      </section>

      {/* Footer is rendered globally by App */}

    </div>
  );
}

export default IMEINumberGenerator;