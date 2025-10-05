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
  ChevronDown,
  ArrowLeft,
  Menu,
  X,
  Star,
  Globe,
  Gamepad2,
  Briefcase,
  Sparkles,
  AtSign,
  CheckCircle,
  Building2,
  MessageCircle,
  Music2,
  Smile
} from 'lucide-react';

interface GeneratedUsername {
  id: string;
  username: string;
  category: string;
}

const UsernameGenerator: React.FC = () => {
  const [generatedUsernames, setGeneratedUsernames] = useState<GeneratedUsername[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('gaming');
  const [usernameLength, setUsernameLength] = useState<number>(8);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [capitalizeFirst, setCapitalizeFirst] = useState<boolean>(true);
  const [batchCount, setBatchCount] = useState<number>(25);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
    { id: 'professional', name: 'Professional', icon: Briefcase },
    { id: 'creative', name: 'Creative', icon: Sparkles },
    { id: 'tech', name: 'Tech', icon: Code },
    { id: 'casual', name: 'Casual', icon: User },
    { id: 'business', name: 'Business', icon: Building2 },
    { id: 'social', name: 'Social Media', icon: MessageCircle },
    { id: 'fitness', name: 'Fitness & Sports', icon: Star },
    { id: 'music', name: 'Music & Arts', icon: Music2 },
    { id: 'travel', name: 'Travel & Adventure', icon: Globe },
    { id: 'food', name: 'Food & Cooking', icon: Smile },
    { id: 'education', name: 'Education', icon: TestTube2 },
  ];

  const wordBases = {
    gaming: [
      'Shadow', 'Dark', 'Fire', 'Ice', 'Storm', 'Lightning', 'Dragon', 'Wolf', 'Blade', 'Knight',
      'Warrior', 'Mage', 'Hunter', 'Sniper', 'Phantom', 'Ghost', 'Ninja', 'Samurai', 'Legend', 'Master',
      'Pro', 'Elite', 'Alpha', 'Beta', 'Omega', 'Nova', 'Cyber', 'Neon', 'Pixel', 'Vector'
    ],
    professional: [
      'Executive', 'Manager', 'Director', 'Lead', 'Senior', 'Chief', 'Principal', 'Expert', 'Specialist', 'Consultant',
      'Analyst', 'Advisor', 'Associate', 'Partner', 'founder', 'Creator', 'Builder', 'Maker', 'Innovator', 'Pioneer',
      'Strategy', 'Vision', 'Growth', 'Success', 'Impact', 'Value', 'Quality', 'Excellence', 'Premium', 'Elite'
    ],
    creative: [
      'Artist', 'Designer', 'Creator', 'Maker', 'Dreamer', 'Visionary', 'Craftsman', 'Artisan', 'Studio', 'Canvas',
      'Palette', 'Brush', 'Ink', 'Paint', 'Color', 'Hue', 'Shade', 'Tone', 'Texture', 'Pattern',
      'Flow', 'Grace', 'Beauty', 'Harmony', 'Rhythm', 'Melody', 'Symphony', 'Poetry', 'Story', 'Tale'
    ],
    tech: [
      'Code', 'Byte', 'Bit', 'Data', 'Logic', 'Algorithm', 'Function', 'Variable', 'Method', 'Class',
      'Server', 'Cloud', 'Network', 'Protocol', 'Interface', 'Framework', 'Library', 'Module', 'Component', 'System',
      'Digital', 'Virtual', 'Binary', 'Hex', 'Crypto', 'Quantum', 'Neural', 'AI', 'ML', 'API'
    ],
    casual: [
      'Cool', 'Fun', 'Happy', 'Lucky', 'Sunny', 'Bright', 'Sweet', 'Kind', 'Nice', 'Good',
      'Blue', 'Red', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Silver', 'Gold', 'Crystal',
      'Star', 'Moon', 'Sun', 'Ocean', 'River', 'Mountain', 'Forest', 'Garden', 'Flower', 'Tree'
    ],
    business: [
      'Corporate', 'Enterprise', 'Company', 'Firm', 'Agency', 'Group', 'Solutions', 'Services', 'Consulting', 'Partners',
      'Global', 'International', 'Strategic', 'Professional', 'Commercial', 'Industry', 'Market', 'Trade', 'Finance', 'Capital',
      'Venture', 'Investment', 'Holdings', 'Corporation', 'Limited', 'Associates', 'Advisors', 'Executives', 'Board', 'Summit'
    ],
    social: [
      'Connect', 'Share', 'Follow', 'Like', 'Post', 'Story', 'Feed', 'Stream', 'Live', 'Viral',
      'Trend', 'Hashtag', 'Mention', 'Tag', 'Comment', 'Reply', 'Message', 'Chat', 'Direct', 'Social',
      'Community', 'Network', 'Circle', 'Friend', 'Follower', 'Influencer', 'Creator', 'Content', 'Media', 'Digital'
    ],
    fitness: [
      'Fit', 'Strong', 'Power', 'Energy', 'Muscle', 'Cardio', 'Strength', 'Endurance', 'Athletic', 'Active',
      'Gym', 'Workout', 'Training', 'Exercise', 'Health', 'Wellness', 'Nutrition', 'Protein', 'Performance', 'Champion',
      'Runner', 'Lifter', 'Athlete', 'Coach', 'Trainer', 'Fitness', 'Sport', 'Competition', 'Victory', 'Winner'
    ],
    music: [
      'Beat', 'Rhythm', 'Melody', 'Harmony', 'Song', 'Track', 'Album', 'Studio', 'Record', 'Sound',
      'Audio', 'Music', 'Artist', 'Band', 'Singer', 'Musician', 'Composer', 'Producer', 'DJ', 'Mix',
      'Note', 'Chord', 'Scale', 'Tempo', 'Bass', 'Treble', 'Echo', 'Reverb', 'Acoustic', 'Electric'
    ],
    travel: [
      'Journey', 'Adventure', 'Explorer', 'Wanderer', 'Nomad', 'Traveler', 'Tourist', 'Voyage', 'Trip', 'Destination',
      'Globe', 'World', 'Map', 'Compass', 'Route', 'Path', 'Trail', 'Road', 'Flight', 'Airport',
      'Hotel', 'Backpack', 'Passport', 'Visa', 'Culture', 'Experience', 'Discovery', 'Mountain', 'Ocean', 'City'
    ],
    food: [
      'Chef', 'Cook', 'Kitchen', 'Recipe', 'Flavor', 'Taste', 'Spice', 'Herb', 'Fresh', 'Organic',
      'Gourmet', 'Delicious', 'Savory', 'Sweet', 'Bitter', 'Sour', 'Umami', 'Crispy', 'Juicy', 'Tender',
      'Bake', 'Grill', 'Roast', 'Steam', 'Fry', 'Boil', 'Sauce', 'Dressing', 'Seasoning', 'Ingredient'
    ],
    education: [
      'Learn', 'Study', 'Knowledge', 'Wisdom', 'Scholar', 'Student', 'Teacher', 'Professor', 'Academic', 'Research',
      'Book', 'Library', 'School', 'University', 'College', 'Course', 'Lesson', 'Class', 'Subject', 'Topic',
      'Science', 'Math', 'History', 'Literature', 'Language', 'Art', 'Philosophy', 'Theory', 'Practice', 'Skill'
    ]
  };

  const features = [
    {
      icon: RefreshCw,
      title: 'Unlimited Generation',
      description: 'Generate any quantity of unique usernames — from single picks to bulk lists for teams or migrations.'
    },
    {
      icon: Settings,
      title: 'Multiple Categories & Options',
      description: 'Choose categories and tweak length, numbers, symbols, and capitalization so names fit the platform.'
    },
    {
      icon: Copy,
      title: 'One-Click Copy',
      description: 'Copy any generated username to your clipboard with one click for fast reuse.'
    },
    {
      icon: Download,
      title: 'Export & Save',
      description: 'Download results as plain text or copy batches to share with teammates or tools.'
    },
    {
      icon: Shield,
      title: 'Privacy-First',
      description: 'All generation runs locally in your browser — nothing is uploaded or stored externally.'
    },
    {
      icon: Sparkles,
      title: 'Unique Results',
      description: 'Smart combinations produce varied, modern-sounding usernames that avoid obvious duplicates.'
    }
  ];


  const faqs = [
    {
      question: 'Are the generated usernames unique?',
      answer: 'Combinations are generated to be varied, but availability is not guaranteed. Always verify on the target platform before committing.'
    },
    {
      question: 'Can I customize the username format?',
      answer: 'Yes. Use length, numbers, symbols, and capitalization options to create names that fit platform rules and personal taste.'
    },
    {
      question: 'Is my data stored anywhere?',
      answer: 'No. Everything runs locally in your browser — we don’t collect or store your inputs or generated names.'
    },
    {
      question: 'What categories are available?',
      answer: 'Options include Gaming, Professional, Creative, Tech, Casual, and more — each uses curated word lists to influence tone.'
    },
    {
      question: 'How many usernames can I generate at once?',
      answer: 'Any number — from single suggestions to large batches for teams or testing. Use the count field to control batch size.'
    }
  ];

  const generateSingleUsername = (): string => {
    const bases = wordBases[selectedCategory as keyof typeof wordBases];
    const base1 = bases[Math.floor(Math.random() * bases.length)];
    const base2 = bases[Math.floor(Math.random() * bases.length)];
    
    let username = base1;
    
    // Add second word if length allows
    if (usernameLength > base1.length) {
      username = base1 + base2;
    }
    
    // Truncate if too long
    if (username.length > usernameLength) {
      username = username.substring(0, usernameLength);
    }
    
    // Add numbers if enabled
    if (includeNumbers && username.length < usernameLength) {
      const numbersToAdd = Math.min(3, usernameLength - username.length);
      for (let i = 0; i < numbersToAdd; i++) {
        username += Math.floor(Math.random() * 10);
      }
    }
    
    // Add symbols if enabled
    if (includeSymbols && username.length < usernameLength) {
      const symbols = ['_', '-', '.'];
      const symbolsToAdd = Math.min(2, usernameLength - username.length);
      for (let i = 0; i < symbolsToAdd; i++) {
        username += symbols[Math.floor(Math.random() * symbols.length)];
      }
    }
    
    // Apply capitalization
    if (capitalizeFirst) {
      username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    } else {
      username = username.toLowerCase();
    }
    
    return username;
  };

  const generateUsernames = () => {
    const count = Math.max(1, batchCount); // Minimum of 1, no upper limit
    const newUsernames: GeneratedUsername[] = [];
    const usedUsernames = new Set();
    
    // Generate unique usernames
    while (newUsernames.length < count) {
      const username = generateSingleUsername();
      
      // Ensure uniqueness within the batch
      if (!usedUsernames.has(username.toLowerCase())) {
        usedUsernames.add(username.toLowerCase());
        newUsernames.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          username,
          category: selectedCategory
        });
      }
    }
    
    setGeneratedUsernames(prev => [...newUsernames, ...prev]);
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

  const exportUsernames = () => {
    const text = generatedUsernames.map(u => u.username).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usernames.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearUsernames = () => {
    setGeneratedUsernames([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hidden textarea for clipboard fallback */}
      <textarea ref={copyRef} className="absolute opacity-0 pointer-events-none" tabIndex={-1} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Fake Detail
              </span>
            </Link>
            
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
              Unique Username Generator
            </h1>
            
            {/* Description */}
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Quickly produce distinctive handles for games, social platforms, and work profiles — single picks or bulk lists with fine-grained controls.
            </p>
          </div>
        </div>
      </section>

      {/* Username Generator Interface */}
      <section id="generator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Settings Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Settings</h3>
                
                {/* Scrollable Content */}
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
                      Length: {usernameLength}
                    </label>
                    <input
                      type="range"
                      min="6"
                      max="20"
                      value={usernameLength}
                      onChange={(e) => setUsernameLength(Number(e.target.value))}
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
                      <span className="text-sm text-gray-700">Capitalize First Letter</span>
                    </label>
                  </div>
                </div>

                {/* Generate Section - Always at bottom */}
                <div className="space-y-3 border-t border-gray-200 pt-3 bg-white flex-shrink-0">
                  {/* Number of Usernames Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Usernames
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={batchCount}
                      onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold"
                      placeholder="25"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">Generate unlimited usernames at once</p>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateUsernames}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg font-semibold"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Generate</span>
                  </button>
                  
                  {generatedUsernames.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2 text-center">
                        {generatedUsernames.length} result{generatedUsernames.length !== 1 ? 's' : ''} generated
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button
                      onClick={exportUsernames}
                      disabled={generatedUsernames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-sm ${
                        generatedUsernames.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Export All</span>
                    </button>
                    <button
                      onClick={clearUsernames}
                      disabled={generatedUsernames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                        generatedUsernames.length === 0
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

            {/* Generated Usernames */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated Usernames</h3>
                
                <div className="flex-1 flex flex-col lg:min-h-0">
                  {generatedUsernames.length === 0 ? (
                    <div className="text-center py-8 lg:py-12 flex-1 flex flex-col justify-center">
                      <User className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-base lg:text-lg text-gray-500">No usernames generated yet</p>
                      <p className="text-sm lg:text-base text-gray-400">Set your desired count and click "Generate" to get started</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:min-h-0">
                      <div className={`space-y-3 flex-1 lg:min-h-0 ${generatedUsernames.length > 9 ? 'lg:overflow-y-auto' : ''}`} style={generatedUsernames.length > 9 ? { maxHeight: 'calc(100% - 2rem)' } : {}}>
                        {generatedUsernames.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <AtSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-base sm:text-lg break-all">{item.username}</p>
                                <p className="text-xs sm:text-sm text-gray-500 capitalize">{item.category} • handle</p>
                              </div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.username, item.id)}
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Follow these steps to generate usernames tailored to your use case.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <Gamepad2 className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose a Category</h3>
              <p className="text-gray-600 leading-relaxed">Pick from Gaming, Professional, Creative, Tech, or Casual to bias word choices and tone.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <Settings className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Adjust Options</h3>
              <p className="text-gray-600 leading-relaxed">Set length, toggle numbers/symbols, and enable capitalization to meet platform rules.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate & Review</h3>
              <p className="text-gray-600 leading-relaxed">Generate a batch, review options, and star or copy favorites for immediate use.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Copy className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export or Use</h3>
              <p className="text-gray-600 leading-relaxed">Copy names or download bulk lists immediately for testing and sign-ups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Fine-grained controls and presets to help you craft perfect usernames quickly.</p>
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Fast, private, and optimized for realistic naming needs across platforms.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tailored Results</h3>
              <p className="text-gray-600 leading-relaxed">Algorithms tuned to generate names that fit the chosen tone and platform policies.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Privacy First</h3>
              <p className="text-gray-600 leading-relaxed">Everything runs locally; we never send your inputs to external servers.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Instant Export</h3>
              <p className="text-gray-600 leading-relaxed">Copy names or download bulk lists immediately for testing and sign-ups.</p>
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
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked 
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                Questions
              </span>
            </h2>
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
          <h2 className="text-4xl font-bold text-white mb-6">
            Find great usernames fast
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Generate single names or bulk lists instantly — all locally, private, and ready to export.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Generating Now
            </button>
            <Link 
              to="/"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Explore More Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Footer is rendered globally by App */}
    </div>
  );
};

export default UsernameGenerator; 