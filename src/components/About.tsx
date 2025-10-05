import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Menu, 
  X, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Target, 
  Heart, 
  Lightbulb, 
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

const About: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const values = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'We believe data privacy is fundamental. Every piece of data we generate is synthetic and never touches real personal information.',
      color: 'bg-green-500'
    },
    {
      icon: Zap,
      title: 'Developer Experience',
      description: 'Built by developers, for developers. We obsess over making data generation fast, intuitive, and powerful.',
      color: 'bg-blue-500'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Quality tools should be accessible to everyone. Our free tier ensures every developer can build amazing things.',
      color: 'bg-purple-500'
    },
    {
      icon: Heart,
      title: 'Open Source Spirit',
      description: 'We contribute back to the community that made us possible. Transparency and collaboration drive innovation.',
      color: 'bg-red-500'
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'Purpose-Built',
      description: 'Every feature is designed with real developer workflows in mind. No bloat, just solutions.'
    },
    {
      icon: Lightbulb,
      title: 'Continuous Innovation',
      description: 'We constantly evolve based on community feedback and emerging development patterns.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Our roadmap is shaped by the needs of thousands of developers worldwide.'
    }
  ];

  const stats = [
    {
      number: '50K+',
      label: 'Developers Trust Us',
      icon: Users
    },
    {
      number: '10M+',
      label: 'Records Generated',
      icon: TrendingUp
    },
    {
      number: '99.9%',
      label: 'Uptime',
      icon: Award
    },
    {
      number: '<100ms',
      label: 'Average Response',
      icon: Clock
    }
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
                Fake Detail
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-900 font-medium">About</Link>
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
              <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-900 font-medium">About</Link>
              <Link to="/generators" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Generators</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              We're Building the Future of
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                Development Data
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              At Fake Detail, we believe every developer deserves access to high-quality, privacy-safe test data. 
              We're on a mission to eliminate the friction between great ideas and great implementations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/generators"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Try Our Tools
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <a 
                href="#our-story"
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
              >
                Learn Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Fake Detail was born out of frustration. As developers, we spent countless hours manually creating 
                  test data, scrubbing production databases, or settling for unrealistic placeholder content that 
                  made demos look unprofessional.
                </p>
                <p>
                  We knew there had to be a better way. In 2023, we set out to build the most comprehensive, 
                  privacy-safe, and developer-friendly fake data generator the world had ever seen.
                </p>
                <p>
                  Today, Fake Detail powers the development workflows of thousands of teams worldwide, from 
                  bootstrapped startups to Fortune 500 companies. But we're just getting started.
                </p>
              </div>
              <div className="mt-8">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Founded by developers, for developers</span>
                </div>
                <div className="flex items-center space-x-4 mt-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Privacy-first approach from day one</span>
                </div>
                <div className="flex items-center space-x-4 mt-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Community-driven product development</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                    <div className="flex-1 h-4 bg-gray-100 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-3 bg-purple-100 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm text-gray-500 mb-2">Sample Generated Data:</div>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm space-y-1">
                    <div><span className="text-purple-600">"name":</span> "Alexandra Johnson"</div>
                    <div><span className="text-purple-600">"email":</span> "alex.johnson@email.com"</div>
                    <div><span className="text-purple-600">"company":</span> "TechFlow Solutions"</div>
                    <div><span className="text-purple-600">"role":</span> "Senior Developer"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're driven by a simple belief: great tools should empower creativity, not create barriers. 
              Here's what guides everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {values.map((value, index) => (
              <div key={index} className="group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
                  <div className={`w-16 h-16 ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We solve the universal developer problem of needing realistic test data without compromising privacy or spending hours on manual data creation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a passionate team of developers, designers, and data enthusiasts working remotely from around the world.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <Users className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                We're Hiring!
              </h3>
              <p className="text-xl text-purple-100 mb-8">
                Love building developer tools? Passionate about data and privacy? 
                We're looking for talented individuals to join our remote-first team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  View Open Positions
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                  Learn About Our Culture
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer is rendered globally by App */}
    </div>
  );
};

export default About; 