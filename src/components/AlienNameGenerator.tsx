import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  RefreshCw, 
  Copy, 
  Download, 
  Settings, 
  Shield, 
  Code,
  TestTube2,
  Palette,
  ChevronDown,
  ArrowLeft,
  Menu,
  X,
  Star,
  Globe,
  Zap,
  Briefcase,
  Sparkles,
  CheckCircle,
  MessageCircle,
  Rocket
} from 'lucide-react';

interface GeneratedAlienName {
  id: string;
  name: string;
  category: string;
}

const AlienNameGenerator: React.FC = () => {
  const [generatedNames, setGeneratedNames] = useState<GeneratedAlienName[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('warrior');
  const [nameLength, setNameLength] = useState<number>(8);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [capitalizeFirst, setCapitalizeFirst] = useState<boolean>(true);
  const [batchCount, setBatchCount] = useState<number>(25);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    { id: 'warrior', name: 'Warrior', icon: Zap },
    { id: 'mystic', name: 'Mystic', icon: Sparkles },
    { id: 'explorer', name: 'Explorer', icon: Globe },
    { id: 'scientist', name: 'Scientist', icon: TestTube2 },
    { id: 'royal', name: 'Royal', icon: Star },
    { id: 'merchant', name: 'Merchant', icon: Briefcase },
    { id: 'guardian', name: 'Guardian', icon: Shield },
    { id: 'nomad', name: 'Nomad', icon: Rocket },
    { id: 'sage', name: 'Sage', icon: Code },
    { id: 'hunter', name: 'Hunter', icon: User },
    { id: 'diplomat', name: 'Diplomat', icon: MessageCircle },
    { id: 'artist', name: 'Artist', icon: Palette },
  ];

  const wordBases = {
    warrior: [
      'Zar', 'Keth', 'Vex', 'Thul', 'Drak', 'Mor', 'Grix', 'Nyx', 'Rax', 'Zeph',
      'Blade', 'Storm', 'Thunder', 'Shadow', 'Fire', 'Steel', 'Iron', 'Battle', 'War', 'Fury',
      'Axon', 'Vorth', 'Grimm', 'Torr', 'Vash', 'Kron', 'Drex', 'Vex', 'Zul', 'Thane'
    ],
    mystic: [
      'Aura', 'Mysth', 'Lumi', 'Zara', 'Veil', 'Orb', 'Flux', 'Echo', 'Void', 'Nova',
      'Crystal', 'Prism', 'Spirit', 'Dream', 'Vision', 'Mind', 'Soul', 'Light', 'Dark', 'Energy',
      'Xen', 'Lyth', 'Quin', 'Zeph', 'Nara', 'Kira', 'Vega', 'Luna', 'Sera', 'Mira'
    ],
    explorer: [
      'Trek', 'Path', 'Quest', 'Journey', 'Roam', 'Wander', 'Scout', 'Guide', 'Trail', 'Map',
      'Star', 'Comet', 'Nebula', 'Galaxy', 'Cosmos', 'Orbit', 'Planet', 'Moon', 'Void', 'Space',
      'Zyx', 'Kex', 'Voy', 'Nex', 'Rho', 'Tau', 'Phi', 'Chi', 'Psi', 'Omega'
    ],
    scientist: [
      'Data', 'Logic', 'Code', 'Gene', 'Lab', 'Test', 'Probe', 'Scan', 'Study', 'Research',
      'Quantum', 'Neural', 'Binary', 'Helix', 'Matrix', 'Vector', 'Formula', 'Theory', 'Atom', 'Cell',
      'Zeta', 'Beta', 'Alpha', 'Gamma', 'Delta', 'Sigma', 'Proto', 'Nano', 'Micro', 'Meta'
    ],
    royal: [
      'Rex', 'Crown', 'Throne', 'Noble', 'Lord', 'King', 'Queen', 'Prince', 'Duke', 'Earl',
      'Gold', 'Silver', 'Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'Crystal', 'Jewel', 'Gem',
      'Arix', 'Vex', 'Lux', 'Rex', 'Nyx', 'Zar', 'Keth', 'Vorth', 'Thul', 'Mor'
    ],
    merchant: [
      'Trade', 'Gold', 'Coin', 'Market', 'Deal', 'Profit', 'Wealth', 'Rich', 'Value', 'Price',
      'Credit', 'Bank', 'Fund', 'Asset', 'Stock', 'Bond', 'Share', 'Invest', 'Capital', 'Finance',
      'Vex', 'Zar', 'Kex', 'Nex', 'Rex', 'Tex', 'Hex', 'Pex', 'Lex', 'Dex'
    ],
    guardian: [
      'Shield', 'Guard', 'Protect', 'Watch', 'Defend', 'Safe', 'Secure', 'Strong', 'Brave', 'Bold',
      'Armor', 'Wall', 'Tower', 'Fortress', 'Bastion', 'Citadel', 'Keep', 'Hold', 'Stand', 'Vigil',
      'Thane', 'Ward', 'Keth', 'Vorth', 'Grimm', 'Torr', 'Vash', 'Kron', 'Drex', 'Zul'
    ],
    nomad: [
      'Drift', 'Roam', 'Wander', 'Travel', 'Journey', 'Path', 'Road', 'Wind', 'Sky', 'Cloud',
      'Desert', 'Dune', 'Oasis', 'Mirage', 'Sand', 'Storm', 'Gale', 'Breeze', 'Horizon', 'Dawn',
      'Zeph', 'Kyr', 'Nyx', 'Vex', 'Rho', 'Tau', 'Phi', 'Chi', 'Psi', 'Zeta'
    ],
    sage: [
      'Wise', 'Know', 'Learn', 'Teach', 'Guide', 'Elder', 'Ancient', 'Old', 'Memory', 'Lore',
      'Book', 'Scroll', 'Text', 'Word', 'Truth', 'Wisdom', 'Knowledge', 'Mind', 'Thought', 'Idea',
      'Sage', 'Mage', 'Seer', 'Oracle', 'Prophet', 'Mystic', 'Shaman', 'Druid', 'Monk', 'Scholar'
    ],
    hunter: [
      'Track', 'Hunt', 'Prey', 'Stalk', 'Chase', 'Catch', 'Trap', 'Snare', 'Arrow', 'Bow',
      'Claw', 'Fang', 'Tooth', 'Eye', 'Nose', 'Ear', 'Paw', 'Tail', 'Wing', 'Scale',
      'Rax', 'Vex', 'Kex', 'Nex', 'Zex', 'Hex', 'Pex', 'Tex', 'Rex', 'Lex'
    ],
    diplomat: [
      'Peace', 'Treaty', 'Alliance', 'Union', 'Bond', 'Pact', 'Accord', 'Harmony', 'Unity', 'Bridge',
      'Voice', 'Word', 'Speech', 'Talk', 'Speak', 'Say', 'Tell', 'Whisper', 'Shout', 'Call',
      'Vox', 'Lex', 'Rex', 'Pax', 'Lux', 'Nyx', 'Zyx', 'Kyx', 'Tyx', 'Myx'
    ],
    artist: [
      'Paint', 'Draw', 'Create', 'Make', 'Build', 'Craft', 'Form', 'Shape', 'Mold', 'Design',
      'Color', 'Hue', 'Shade', 'Tone', 'Tint', 'Brush', 'Canvas', 'Art', 'Beauty', 'Grace',
      'Lyra', 'Aria', 'Muse', 'Iris', 'Luna', 'Stella', 'Nova', 'Vera', 'Cora', 'Zara'
    ]
  };

  const features = [
    {
      icon: RefreshCw,
      title: 'Fast Batch Creation',
      description: 'Produce large lists of alien names instantly for stories, games, or worldbuilding sessions.'
    },
    {
      icon: Settings,
      title: 'Category & Style Controls',
      description: 'Pick alien types (Warrior, Mystic, Scientist, etc.) and tune length, symbols, and capitalization.'
    },
    {
      icon: Copy,
      title: 'One-Click Copy',
      description: 'Copy individual names or copy entire lists for quick pasting into your notes or game assets.'
    },
    {
      icon: Download,
      title: 'Export & Archive',
      description: 'Download generated names as plain-text files for easy import into documents, spreadsheets, or databases.'
    },
    {
      icon: Shield,
      title: 'Local & Private',
      description: 'All generation runs in your browser — we do not transmit or store your inputs or outputs.'
    },
    {
      icon: Sparkles,
      title: 'Otherworldly Variations',
      description: 'Phonetic and pattern-based generation yields names that feel alien yet memorable.'
    }
  ];

  // useCases removed: not used in the component

  const faqs = [
    {
      question: 'Are the generated names unique?',
      answer: 'Names are algorithmically combined from word bases and patterns to produce varied results. Check lists for duplicates when generating very large batches.'
    },
    {
      question: 'Can I tune name appearance?',
      answer: 'Yes — enable alien symbols, adjust length, and pick a category to influence phonetics and style.'
    },
    {
      question: 'Is any data uploaded?',
      answer: 'No — the generator runs locally in your browser and does not transmit or store your inputs or outputs.'
    },
    {
      question: 'How many names can I create at once?',
      answer: 'There is no practical limit — generate a few for characters or thousands for large-scale worldbuilding.'
    }
  ];

  const generateSingleAlienName = (): string => {
    const bases = wordBases[selectedCategory as keyof typeof wordBases];
    const base1 = bases[Math.floor(Math.random() * bases.length)];
    const base2 = bases[Math.floor(Math.random() * bases.length)];
    
    let name = base1;
    
    // Add second word if length allows
    if (nameLength > base1.length) {
      name = base1 + base2;
    }
    
    // Truncate if too long
    if (name.length > nameLength) {
      name = name.substring(0, nameLength);
    }
    
    // Add numbers if enabled (less common for alien names)
    if (includeNumbers && name.length < nameLength) {
      const numbersToAdd = Math.min(2, nameLength - name.length);
      for (let i = 0; i < numbersToAdd; i++) {
        name += Math.floor(Math.random() * 10);
      }
    }
    
    // Add alien symbols if enabled
    if (includeSymbols && name.length < nameLength) {
      const alienSymbols = ["'", '-', 'x', 'z', 'th', 'kh', 'zh'];
      const symbolsToAdd = Math.min(2, nameLength - name.length);
      for (let i = 0; i < symbolsToAdd; i++) {
        const symbol = alienSymbols[Math.floor(Math.random() * alienSymbols.length)];
        name += symbol;
      }
    }
    
    // Apply capitalization
    if (capitalizeFirst) {
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    } else {
      name = name.toLowerCase();
    }
    
    return name;
  };

  const generateAlienNames = () => {
    const count = Math.max(1, batchCount);
    const newNames: GeneratedAlienName[] = [];
    const usedNames = new Set();
    
    // Generate unique alien names
    while (newNames.length < count) {
      const name = generateSingleAlienName();
      
      // Ensure uniqueness within the batch
      if (!usedNames.has(name.toLowerCase())) {
        usedNames.add(name.toLowerCase());
        newNames.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name,
          category: selectedCategory
        });
      }
    }
    
    setGeneratedNames(prev => [...newNames, ...prev]);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (_err) {
      // Fallback for older browsers
      if (copyRef.current) {
        copyRef.current.value = text;
        copyRef.current.select();
        document.execCommand('copy');
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    }
  };

  const exportAlienNames = () => {
    const text = generatedNames.map(n => n.name).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alien-names.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAlienNames = () => {
    setGeneratedNames([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hidden textarea for clipboard fallback */}
      <textarea ref={copyRef} className="absolute opacity-0 pointer-events-none" tabIndex={-1} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Fake Detail
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
              <Link to="/generators" className="text-gray-600 hover:text-purple-600 transition-colors">Generators</Link>
              <Link to="/generators" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Get Started</Link>
            </nav>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Back to Tools Link */}
            <div className="mb-6">
              <Link 
                to="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </div>
            
            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Alien Name Generator
            </h1>
            
            {/* Description */}
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Generate otherworldly, believable alien names for sci‑fi stories, games, and worldbuilding. Choose a category, tweak options, and export lists locally.
            </p>
          </div>
        </div>
      </section>

      {/* Alien Name Generator Interface */}
      <section id="generator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Settings Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Alien Name Settings</h3>
                
                {/* Scrollable Content */}
                <div className="flex-1 lg:overflow-y-auto lg:min-h-0 pr-1">
                  {/* Category Selection */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alien Type</label>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-gray-900 font-medium"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Length Setting */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name Length: {nameLength}
                    </label>
                    <input
                      type="range"
                      min="4"
                      max="18"
                      value={nameLength}
                      onChange={(e) => setNameLength(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>4</span>
                      <span>18</span>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Include Numbers</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Include Alien Symbols</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={capitalizeFirst}
                        onChange={(e) => setCapitalizeFirst(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Capitalize First Letter</span>
                    </label>
                  </div>
                </div>

                {/* Generate Section - Always at bottom */}
                <div className="space-y-3 border-t border-gray-200 pt-3 bg-white flex-shrink-0">
                  {/* Number of Names Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Alien Names
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={batchCount}
                      onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold"
                      placeholder="25"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">Generate unlimited alien names at once</p>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateAlienNames}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg font-semibold"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Generate Names</span>
                  </button>
                  
                  {generatedNames.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2 text-center">
                        {generatedNames.length} alien name{generatedNames.length !== 1 ? 's' : ''} generated
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button
                      onClick={exportAlienNames}
                      disabled={generatedNames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-sm ${
                        generatedNames.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Export All</span>
                    </button>
                    <button
                      onClick={clearAlienNames}
                      disabled={generatedNames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                        generatedNames.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Alien Names */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated Alien Names</h3>
                
                <div className="flex-1 flex flex-col lg:min-h-0">
                  {generatedNames.length === 0 ? (
                    <div className="text-center py-8 lg:py-12 flex-1 flex flex-col justify-center">
                      <Rocket className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-base lg:text-lg text-gray-500">No alien names generated yet</p>
                      <p className="text-sm lg:text-base text-gray-400">Set your desired count and click "Generate" to create otherworldly names</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:min-h-0">
                      <div className={`space-y-3 flex-1 lg:min-h-0 ${generatedNames.length > 9 ? 'lg:overflow-y-auto' : ''}`} style={generatedNames.length > 9 ? { maxHeight: 'calc(100% - 2rem)' } : {}}>
                        {generatedNames.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-base sm:text-lg break-all">{item.name}</p>
                                <p className="text-xs sm:text-sm text-gray-500 capitalize">{item.category} alien</p>
                              </div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.name, item.id)}
                              className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base flex-shrink-0 ${
                                copiedId === item.id
                                  ? 'bg-green-600 text-white'
                                  : 'bg-purple-600 text-white hover:bg-purple-700'
                              }`}
                            >
                              {copiedId === item.id ? (
                                <>
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">Copied!</span>
                                  <span className="sm:hidden">✓</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">Copy</span>
                                  <span className="sm:hidden">Copy</span>
                                </>
                              )}
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Choose a type, tune styling options, generate alien name lists, then copy or export for your worldbuilding.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <Zap className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pick Type</h3>
              <p className="text-gray-600 leading-relaxed">Select Warrior, Mystic, Scientist or others to bias phonetic and cultural patterns.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <Settings className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tune Options</h3>
              <p className="text-gray-600 leading-relaxed">Control length, enable alien symbols, and set capitalization to craft consistent cultures.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate</h3>
              <p className="text-gray-600 leading-relaxed">Produce single names or thousands for species, NPCs, factions, and lore.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export</h3>
              <p className="text-gray-600 leading-relaxed">Download name lists for documentation, game engines, or sharing with collaborators.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Phonetic patterns, cultural presets, and bulk export to speed worldbuilding workflows.</p>
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Fast, private generation with culturally consistent patterns for believable alien naming.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Otherworldly Variations</h3>
              <p className="text-gray-600 leading-relaxed">Pattern-based generation yields names that feel alien yet memorable.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fully Customizable</h3>
              <p className="text-gray-600 leading-relaxed">Adjust category, length, symbols, and phonetic patterns to match your universe.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Export lists for writers, game designers, and collaborators.</p>
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
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">
                        {faq.question}
                      </h3>
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
      <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Populate your universe quickly</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Generate rich alien name sets for characters, species, and cultures — private, fast, and exportable.</p>
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

export default AlienNameGenerator; 