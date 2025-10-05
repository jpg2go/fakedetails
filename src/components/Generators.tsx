import React from 'react';
// Footer is rendered globally in App.tsx
import { Link } from 'react-router-dom';
import { Database, MessageCircle, ArrowLeft, ArrowRight, Star, Mail, Code, User, Phone, Building2, MapPin, Music2, Sparkles, Heart, Headphones, Gamepad2, BookOpen, Brain } from 'lucide-react';

const Generators: React.FC = () => {

  const baseDescriptions: Record<string, string> = {
    whatsapp: 'Create lifelike WhatsApp conversations with iOS and Android themes for realistic UI mockups. Secure.',
    username: 'Generate memorable usernames across genres for games, apps, and professional profiles.',
    'phone-number': 'Produce valid international phone numbers in multiple formats for testing and seeding data.',
    password: 'Generate strong customizable passwords with length, symbols, and bulk export for teams.',
    'fake-address': 'Generate global addresses with correct postal formats, coordinates, and bulk export support.',
    'fake-company': 'Create believable company names and styles tailored to industries for realistic mock data.',
    aesthetic: 'Produce stylized aesthetic names for profiles and brands across curated creative styles and symbols.',
    'fake-name': 'Generate realistic personal names with varied styles, optional middle names, and batch exports.',
    'random-name': 'Create unlimited random names across categories for games, apps, and anonymized datasets.',
    nickname: 'Generate cute, clever, and themed nicknames for social profiles, gaming, and entertainment.',
    'band-name': 'Generate professional band names per genre with creative variants for artists and projects.',
    'dj-name': 'Create unique DJ and stage names tailored to electronic music genres for promotion.',
    'alien-name': 'Generate alien names with authentic phonetics for sci-fi, games, and imaginative worlds.',
    'god-name': 'Craft divine names from mythologies for worldbuilding, games, and fantasy storytelling.',
    'orc-name': 'Generate orc-style names for RPGs and fantasy settings with tribal, lore-friendly options.',
    'horse-name': 'Generate distinctive horse names for breeding, racing, stories, and themed naming sets.',
    'planet-name': 'Create exotic and scientific-sounding planet names for sci-fi, games, and worldbuilding.',
    'warrior-cat-name': 'Create series-accurate Warrior Cat names across ranks for fan works and roleplay.',
    'insult-name': 'Generate witty, playful insults and roasts suitable for comedy and entertainment uses.',
    'wow-name': 'Generate lore-friendly World of Warcraft names across races and factions for characters.',
    'bible-verse': 'Discover curated Bible verses organized by theme, ready for study, sharing, and design use.',
    personality: 'Generate vivid personality descriptions and archetypes for characters, personas, and prototypes.',
    'dwarf-name': 'Create authentic dwarf names with themed categories and lore-appropriate naming options.',
    'fake-mail': 'Generate realistic email addresses with multiple patterns, bulk export, and one-click copy.',
    imei: 'Produce valid IMEI numbers with correct Luhn check digits for device testing and fixtures.'
  };

  function formatDescription(tool: any, _idx: number) {
      const base = (baseDescriptions[tool.key] || tool.description || '').replace(/\s+/g, ' ').trim();
      let text = base;
      // If longer than 100, trim to last full word under 100 and end with a period
      if (text.length > 100) {
        let cut = text.slice(0, 100);
        const lastSpace = cut.lastIndexOf(' ');
        if (lastSpace > 0) cut = cut.slice(0, lastSpace);
        cut = cut.replace(/[.,;:\s-]+$/g, '');
        if (!cut.endsWith('.')) cut = cut + '.';
        // pad invisibly to 100
        while (cut.length < 100) cut = cut + '\u00A0';
        return cut;
      }
      // If shorter, ensure it ends with a period and pad invisibly to 100
      if (!text.endsWith('.')) text = text + '.';
      while (text.length < 100) text = text + '\u00A0';
      return text;
    }

    const tools = [
      {
        key: 'whatsapp',
        name: 'WhatsApp Chat Generator',
        description: 'Create realistic WhatsApp conversations with iOS/Android themes for testing and mockups.',
        to: '/whatsapp-chat-generator',
        icon: MessageCircle,
        rating: 5,
        comingSoon: false,
        features: ['Realistic chat bubbles', 'iPhone & Android styles', 'Inline edits & export'],
        gradient: 'from-emerald-500 to-green-600'
      },
      {
        key: 'username',
        name: 'Username Generator',
        description: 'Generate unique, memorable usernames for gaming, social media, and professional accounts.',
        to: '/username-generator',
        icon: User,
        rating: 5,
        comingSoon: false,
        features: ['Multiple categories', 'Unlimited generation', 'One-click copy & export'],
        gradient: 'from-indigo-500 to-purple-600'
      },
      {
        key: 'phone-number',
        name: 'Phone Number Generator',
        description: 'Generate realistic phone numbers across countries for testing and mockups.',
        to: '/phone-number-generator',
        icon: Phone,
        rating: 5,
        comingSoon: false,
        features: ['Multiple country formats', 'Bulk export', 'One-click copy'],
        gradient: 'from-emerald-600 to-teal-500'
      },
      {
        key: 'password',
        name: 'Password Generator',
        description: 'Generate secure, random passwords with customizable length and character sets.',
        to: '/password-generator',
        icon: Brain,
        rating: 5,
        comingSoon: false,
        features: ['Custom length', 'Uppercase/lowercase/numbers/symbols', 'Bulk export'],
        gradient: 'from-purple-600 to-blue-600'
      },
      {
        key: 'fake-company',
        name: 'Company Name Generator',
        description: 'Generate realistic company names across industries for testing and mockups.',
        to: '/company-name-generator',
        icon: Building2,
        rating: 5,
        comingSoon: false,
        features: ['Industry styles', 'Bulk export', 'One-click copy'],
        gradient: 'from-indigo-500 to-purple-600'
      },
      {
        key: 'fake-address',
        name: 'Address Generator',
        description: 'Generate realistic addresses across countries for testing, mocks, and demos.',
        to: '/address-generator',
        icon: MapPin,
        rating: 5,
        comingSoon: false,
        features: ['Multiple country formats', 'Bulk export', 'One-click copy'],
        gradient: 'from-indigo-500 to-purple-600'
      },
      {
        key: 'aesthetic',
        name: 'Aesthetic Name Generator',
        description: 'Generate stylized aesthetic names for profiles, art, and brands.',
        to: '/aesthetic-name-generator',
        icon: Sparkles,
        rating: 5,
        comingSoon: false,
        features: ['Multiple styles', 'Optional symbols', 'Bulk export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'random-name',
        name: 'Random Name Generator',
        description: 'Generate unlimited unique random names for gaming, social media, and professional accounts.',
        to: '/random-name-generator',
        icon: User,
        rating: 5,
        comingSoon: false,
        features: ['Multiple categories', 'Unlimited generation', 'One-click copy & export'],
        gradient: 'from-indigo-500 to-purple-600'
      },
      {
        key: 'nickname',
        name: 'Nickname Generator',
        description: 'Generate unique nicknames for relationships, gaming, social media, and creative projects.',
        to: '/nickname-generator',
        icon: Heart,
        rating: 5,
        comingSoon: false,
        features: ['12 categories', 'Cute & creative names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'band-name',
        name: 'Band Name Generator',
        description: 'Generate unique band names for any music genre with genre-specific categories and professional options.',
        to: '/band-name-generator',
        icon: Music2,
        rating: 5,
        comingSoon: false,
        features: ['12 music genres', 'Professional names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'dj-name',
        name: 'DJ Name Generator',
        description: 'Generate unique DJ names for any electronic music genre with genre-specific categories.',
        to: '/dj-name-generator',
        icon: Headphones,
        rating: 5,
        comingSoon: false,
        features: ['12 electronic genres', 'Professional stage names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'alien-name',
        name: 'Alien Name Generator',
        description: 'Generate unique alien names for sci-fi stories, games, and creative projects with authentic otherworldly sounds.',
        to: '/alien-name-generator',
        icon: Sparkles,
        rating: 5,
        comingSoon: false,
        features: ['12 alien categories', 'Otherworldly phonetics', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'god-name',
        name: 'God Name Generator',
        description: 'Generate divine names from 12 mythological traditions for fantasy worlds, games, and creative projects.',
        to: '/god-name-generator',
        icon: Sparkles,
        rating: 5,
        comingSoon: false,
        features: ['12 mythological categories', 'Authentic divine names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'orc-name',
        name: 'Orc Name Generator',
        description: 'Generate authentic orc names from 12 categories for RPGs, fantasy stories, and game development.',
        to: '/orc-name-generator',
        icon: Sparkles,
        rating: 5,
        comingSoon: false,
        features: ['12 orc categories', 'Authentic tribal names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'horse-name',
        name: 'Horse Name Generator',
        description: 'Generate unique horse names for breeding, racing, stories, and more with themed categories.',
        to: '/horse-name-generator',
        icon: Sparkles,
        rating: 5,
        comingSoon: false,
        features: ['6 themed categories', 'Majestic & racing names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'planet-name',
        name: 'Planet Name Generator',
        description: 'Generate unique planet names for sci-fi stories, games, and world-building projects.',
        to: '/planet-name-generator',
        icon: Sparkles,
        rating: 5,
        comingSoon: false,
        features: ['6 sci-fi categories', 'Exotic & scientific names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'warrior-cat-name',
        name: 'Warrior Cat Name Generator',
        description: 'Generate authentic Warrior Cat names for all ranks following series conventions.',
        to: '/warrior-cat-name-generator',
        icon: Sparkles,
        rating: 5,
        comingSoon: false,
        features: ['6 rank categories', 'Series-accurate names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'insult-name',
        name: 'Insult Name Generator',
        description: 'Generate witty, playful insults for comedy, entertainment, and creative projects.',
        to: '/insult-name-generator',
        icon: Sparkles,
        rating: 5,
        comingSoon: false,
        features: ['6 style categories', 'Creative & witty insults', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'wow-name',
        name: 'WoW Name Generator',
        description: 'Generate authentic World of Warcraft character names for all races.',
        to: '/wow-name-generator',
        icon: Gamepad2,
        rating: 5,
        comingSoon: false,
        features: ['8 WoW races', 'Lore-friendly names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'bible-verse',
        name: 'Bible Verse Generator',
        description: 'Discover meaningful Bible verses organized by theme for study and devotion.',
        to: '/bible-verse-generator',
        icon: BookOpen,
        rating: 5,
        comingSoon: false,
        features: ['6 themed categories', 'Curated verses', 'Study & sharing tools'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'personality',
        name: 'Personality Generator',
        description: 'Generate unique personality descriptions for characters and creative projects.',
        to: '/personality-generator',
        icon: Brain,
        rating: 5,
        comingSoon: false,
        features: ['6 personality types', 'Realistic descriptions', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'dwarf-name',
        name: 'Dwarf Name Generator',
        description: 'Generate authentic dwarf names for fantasy stories, games, and world-building.',
        to: '/dwarf-name-generator',
        icon: Sparkles,
        rating: 5,
        comingSoon: false,
        features: ['6 themed categories', 'Fantasy-authentic names', 'Unlimited generation & export'],
        gradient: 'from-fuchsia-500 to-purple-600'
      },
      {
        key: 'fake-mail',
        name: 'Fake Mail Generator',
        description: 'Generate realistic-looking email addresses for testing, mockups, and demo data.',
        to: '/mail-generator',
        icon: Mail,
        rating: 5,
        comingSoon: false,
        features: ['Bulk Generation', 'Multiple Styles', 'One-Click Copy', 'Export', 'Local Only', 'Realistic Patterns'],
        gradient: 'from-rose-500 to-pink-500'
      },
      {
        key: 'imei',
        name: 'IMEI Number Generator',
        description: 'Generate valid IMEI numbers with correct Luhn check digits for testing and fixtures.',
        to: '/imei-number-generator',
        icon: Code,
        rating: 5,
        comingSoon: false,
        features: ['Valid Luhn check digit', 'Bulk export', 'Local generation'],
        gradient: 'from-indigo-500 to-purple-600'
      },

      // Coming-soon demo slugs removed to keep the generators page limited to live tools
    ];

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Generators
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
                <Link to="/generators" className="text-gray-900 font-medium">Generators</Link>
                <Link to="/generators" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Get Started</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Title */}
        <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-4">
              <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Generators</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">Explore our growing library of fake chat UIs, social posts, profiles, and data tools. Create realistic screenshots, demos, and test data — no real accounts required.</p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, i) => (
                <div key={tool.key} className="group overflow-hidden rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition h-full flex flex-col">
                  <div className={`p-6 bg-gradient-to-r ${tool.gradient} text-white`}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/40">
                        {React.createElement(tool.icon, { className: 'h-7 w-7' })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold leading-snug">{tool.name}</h3>
                        <p className="mt-1.5 text-white/90 text-sm md:text-base leading-relaxed">{formatDescription(tool, i)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white flex-1 flex flex-col">
                    <div className="mb-3 text-gray-900 font-semibold">Key features:</div>
                    <ul className="space-y-2 mb-5">
                      {tool.features?.slice(0,3).map((f: string, idx: number) => (
                        <li key={idx} className="flex items-start text-gray-700 text-sm">
                          <span className="mt-1 mr-2 h-2 w-2 rounded-full bg-purple-500" />{f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between pt-1">
                      <div className="flex items-center text-yellow-400 gap-1.5">
                        {Array.from({ length: tool.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      {tool.comingSoon ? (
                        <button disabled aria-disabled="true" className="inline-flex items-center rounded-full px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow opacity-60 cursor-not-allowed">Coming Soon <ArrowRight className="ml-2 h-4 w-4" /></button>
                      ) : (
                        <Link to={tool.to} className="inline-flex items-center rounded-full px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow hover:opacity-90 transition">
                          Use Tool <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer is rendered globally by App */}
      </div>
    );
  };

export default Generators; 