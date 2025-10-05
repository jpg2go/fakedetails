import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  RefreshCw,
  Copy,
  Download,
  Settings,
  Shield,
  Code,Palette,ChevronDown,
  ArrowLeft,
  Menu,
  X,Briefcase,
  Sparkles,
  AtSign,
  CheckCircle,Smile
} from 'lucide-react';

interface GeneratedProfile {
  id: string;
  title: string;
  description: string;
  category: string;
}

const PersonalityGenerator: React.FC = () => {
  const [generatedProfiles, setGeneratedProfiles] = useState<GeneratedProfile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('creative');
  const [tone, setTone] = useState<string>('friendly');
  const [length, setLength] = useState<number>(120);
  const [batchCount, setBatchCount] = useState<number>(6);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    { id: 'creative', name: 'Creative', icon: Palette },
    { id: 'professional', name: 'Professional', icon: Briefcase },
    { id: 'casual', name: 'Casual', icon: Smile },
    { id: 'tech', name: 'Tech', icon: Code },
    { id: 'story', name: 'Character', icon: Sparkles }
  ];

  const toneOptions = ['friendly', 'formal', 'funny', 'mysterious'];

  const seedPhrases: Record<string, string[]> = {
    creative: [
      'a visionary storyteller with a flair for vivid imagery',
      'an imaginative thinker who sees patterns in the ordinary',
      'a playful creator who blends color and context effortlessly'
    ],
    professional: [
      'a results-oriented strategist who values clarity and efficiency',
      'a dependable leader focused on scalable outcomes',
      'an analytical thinker with a calm, methodical approach'
    ],
    casual: [
      'a down-to-earth person who brings a relaxed, warm vibe',
      'a sociable conversationalist who values connection over perfection',
      'an easygoing friend with surprising insights'
    ],
    tech: [
      'a curious technologist who loves building practical solutions',
      'a pragmatic developer who favors clean, reusable patterns',
      'an experimental tinkerer exploring new APIs and tools'
    ],
    story: [
      'a brooding anti-hero shaped by loss and quiet resilience',
      'a bright-eyed protagonist with an adventurous spirit',
      'an enigmatic mentor with hidden motives'
    ]
  };

  const features = [
    { icon: RefreshCw, title: 'Instant Profiles', description: 'Generate complete personality descriptions instantly for characters, UX personas, or team bios.' },
    { icon: Settings, title: 'Multiple Styles', description: 'Choose from Creative, Professional, Casual, Tech, and Character styles.' },
    { icon: Copy, title: 'One-Click Copy', description: 'Copy any generated description instantly for use in prototypes and templates.' },
    { icon: Download, title: 'Export & Save', description: 'Download generated personalities as a text file for sharing or archiving.' },
    { icon: Shield, title: 'Local & Private', description: 'All generation runs locally in your browser; no data is sent to servers.' },
    { icon: Sparkles, title: 'Unique Results', description: 'Seeded combinations create varied, nuanced profiles each run.' }
  ];


  const faqs = [
    { question: 'Are these profiles original?', answer: 'Yes — they are generated from seeded phrases and combined dynamically in the browser.' },
    { question: 'Can I customize outputs?', answer: 'You can choose style, tone, length, and the number of profiles to generate.' },
    { question: 'Is data stored?', answer: 'No — everything runs locally and nothing is transmitted or saved.' }
  ];

  const generateSingleProfile = () => {
    const seeds = seedPhrases[selectedCategory as keyof typeof seedPhrases] || [];
    const seed = seeds[Math.floor(Math.random() * seeds.length)];
    const title = `${seed.split(' ')[0].charAt(0).toUpperCase() + seed.split(' ')[0].slice(1)} ${selectedCategory}`;

    let desc = seed;
    // adjust tone
    if (tone === 'friendly') desc = `Friendly, approachable — ${desc}.`;
    if (tone === 'formal') desc = `Formal and composed; ${desc}.`;
    if (tone === 'funny') desc = `Witty and quick — ${desc} with a twist.`;
    if (tone === 'mysterious') desc = `Quietly intriguing; ${desc} who hints at deeper stories.`;

    // cap length
    if (desc.length > length) desc = desc.substring(0, length).trim() + '...';

    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title,
      description: desc,
      category: selectedCategory
    } as GeneratedProfile;
  };

  const generateProfiles = () => {
    const count = Math.max(1, batchCount);
    const newProfiles: GeneratedProfile[] = [];
    const used = new Set<string>();

    while (newProfiles.length < count) {
      const p = generateSingleProfile();
      if (!used.has(p.description)) {
        used.add(p.description);
        newProfiles.push(p);
      }
    }

    setGeneratedProfiles(prev => [...newProfiles, ...prev]);
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

  const exportProfiles = () => {
    const text = generatedProfiles.map(p => `${p.title}\n${p.description}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profiles.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearProfiles = () => setGeneratedProfiles([]);

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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Personality Generator</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">Generate personality summaries for personas, characters, or team bios with flexible tone and length options.</p>
          </div>
        </div>
      </section>

      <section id="generator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Settings</h3>

                <div className="flex-1 lg:overflow-y-auto lg:min-h-0 pr-1">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div className="relative">
                      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-gray-900 font-medium">
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><ChevronDown className="w-5 h-5 text-gray-400" /></div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                    <div className="relative">
                      <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-gray-900 font-medium">
                        {toneOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><ChevronDown className="w-5 h-5 text-gray-400" /></div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length: {length} chars</label>
                    <input type="range" min={60} max={300} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1"><span>60</span><span>300</span></div>
                  </div>

                </div>

                <div className="space-y-3 border-t border-gray-200 pt-3 bg-white flex-shrink-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Profiles</label>
                    <input type="number" min="1" value={batchCount} onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold" placeholder="6" />
                    <p className="text-xs text-gray-500 mt-1 text-center">Generate multiple personality profiles at once</p>
                  </div>

                  <button onClick={generateProfiles} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg font-semibold"><RefreshCw className="w-5 h-5" /><span>Generate Profiles</span></button>

                  {generatedProfiles.length > 0 && (
                    <div className="pt-2 border-t border-gray-200"><div className="text-sm text-gray-600 mb-2 text-center">{generatedProfiles.length} profile{generatedProfiles.length !== 1 ? 's' : ''} generated</div></div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button onClick={exportProfiles} disabled={generatedProfiles.length === 0} className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-sm ${generatedProfiles.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}><Download className="w-3 h-3 sm:w-4 sm:h-4" /><span>Export All</span></button>
                    <button onClick={clearProfiles} disabled={generatedProfiles.length === 0} className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${generatedProfiles.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}><span>Clear All</span></button>
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated Profiles</h3>

                <div className="flex-1 flex flex-col lg:min-h-0">
                  {generatedProfiles.length === 0 ? (
                    <div className="text-center py-8 lg:py-12 flex-1 flex flex-col justify-center">
                      <User className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-base lg:text-lg text-gray-500">No profiles generated yet</p>
                      <p className="text-sm lg:text-base text-gray-400">Set your desired count and click "Generate" to get started</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:min-h-0">
                      <div className={`space-y-3 flex-1 lg:min-h-0 ${generatedProfiles.length > 9 ? 'lg:overflow-y-auto' : ''}`} style={generatedProfiles.length > 9 ? { maxHeight: 'calc(100% - 2rem)' } : {}}>
                        {generatedProfiles.map((item) => (
                          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-0">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0"><AtSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
                              <div className="min-w-0 flex-1"><p className="font-semibold text-gray-900 text-base sm:text-lg break-all">{item.title}</p><p className="text-xs sm:text-sm text-gray-500 capitalize">{item.category} — {item.description}</p></div>
                            </div>
                            <button onClick={() => copyToClipboard(`${item.title}\n\n${item.description}`, item.id)} className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base flex-shrink-0 ${copiedId === item.id ? 'bg-green-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Use</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Generate personality summaries quickly: choose a category, set tone/length, generate profiles, then export or copy.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <User className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Category</h3>
              <p className="text-gray-600 leading-relaxed">Select Creative, Professional, Casual, Tech, or Character to guide phrasing.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <Settings className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Adjust Tone & Length</h3>
              <p className="text-gray-600 leading-relaxed">Pick a tone (friendly, formal, funny, mysterious) and set length to shape outputs.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate</h3>
              <p className="text-gray-600 leading-relaxed">Create single profiles or bulk batches for prototypes, writing, or hiring materials.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export & Use</h3>
              <p className="text-gray-600 leading-relaxed">Export lists for documentation, hiring, or creative projects without leaving your browser.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Instant profiles, multiple styles, one-click copy, and export-ready outputs for teams and creators.</p>
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Create usable, export-ready personality summaries with flexible controls and private local generation.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Instant Results</h3>
              <p className="text-gray-600 leading-relaxed">Produce multiple profiles in seconds to iterate faster during design and writing.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Flexible Styles</h3>
              <p className="text-gray-600 leading-relaxed">Switch styles and tones to match personas, characters, or professional bios.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Export Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Export lists for documentation, hiring, or creative projects without leaving your browser.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
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
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600'}`}>
                        <span className="font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">{faq.question}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'}`}>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Generate profiles in seconds</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Create personality summaries for personas, characters, and teams — private, fast, and export-ready.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">Start Generating</button>
            <Link to="/" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">Explore More Tools</Link>
          </div>
        </div>
      </section>

      {/* Footer is rendered globally by App */}
    </div>
  );
};

export default PersonalityGenerator; 