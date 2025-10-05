import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  RefreshCw, 
  Copy, 
  Download, 
  Settings, 
  Shield,Palette,ChevronDown,
  ArrowLeft,
  Menu,
  X,
  Star,
  Globe,
  Gamepad2,
  Sparkles,
  CheckCircle,Music2,
  Heart,
  Coffee,
  Briefcase
} from 'lucide-react';

interface GeneratedNickname {
  id: string;
  nickname: string;
  category: string;
}

const NicknameGenerator: React.FC = () => {
  const [generatedNicknames, setGeneratedNicknames] = useState<GeneratedNickname[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('cute');
  const [nicknameLength, setNicknameLength] = useState<number>(8);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [capitalizeFirst, setCapitalizeFirst] = useState<boolean>(true);
  const [batchCount, setBatchCount] = useState<number>(25);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    { id: 'cute', name: 'Cute & Sweet', icon: Heart },
    { id: 'funny', name: 'Funny & Playful', icon: Sparkles },
    { id: 'cool', name: 'Cool & Edgy', icon: Sparkles },
    { id: 'romantic', name: 'Romantic', icon: Heart },
    { id: 'friendly', name: 'Friendly', icon: Coffee },
    { id: 'unique', name: 'Unique & Creative', icon: Palette },
    { id: 'classic', name: 'Classic & Timeless', icon: Star },
    { id: 'modern', name: 'Modern & Trendy', icon: Gamepad2 },
    { id: 'nature', name: 'Nature Inspired', icon: Globe },
    { id: 'food', name: 'Food & Treats', icon: Coffee },
    { id: 'animal', name: 'Animal Inspired', icon: Sparkles },
    { id: 'music', name: 'Music & Arts', icon: Music2 },
  ];

  const wordBases = {
    cute: [
      'Angel', 'Baby', 'Sweetie', 'Honey', 'Sugar', 'Cupcake', 'Buttercup', 'Sunshine', 'Starlight', 'Precious',
      'Darling', 'Lovebug', 'Pumpkin', 'Snuggles', 'Cuddles', 'Dimples', 'Giggles', 'Bubbles', 'Sparkle', 'Twinkle',
      'Cherry', 'Peach', 'Berry', 'Candy', 'Cookie', 'Muffin', 'Bunny', 'Kitten', 'Puppy', 'Dove'
    ],
    funny: [
      'Silly', 'Goofy', 'Wacky', 'Nutty', 'Crazy', 'Zany', 'Quirky', 'Funny', 'Giggly', 'Cheeky',
      'Pickle', 'Noodle', 'Banana', 'Monkey', 'Goose', 'Duck', 'Penguin', 'Squirrel', 'Hamster', 'Chipmunk',
      'Tickles', 'Wiggles', 'Bouncy', 'Zippy', 'Peppy', 'Bubbly', 'Fizzy', 'Dizzy', 'Jazzy', 'Snappy'
    ],
    cool: [
      'Shadow', 'Storm', 'Blade', 'Frost', 'Phoenix', 'Raven', 'Wolf', 'Tiger', 'Dragon', 'Viper',
      'Steel', 'Iron', 'Stone', 'Rock', 'Thunder', 'Lightning', 'Fire', 'Ice', 'Night', 'Dark',
      'Rebel', 'Maverick', 'Ace', 'Chief', 'Boss', 'King', 'Queen', 'Prince', 'Princess', 'Noble'
    ],
    romantic: [
      'Love', 'Heart', 'Rose', 'Valentine', 'Cupid', 'Romeo', 'Juliet', 'Passion', 'Romance', 'Desire',
      'Kiss', 'Hug', 'Embrace', 'Caress', 'Tender', 'Sweet', 'Gentle', 'Soft', 'Warm', 'Cozy',
      'Dream', 'Wish', 'Hope', 'Faith', 'Trust', 'Promise', 'Forever', 'Always', 'Eternal', 'Divine'
    ],
    friendly: [
      'Buddy', 'Pal', 'Friend', 'Mate', 'Champ', 'Sport', 'Kiddo', 'Partner', 'Companion', 'Amigo',
      'Sunny', 'Happy', 'Cheerful', 'Bright', 'Merry', 'Jolly', 'Lively', 'Peppy', 'Chipper', 'Upbeat',
      'Smile', 'Joy', 'Bliss', 'Peace', 'Harmony', 'Unity', 'Bond', 'Connect', 'Share', 'Care'
    ],
    unique: [
      'Mystic', 'Cosmic', 'Stellar', 'Lunar', 'Solar', 'Galaxy', 'Nebula', 'Comet', 'Meteor', 'Aurora',
      'Prism', 'Crystal', 'Diamond', 'Emerald', 'Ruby', 'Sapphire', 'Pearl', 'Gold', 'Silver', 'Platinum',
      'Echo', 'Whisper', 'Dream', 'Vision', 'Spirit', 'Soul', 'Essence', 'Magic', 'Wonder', 'Mystery'
    ],
    classic: [
      'Grace', 'Faith', 'Hope', 'Joy', 'Peace', 'Love', 'Rose', 'Lily', 'Violet', 'Daisy',
      'Belle', 'Claire', 'Marie', 'Anne', 'Jane', 'Kate', 'Emma', 'Ella', 'Eva', 'Ava',
      'James', 'John', 'William', 'Robert', 'Michael', 'David', 'Richard', 'Thomas', 'Charles', 'Daniel'
    ],
    modern: [
      'Neo', 'Pixel', 'Digital', 'Cyber', 'Tech', '', 'Data', 'Cloud', 'Stream', 'Link',
      'Vibe', 'Flow', 'Beat', 'Pulse', 'Wave', 'Sync', 'Flash', 'Dash', 'Rush', 'Zoom',
      'Flex', 'Max', 'Pro', 'Ultra', 'Super', 'Mega', 'Hyper', 'Turbo', 'Nitro', 'Boost'
    ],
    nature: [
      'River', 'Ocean', 'Mountain', 'Forest', 'Meadow', 'Valley', 'Canyon', 'Creek', 'Lake', 'Bay',
      'Pine', 'Oak', 'Maple', 'Birch', 'Willow', 'Cedar', 'Fern', 'Moss', 'Ivy', 'Sage',
      'Storm', 'Rain', 'Snow', 'Wind', 'Sun', 'Moon', 'Star', 'Cloud', 'Sky', 'Earth'
    ],
    food: [
      'Cookie', 'Cupcake', 'Muffin', 'Donut', 'Cake', 'Pie', 'Tart', 'Candy', 'Chocolate', 'Vanilla',
      'Strawberry', 'Cherry', 'Peach', 'Apple', 'Orange', 'Lemon', 'Lime', 'Berry', 'Grape', 'Melon',
      'Honey', 'Sugar', 'Cream', 'Butter', 'Caramel', 'Fudge', 'Truffle', 'Bonbon', 'Taffy', 'Gummy'
    ],
    animal: [
      'Tiger', 'Lion', 'Bear', 'Wolf', 'Fox', 'Rabbit', 'Deer', 'Eagle', 'Hawk', 'Owl',
      'Cat', 'Dog', 'Bird', 'Fish', 'Turtle', 'Frog', 'Butterfly', 'Bee', 'Ladybug', 'Dragonfly',
      'Panda', 'Koala', 'Penguin', 'Dolphin', 'Whale', 'Shark', 'Octopus', 'Seahorse', 'Starfish', 'Jellyfish'
    ],
    music: [
      'Melody', 'Harmony', 'Rhythm', 'Beat', 'Tune', 'Song', 'Note', 'Chord', 'Scale', 'Key',
      'Jazz', 'Blues', 'Rock', 'Pop', 'Soul', 'Funk', 'Disco', 'Techno', 'House', 'Trance',
      'Piano', 'Guitar', 'Violin', 'Drum', 'Bass', 'Flute', 'Trumpet', 'Saxophone', 'Cello', 'Harp'
    ]
  };

  const features = [
    {
      icon: RefreshCw,
      title: 'Fast Bulk Creation',
      description: 'Produce large batches of nicknames instantly for gifts, games, or mock data.'
    },
    {
      icon: Settings,
      title: 'Flexible Controls',
      description: 'Choose category, length, numbers, symbols, and capitalization to match the tone you want.'
    },
    {
      icon: Copy,
      title: 'Quick Copy',
      description: 'Copy single nicknames or copy selections for quick pasting into chats, profiles, or notes.'
    },
    {
      icon: Download,
      title: 'Export & Integrate',
      description: 'Download plain-text lists for spreadsheets, fixtures, or to share with friends and collaborators.'
    },
    {
      icon: Shield,
      title: 'Private & Local',
      description: 'Generation happens entirely in your browser — nothing is uploaded or retained by the site.'
    },
    {
      icon: Sparkles,
      title: 'Playful Variations',
      description: 'Mixes of styles produce cute, funny, edgy, or classic nickname options for any context.'
    }
  ];


  const faqs = [
    {
      question: 'Are the generated nicknames unique?',
      answer: 'Nicknames are randomly combined from word lists and are unlikely to repeat within a single batch. Always pick the ones that resonate and check availability where needed.'
    },
    {
      question: 'Can I control nickname format?',
      answer: 'Yes — adjust length, enable numbers or symbols, and toggle capitalization to create slugs, display names, or fun handles.'
    },
    {
      question: 'Is any data stored or sent to a server?',
      answer: 'No — all generation and export happen locally in your browser; we do not send or retain your generated nicknames.'
    },
    {
      question: 'How many nicknames can I generate?',
      answer: 'There is no practical limit — generate a few for quick inspiration or thousands of options for testing.'
    }
  ];

  const generateSingleNickname = (): string => {
    const bases = wordBases[selectedCategory as keyof typeof wordBases];
    const base1 = bases[Math.floor(Math.random() * bases.length)];
    const base2 = bases[Math.floor(Math.random() * bases.length)];
    
    let nickname = base1;
    
    // Add second word if length allows
    if (nicknameLength > base1.length) {
      nickname = base1 + base2;
    }
    
    // Truncate if too long
    if (nickname.length > nicknameLength) {
      nickname = nickname.substring(0, nicknameLength);
    }
    
    // Add numbers if enabled
    if (includeNumbers && nickname.length < nicknameLength) {
      const numbersToAdd = Math.min(3, nicknameLength - nickname.length);
      for (let i = 0; i < numbersToAdd; i++) {
        nickname += Math.floor(Math.random() * 10);
      }
    }
    
    // Add symbols if enabled
    if (includeSymbols && nickname.length < nicknameLength) {
      const symbols = ['_', '-', '.'];
      const symbolsToAdd = Math.min(2, nicknameLength - nickname.length);
      for (let i = 0; i < symbolsToAdd; i++) {
        nickname += symbols[Math.floor(Math.random() * symbols.length)];
      }
    }
    
    // Apply capitalization
    if (capitalizeFirst) {
      nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();
    } else {
      nickname = nickname.toLowerCase();
    }
    
    return nickname;
  };

  const generateNicknames = () => {
    const count = Math.max(1, batchCount);
    const newNicknames: GeneratedNickname[] = [];
    const usedNicknames = new Set();
    
    while (newNicknames.length < count) {
      const nickname = generateSingleNickname();
      
      if (!usedNicknames.has(nickname.toLowerCase())) {
        usedNicknames.add(nickname.toLowerCase());
        newNicknames.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          nickname,
          category: selectedCategory
        });
      }
    }
    
    setGeneratedNicknames(prev => [...newNicknames, ...prev]);
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

  const exportNicknames = () => {
    const text = generatedNicknames.map(u => u.nickname).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nicknames.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearNicknames = () => {
    setGeneratedNicknames([]);
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
                <Heart className="w-6 h-6 text-white" />
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
              Nickname Generator
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Generate unlimited unique nicknames for relationships, gaming, social media, and creative projects. Create thousands instantly with flexible category and formatting options.
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Nickname Settings</h3>
                
                <div className="flex-1 lg:overflow-y-auto lg:min-h-0 pr-1">
                  {/* Category Selection */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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
                      Nickname Length: {nicknameLength}
                    </label>
                    <input
                      type="range"
                      min="4"
                      max="15"
                      value={nicknameLength}
                      onChange={(e) => setNicknameLength(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>4</span>
                      <span>15</span>
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
                      <span className="text-sm text-gray-700">Capitalize First Letter</span>
                    </label>
                  </div>
                </div>

                {/* Generate Section */}
                <div className="space-y-3 border-t border-gray-200 pt-3 bg-white flex-shrink-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Nicknames
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={batchCount}
                      onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold"
                      placeholder="25"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">Generate unlimited nicknames at once</p>
                  </div>

                  <button
                    onClick={generateNicknames}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg font-semibold"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Generate Nicknames</span>
                  </button>
                  
                  {generatedNicknames.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2 text-center">
                        {generatedNicknames.length} nickname{generatedNicknames.length !== 1 ? 's' : ''} generated
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button
                      onClick={exportNicknames}
                      disabled={generatedNicknames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-sm ${
                        generatedNicknames.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Export All</span>
                    </button>
                    <button
                      onClick={clearNicknames}
                      disabled={generatedNicknames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                        generatedNicknames.length === 0
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

            {/* Generated Nicknames */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated Nicknames</h3>
                
                <div className="flex-1 flex flex-col lg:min-h-0">
                  {generatedNicknames.length === 0 ? (
                    <div className="text-center py-8 lg:py-12 flex-1 flex flex-col justify-center">
                      <Heart className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-base lg:text-lg text-gray-500">No nicknames generated yet</p>
                      <p className="text-sm lg:text-base text-gray-400">Set your desired count and click "Generate" to get started</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:min-h-0">
                      <div className={`space-y-3 flex-1 lg:min-h-0 ${generatedNicknames.length > 9 ? 'lg:overflow-y-auto' : ''}`} style={generatedNicknames.length > 9 ? { maxHeight: 'calc(100% - 2rem)' } : {}}>
                        {generatedNicknames.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-base sm:text-lg break-all">{item.nickname}</p>
                                <p className="text-xs sm:text-sm text-gray-500 capitalize">{categories.find(c => c.id === item.category)?.name || item.category} style</p>
                              </div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.nickname, item.id)}
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Select a category, adjust options, generate batches, then copy or export nicknames for sharing or testing.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <Heart className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pick Category</h3>
              <p className="text-gray-600 leading-relaxed">Choose Cute, Funny, Cool, or other categories to bias outputs.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <Settings className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tune Options</h3>
              <p className="text-gray-600 leading-relaxed">Control length, symbols, numbers, and capitalization to match the tone you want.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate</h3>
              <p className="text-gray-600 leading-relaxed">Produce single or bulk nicknames quickly for gifts, games, or testing.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export</h3>
              <p className="text-gray-600 leading-relaxed">Download lists or copy favorites to share with friends or use in projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Fast batch creation, style presets, and local exports to speed nickname workflows.</p>
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Private, quick, and playful nickname generation for any context.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Playful Variations</h3>
              <p className="text-gray-600 leading-relaxed">Mix styles to produce cute, funny, edgy, or classic nicknames quickly.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fully Customizable</h3>
              <p className="text-gray-600 leading-relaxed">Adjust length, symbols, and batch sizes to fit gifting, profiles, or testing.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Export lists for events, testing, or collaborative projects.</p>
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
          <h2 className="text-4xl font-bold text-white mb-6">Generate nicknames quickly</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Create playful and memorable nicknames for gifting, profiles, and testing — private and exportable.</p>
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

export default NicknameGenerator; 