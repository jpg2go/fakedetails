import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User,MapPin,Shield, Zap, Code, TestTube2, Palette, Database, Check, Menu, X, Star, ArrowRight,Globe,RefreshCw as Refresh, ChevronDown } from 'lucide-react';

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const dataTypes = {
    personal: {
      icon: User,
      title: 'Personal Data',
      items: ['Full Names', 'Usernames', 'Email Addresses', 'Phone Numbers', 'Date of Birth', 'Gender', 'Nationality', 'Profile Pictures']
    },
    address: {
      icon: MapPin,
      title: 'Address & Location',
      items: ['Street Addresses', 'Cities & States', 'Postal Codes', 'Countries', 'Coordinates', 'Time Zones', 'County/Province']
    },
    identifiers: {
      icon: Shield,
      title: 'Device & Identifiers',
      items: ['IMEI Numbers', 'Device IDs', 'Serial Numbers', 'MAC Addresses (format)']
    },
    business: {
      icon: Database,
      title: 'Business & Company',
      items: ['Company Names', 'Job Titles', 'Department Names', 'Employee IDs', 'Business Emails', 'Office Numbers']
    },
    social: {
      icon: Zap,
      title: 'Social & Chats',
      items: ['Chat UIs (WhatsApp, Telegram, etc.)', 'Social Posts (Facebook, Instagram, Twitter)', 'Profiles & Avatars', 'Video Call Mockups']
    }
  };

  const features = [
    {
      icon: Zap,
      title: '50+ Generators',
      description: 'A growing library of generators — chat UIs, social posts, profiles, names, addresses, passwords, IMEIs and more.'
    },
    {
      icon: Palette,
      title: 'High‑Fidelity Previews',
      description: 'Pixel‑perfect previews for chats, posts, profiles and screenshots so your mockups look production-ready.'
    },
    {
      icon: Globe,
      title: 'Export & Formats',
      description: 'Export generated data as JSON, CSV, XML, or SQL, or copy to clipboard with a single click.'
    },
    {
      icon: Refresh,
      title: 'Bulk & Batch Generation',
      description: 'Generate thousands of records at once with configurable fields, country formats, and distributions.'
    },
    {
      icon: Shield,
      title: 'Privacy‑First Local Generation',
      description: 'All generation runs locally in the browser — nothing is sent or stored remotely.'
    },
    {
      icon: Code,
      title: 'API & SDK Integration',
      description: 'Automate generation via REST and use SDK snippets for TypeScript/Node integration.'
    }
  ];

  const useCases = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Seed databases, stub APIs, and validate UI states with realistic fixtures that mirror production data.',
      color: 'bg-blue-500'
    },
    {
      icon: TestTube2,
      title: 'Quality Assurance',
      description: 'Create repeatable test scenarios, edge cases, and boundary inputs for automated and manual testing.',
      color: 'bg-green-500'
    },
    {
      icon: Palette,
      title: 'Design & Prototyping',
      description: 'Fill Figma and product screenshots with believable content for portfolio shots and client demos.',
      color: 'bg-purple-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Developer at TechCorp',
      content: 'We replaced hand-written fixtures with Fake Detail and shaved days off our sprint. The data feels real and is easy to export.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'QA Lead at DataFlow',
      content: 'Perfect for regression suites. We cover more cases without touching real PII — our audits love that.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Product Designer at DesignLab',
      content: 'Clients understand designs faster when layouts are filled with realistic names, posts, and chats. Huge upgrade.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['100 records per day', 'Core data types', 'JSON & CSV export', 'Community support'],
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      features: ['10,000 records per day', 'All data types', 'All export formats', 'API access', 'Priority support'],
      popular: true,
      color: 'border-purple-500'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      features: ['Unlimited records', 'Custom schemas', 'On‑prem option', 'Dedicated support', 'SLA guarantee'],
      popular: false,
      color: 'border-gray-200'
    }
  ];

  const faqs = [
    {
      question: 'Is the generated data completely fake?',
      answer: 'Yes, all data is synthetically generated using algorithms. No real personal information is ever used or referenced in our generation process.'
    },
    {
      question: 'Can I use this for production testing?',
      answer: 'Absolutely! Our fake data is designed to be realistic and comprehensive enough for production-level testing and development workflows.'
    },
    {
      question: 'What export formats do you support?',
      answer: 'We support JSON, CSV, XML, SQL, and custom formats. You can also use our API to integrate directly with your applications.'
    },
    {
      question: 'How do you ensure data quality?',
      answer: 'Our algorithms are trained on real data patterns and validated against common use cases to ensure the generated data is realistic and useful.'
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
              <Link to="/" className="text-gray-900 font-medium">Home</Link>
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
                <Link to="/" className="block px-3 py-2 text-gray-900 font-medium">Home</Link>
                <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-purple-600">About</Link>
                <Link to="/generators" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Generators</Link>
              </div>
            </div>
          )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">Fake Details</span>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ml-2">Generator</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Generate random fake details like names, addresses, phone numbers, and emails to protect your privacy online. Safely test websites or maintain anonymity with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/generators"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Start Generating Free
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link 
                to="/whatsapp-chat-generator"
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
              >
                Try Now
              </Link>
            </div>
            <div className="mt-12 text-sm text-gray-500">
              Trusted by 50,000+ developers • 100% synthetic data • No sign‑up required
            </div>
          </div>
        </div>
      </section>

      {/* Data Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Data Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generate any type of data you need for your projects — from personal details and business profiles to social content and device metadata.
            </p>
          </div>

          <div className="flex flex-wrap justify-center mb-8">
            {Object.entries(dataTypes).map(([key, type]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 m-2 rounded-lg font-semibold transition-all ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <type.icon className="w-5 h-5 inline mr-2" />
                {type.title}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {dataTypes[activeTab as keyof typeof dataTypes].title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dataTypes[activeTab as keyof typeof dataTypes].items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-sm text-gray-500 mb-2">Sample Generated Data:</div>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  {activeTab === 'personal' && (
                    <>
                      <div>"name": "Jessica Martinez"</div>
                      <div>"email": "j.martinez@email.com"</div>
                      <div>"phone": "+1 (555) 123-4567"</div>
                      <div>"dob": "1992-03-15"</div>
                    </>
                  )}
                  {activeTab === 'address' && (
                    <>
                      <div>"street": "742 Oak Avenue"</div>
                      <div>"city": "Portland"</div>
                      <div>"state": "Oregon"</div>
                      <div>"zip": "97205"</div>
                    </>
                  )}
                  {activeTab === 'identifiers' && (
                    <>
                      <div>"imei": "356938035643809"</div>
                      <div>"deviceId": "device_9a8b7c6d"</div>
                      <div>"serial": "SN-2024-0042-XY"</div>
                    </>
                  )}
                  {activeTab === 'social' && (
                    <>
                      <div>"platform": "WhatsApp"</div>
                      <div>"chat_preview": "Hey — are we still on for tomorrow?"</div>
                      <div>"post": "Loving the new design! #product"</div>
                    </>
                  )}
                  {activeTab === 'business' && (
                    <>
                      <div>"company": "TechFlow Solutions"</div>
                      <div>"title": "Senior Developer"</div>
                      <div>"department": "Engineering"</div>
                      <div>"id": "EMP-2024-0157"</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by developers, for developers. Everything you need to generate, customize, and export fake data efficiently.
            </p>
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

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startups to enterprise teams, see how Fake Detail accelerates workflows across design, engineering, and QA.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
                  <div className={`w-16 h-16 ${useCase.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Developers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our community has to say about Fake Detail
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as you grow. Transparent pricing — no lock‑in or hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-sm border-2 ${plan.color} p-8 relative ${plan.popular ? 'transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
                  }`}>
                    {plan.name === 'Free' ? 'Get Started Free' : `Start ${plan.name} Plan`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
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
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Supercharge Your Development?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Fake Detail for their data generation needs. 
            Start building with realistic fake data today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer is rendered globally by App */}
    </div>
  );
}

export default Home;