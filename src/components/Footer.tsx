import React from 'react';
import { Database, Globe, Mail, Code, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Fake Detail</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              The most advanced fake data generator for developers, testers, and designers worldwide.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <Code className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="/whatsapp-chat-generator" className="hover:text-white transition-colors">WhatsApp Chat Generator</a></li>
              <li><a href="/phone-number-generator" className="hover:text-white transition-colors">Phone Number Generator</a></li>
              <li><a href="/address-generator" className="hover:text-white transition-colors">Address Generator</a></li>
              <li><a href="/company-name-generator" className="hover:text-white transition-colors">Company Generator</a></li>
              <li><a href="/imei-number-generator" className="hover:text-white transition-colors">IMEI Number Generator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 Fake Detail. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <span className="text-gray-400">Built with ❤️ for developers</span>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-400">SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 