import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Headphones, 
  RefreshCw, 
  Copy, 
  Download, 
  Settings, 
  Shield, 
  TestTube2,
  Palette,
  ChevronDown,
  ArrowLeft,
  Menu,
  X,
  Star,
  Gamepad2,
  Sparkles,
  CheckCircle,
  Music2,
  Volume2,
  Disc3,
  Briefcase
} from 'lucide-react';

interface GeneratedDjName {
  id: string;
  djName: string;
  category: string;
}

const DjNameGenerator: React.FC = () => {
  const [generatedDjNames, setGeneratedDjNames] = useState<GeneratedDjName[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('electronic');
  const [djNameLength, setDjNameLength] = useState<number>(10);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [capitalizeFirst, setCapitalizeFirst] = useState<boolean>(true);
  const [batchCount, setBatchCount] = useState<number>(25);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    { id: 'electronic', name: 'Electronic & EDM', icon: Sparkles },
    { id: 'house', name: 'House & Techno', icon: Volume2 },
    { id: 'hip-hop', name: 'Hip-Hop & Rap', icon: Headphones },
    { id: 'trance', name: 'Trance & Progressive', icon: Disc3 },
    { id: 'dubstep', name: 'Dubstep & Bass', icon: Volume2 },
    { id: 'ambient', name: 'Ambient & Chill', icon: Music2 },
    { id: 'disco', name: 'Disco & Funk', icon: Star },
    { id: 'drum-bass', name: 'Drum & Bass', icon: Gamepad2 },
    { id: 'minimal', name: 'Minimal & Deep', icon: Palette },
    { id: 'hardcore', name: 'Hardcore & Hardstyle', icon: Volume2 },
    { id: 'retro', name: 'Retro & Synthwave', icon: TestTube2 },
    { id: 'experimental', name: 'Experimental & Avant-garde', icon: Sparkles },
  ];

  const wordBases = {
    electronic: [
      'Digital', 'Cyber', 'Neon', 'Laser', 'Pixel', 'Matrix', 'Vector', 'Binary', 'Circuit', 'Voltage',
      'Synth', 'Beat', 'Bass', 'Drop', 'Loop', 'Sample', 'Filter', 'Delay', 'Reverb', 'Echo',
      'Electric', 'Static', 'Pulse', 'Wave', 'Signal', 'Frequency', 'Amplitude', 'Modular', 'Analog', 'Digital',
      'Future', 'Space', 'Cosmic', 'Galaxy', 'Star', 'Planet', 'Orbit', 'Solar', 'Lunar', 'Nova'
    ],
    house: [
      'Deep', 'Tech', 'Progressive', 'Tribal', 'Vocal', 'Acid', 'Funky', 'Soulful', 'Underground', 'Classic',
      'Club', 'Dance', 'Floor', 'Groove', 'Rhythm', 'Beat', 'Kick', 'Snare', 'Hi-Hat', 'Clap',
      'Chicago', 'Detroit', 'Berlin', 'Ibiza', 'Miami', 'London', 'Amsterdam', 'Paris', 'New York', 'LA',
      'Night', 'Dark', 'Light', 'Bright', 'Warm', 'Cool', 'Hot', 'Cold', 'Smooth', 'Rough'
    ],
    'hip-hop': [
      'Fresh', 'Dope', 'Sick', 'Tight', 'Hot', 'Fire', 'Flame', 'Burn', 'Blaze', 'Heat',
      'Street', 'Block', 'Hood', 'City', 'Urban', 'Metro', 'Downtown', 'Uptown', 'East', 'West',
      'Flow', 'Rhyme', 'Beat', 'Bass', 'Drop', 'Break', 'Scratch', 'Mix', 'Cut', 'Spin',
      'Real', 'True', 'Raw', 'Pure', 'Hard', 'Tough', 'Strong', 'Bold', 'Brave', 'Fierce'
    ],
    trance: [
      'Uplifting', 'Euphoric', 'Progressive', 'Psychedelic', 'Vocal', 'Instrumental', 'Melodic', 'Emotional', 'Spiritual', 'Transcendent',
      'Journey', 'Voyage', 'Flight', 'Ascension', 'Elevation', 'Rise', 'Lift', 'Soar', 'Float', 'Drift',
      'Dream', 'Vision', 'Fantasy', 'Imagination', 'Meditation', 'Reflection', 'Contemplation', 'Serenity', 'Peace', 'Harmony',
      'Energy', 'Power', 'Force', 'Strength', 'Intensity', 'Passion', 'Emotion', 'Feeling', 'Sensation', 'Experience'
    ],
    dubstep: [
      'Wobble', 'Drop', 'Bass', 'Sub', 'Growl', 'Screech', 'Warp', 'Distort', 'Crush', 'Compress',
      'Dirty', 'Filthy', 'Nasty', 'Heavy', 'Hard', 'Brutal', 'Aggressive', 'Intense', 'Wild', 'Savage',
      'Skrillex', 'Nero', 'Flux', 'Modestep', 'Zomboy', 'Virtual', 'Riot', 'Excision', 'Datsik', 'Rusko',
      'Wub', 'Bro', 'Step', 'Core', 'Style', 'Sound', 'Noise', 'Chaos', 'Mayhem', 'Destruction'
    ],
    ambient: [
      'Calm', 'Peaceful', 'Serene', 'Tranquil', 'Quiet', 'Still', 'Gentle', 'Soft', 'Smooth', 'Flowing',
      'Nature', 'Forest', 'Ocean', 'River', 'Mountain', 'Sky', 'Cloud', 'Wind', 'Rain', 'Snow',
      'Meditation', 'Zen', 'Yoga', 'Spa', 'Healing', 'Therapy', 'Relaxation', 'Rest', 'Sleep', 'Dream',
      'Ethereal', 'Celestial', 'Divine', 'Sacred', 'Spiritual', 'Mystical', 'Magical', 'Enchanted', 'Wonder', 'Beauty'
    ],
    disco: [
      'Funk', 'Soul', 'Groove', 'Rhythm', 'Dance', 'Party', 'Celebration', 'Joy', 'Happiness', 'Fun',
      'Studio', 'Saturday', 'Night', 'Fever', 'Boogie', 'Hustle', 'Shuffle', 'Slide', 'Spin', 'Turn',
      'Gold', 'Silver', 'Platinum', 'Diamond', 'Crystal', 'Sparkle', 'Shine', 'Glitter', 'Glamour', 'Style',
      'Retro', 'Vintage', 'Classic', 'Old', 'School', 'Traditional', 'Timeless', 'Eternal', 'Forever', 'Always'
    ],
    'drum-bass': [
      'Jungle', 'Liquid', 'Neurofunk', 'Jump', 'Up', 'Ragga', 'Hardcore', 'Breakbeat', 'Amen', 'Break',
      'Fast', 'Speed', 'Quick', 'Rapid', 'Swift', 'Rush', 'Dash', 'Sprint', 'Race', 'Run',
      'London', 'UK', 'Bristol', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Cardiff', 'Dublin', 'Belfast',
      'Dark', 'Deep', 'Heavy', 'Hard', 'Intense', 'Powerful', 'Strong', 'Tough', 'Rough', 'Raw'
    ],
    minimal: [
      'Less', 'More', 'Simple', 'Complex', 'Clean', 'Pure', 'Clear', 'Sharp', 'Precise', 'Exact',
      'Subtle', 'Gentle', 'Soft', 'Quiet', 'Whisper', 'Murmur', 'Silence', 'Space', 'Gap', 'Pause',
      'Berlin', 'Cologne', 'Hamburg', 'Munich', 'Frankfurt', 'Stuttgart', 'Dresden', 'Leipzig', 'Bremen', 'Hanover',
      'Tech', 'Micro', 'Nano', 'Tiny', 'Small', 'Little', 'Mini', 'Compact', 'Concise', 'Brief'
    ],
    hardcore: [
      'Hard', 'Core', 'Extreme', 'Intense', 'Brutal', 'Aggressive', 'Wild', 'Savage', 'Fierce', 'Violent',
      'Fast', 'Speed', 'Quick', 'Rapid', 'Swift', 'Rush', 'Dash', 'Sprint', 'Race', 'Run',
      'Rotterdam', 'Amsterdam', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Breda', 'Nijmegen', 'Enschede', 'Haarlem',
      'Kick', 'Bass', 'Distortion', 'Overdrive', 'Crush', 'Compress', 'Limit', 'Clip', 'Saturate', 'Drive'
    ],
    retro: [
      'Neon', 'Synthwave', 'Outrun', 'Vaporwave', 'Retrowave', 'Darksynth', 'Cyberpunk', 'Future', 'Past', 'Nostalgia',
      'Miami', 'Vice', 'City', 'Night', 'Drive', 'Cruise', 'Highway', 'Road', 'Street', 'Avenue',
      'Laser', 'Grid', 'Pixel', 'Digital', 'Analog', 'Vintage', 'Classic', 'Old', 'School', 'Retro',
      'Purple', 'Pink', 'Blue', 'Cyan', 'Magenta', 'Neon', 'Glow', 'Shine', 'Bright', 'Light'
    ],
    experimental: [
      'Abstract', 'Concrete', 'Surreal', 'Bizarre', 'Strange', 'Weird', 'Odd', 'Unusual', 'Unique', 'Rare',
      'Noise', 'Static', 'Feedback', 'Distortion', 'Glitch', 'Error', 'Bug', 'Virus', 'Crash', 'Freeze',
      'Quantum', 'Atomic', 'Molecular', 'Cellular', 'Neural', 'Digital', 'Analog', 'Hybrid', 'Synthetic', 'Organic',
      'Lab', 'Test', 'Trial', 'Study', 'Research', 'Analysis', 'Theory', 'Hypothesis', 'Discovery', 'Innovation'
    ]
  };

  const features = [
    {
      icon: RefreshCw,
      title: 'Fast Batch Generation',
      description: 'Create long lists of DJ/artist name ideas instantly for gigs, releases, and branding sessions.'
    },
    {
      icon: Settings,
      title: 'Genre-Aware Output',
      description: 'Pick a sub-genre (House, Trance, Dubstep, etc.) to bias word choices and naming patterns.'
    },
    {
      icon: Copy,
      title: 'One-Click Copy',
      description: 'Copy any single DJ name quickly or copy multiple names to share with collaborators.'
    },
    {
      icon: Download,
      title: 'Export & Integrate',
      description: 'Download plain-text lists for promos, playlists, or to import into your production workflow.'
    },
    {
      icon: Shield,
      title: 'Local & Private',
      description: 'All generation happens in your browser — nothing is uploaded or stored remotely.'
    },
    {
      icon: Sparkles,
      title: 'Stage‑Ready Variations',
      description: 'Mix of "DJ X", single-word, and combined patterns tailored for electronic artists.'
    }
  ];


  const faqs = [
    {
      question: 'Are the generated DJ names unique?',
      answer: 'Names are randomized from templates and word banks; collisions are unlikely within a single batch. Always verify availability before public use.'
    },
    {
      question: 'Can I control the DJ name format?',
      answer: 'Yes — choose patterns like "DJ X", single-word, combined words, or add numbers and symbols to match your stage persona.'
    },
    {
      question: 'Is any data uploaded?',
      answer: 'No. Generation and export happen entirely in your browser; we do not transmit or save your inputs or results.'
    },
    {
      question: 'How many names can I generate?',
      answer: 'There is no practical limit — generate a handful for inspiration or thousands for playlists, tests, and team selection.'
    }
  ];

  const generateSingleDjName = (): string => {
    const bases = wordBases[selectedCategory as keyof typeof wordBases];
    const base1 = bases[Math.floor(Math.random() * bases.length)];
    const base2 = bases[Math.floor(Math.random() * bases.length)];
    
    // Common DJ name patterns
    const patterns = [
      `DJ ${base1}`, // DJ + word
      base1, // Single word
      `${base1} ${base2}`, // Two words
      `${base1}${base2}`, // Combined words
      `${base1}X`, // Word + X
      `MC ${base1}`, // MC + word
    ];
    
    let djName = patterns[Math.floor(Math.random() * patterns.length)];
    
    // Truncate if too long
    if (djName.length > djNameLength) {
      djName = djName.substring(0, djNameLength).trim();
    }
    
    // Add numbers if enabled
    if (includeNumbers && djName.length < djNameLength) {
      const numbersToAdd = Math.min(3, djNameLength - djName.length);
      for (let i = 0; i < numbersToAdd; i++) {
        djName += Math.floor(Math.random() * 10);
      }
    }
    
    // Add symbols if enabled
    if (includeSymbols && djName.length < djNameLength) {
      const symbols = ['_', '-', '.', 'X', '+'];
      const symbolsToAdd = Math.min(2, djNameLength - djName.length);
      for (let i = 0; i < symbolsToAdd; i++) {
        djName += symbols[Math.floor(Math.random() * symbols.length)];
      }
    }
    
    // Apply capitalization
    if (capitalizeFirst) {
      djName = djName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    } else {
      djName = djName.toLowerCase();
    }
    
    return djName;
  };

  const generateDjNames = () => {
    const count = Math.max(1, batchCount);
    const newDjNames: GeneratedDjName[] = [];
    const usedDjNames = new Set();
    
    while (newDjNames.length < count) {
      const djName = generateSingleDjName();
      
      if (!usedDjNames.has(djName.toLowerCase())) {
        usedDjNames.add(djName.toLowerCase());
        newDjNames.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          djName,
          category: selectedCategory
        });
      }
    }
    
    setGeneratedDjNames(prev => [...newDjNames, ...prev]);
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

  const exportDjNames = () => {
    const text = generatedDjNames.map(u => u.djName).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dj-names.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearDjNames = () => {
    setGeneratedDjNames([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <textarea ref={copyRef} className="absolute opacity-0 pointer-events-none" tabIndex={-1} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-white" />
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
            <div className="mb-6">
              <Link 
                to="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              DJ Name Generator
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Generate stage-ready DJ and artist names tailored to electronic sub-genres — pick a style, tweak formatting, and export lists locally for promos, profiles, or projects.
            </p>
          </div>
        </div>
      </section>

      {/* Generator Interface */}
      <section id="generator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Settings Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">DJ Name Settings</h3>
                
                <div className="flex-1 lg:overflow-y-auto lg:min-h-0 pr-1">
                  {/* Category Selection */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Music Genre</label>
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
                      Max Length: {djNameLength}
                    </label>
                    <input
                      type="range"
                      min="6"
                      max="20"
                      value={djNameLength}
                      onChange={(e) => setDjNameLength(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>6</span>
                      <span>20</span>
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
                      <span className="text-sm text-gray-700">Include Symbols</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={capitalizeFirst}
                        onChange={(e) => setCapitalizeFirst(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Proper Case</span>
                    </label>
                  </div>
                </div>

                {/* Generate Section */}
                <div className="space-y-3 border-t border-gray-200 pt-3 bg-white flex-shrink-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of DJ Names
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={batchCount}
                      onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold"
                      placeholder="25"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">Generate unlimited DJ names at once</p>
                  </div>

                  <button
                    onClick={generateDjNames}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg font-semibold"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Generate DJ Names</span>
                  </button>
                  
                  {generatedDjNames.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2 text-center">
                        {generatedDjNames.length} DJ name{generatedDjNames.length !== 1 ? 's' : ''} generated
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button
                      onClick={exportDjNames}
                      disabled={generatedDjNames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-sm ${
                        generatedDjNames.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Export All</span>
                    </button>
                    <button
                      onClick={clearDjNames}
                      disabled={generatedDjNames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                        generatedDjNames.length === 0
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

            {/* Generated DJ Names */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated DJ Names</h3>
                
                <div className="flex-1 flex flex-col lg:min-h-0">
                  {generatedDjNames.length === 0 ? (
                    <div className="text-center py-8 lg:py-12 flex-1 flex flex-col justify-center">
                      <Headphones className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-base lg:text-lg text-gray-500">No DJ names generated yet</p>
                      <p className="text-sm lg:text-base text-gray-400">Set your desired count and click "Generate" to get started</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:min-h-0">
                      <div className={`space-y-3 flex-1 lg:min-h-0 ${generatedDjNames.length > 9 ? 'lg:overflow-y-auto' : ''}`} style={generatedDjNames.length > 9 ? { maxHeight: 'calc(100% - 2rem)' } : {}}>
                        {generatedDjNames.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-base sm:text-lg break-all">{item.djName}</p>
                                <p className="text-xs sm:text-sm text-gray-500 capitalize">{categories.find(c => c.id === item.category)?.name || item.category} style</p>
                              </div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.djName, item.id)}
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Choose a genre, tune formatting, generate name lists, and export stage-ready aliases for promos and gigs.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <Headphones className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pick Genre</h3>
              <p className="text-gray-600 leading-relaxed">Select the DJ sub-genre to bias naming patterns and tone.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <Settings className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tune Options</h3>
              <p className="text-gray-600 leading-relaxed">Control max length, numbers, symbols, and casing to match stage persona.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate</h3>
              <p className="text-gray-600 leading-relaxed">Create single names or large batches for selection, promos, and credits.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export</h3>
              <p className="text-gray-600 leading-relaxed">Download lists or copy favorites for team review and release planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Fast batch generation, genre-aware outputs, and private local exports for DJs and producers.</p>
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Create stage-ready DJ and artist names quickly with genre-authentic patterns and exportable lists.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stage‑Ready Variations</h3>
              <p className="text-gray-600 leading-relaxed">Patterns like 'DJ X', single-word, and combined names suit live and release contexts.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fully Customizable</h3>
              <p className="text-gray-600 leading-relaxed">Tweak genre, length, numbers, and symbols to align with your artist identity.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Export lists for promos, team editing, and collaborative selection.</p>
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
          <h2 className="text-4xl font-bold text-white mb-6">Find your stage name quickly</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Generate distinctive DJ and artist names instantly — tailored to genre and ready to export for shows and releases.</p>
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

export default DjNameGenerator; 