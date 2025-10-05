import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Menu, X, Shield, Globe, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
							<span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Fake Detail</span>
						</Link>

						<nav className="hidden md:flex items-center space-x-8">
							<Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
							<Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
							<Link to="/generators" className="text-gray-600 hover:text-purple-600 transition-colors">Generators</Link>
						</nav>

						<button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
							{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>
					</div>
				</div>

				{mobileMenuOpen && (
					<div className="md:hidden bg-white border-t border-gray-100">
						<div className="px-4 py-2 space-y-1">
							<Link to="/" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Home</Link>
							<Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-purple-600">About</Link>
							<Link to="/generators" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Generators</Link>
						</div>
					</div>
				)}
			</header>

			{/* Hero */}
			<section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
						<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">Your privacy is important. This page explains what data we collect and how we use it.</p>
						<div className="flex justify-center gap-4">
							<a href="#policy" className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow">Read the policy</a>
							<Link to="/generators" className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 font-medium hover:bg-purple-50">Try tools</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Feature strip */}
			<section className="py-12 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-3 gap-6">
						<div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
							<div className="p-3 rounded-lg bg-green-50 text-green-600">
								<Shield className="w-6 h-6" />
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">Privacy-first design</h3>
								<p className="text-gray-600">We prioritize privacy and never use real personal data to build tools.</p>
							</div>
						</div>

						<div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
							<div className="p-3 rounded-lg bg-blue-50 text-blue-600">
								<Globe className="w-6 h-6" />
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">Transparent practices</h3>
								<p className="text-gray-600">Clear explanations about data collection and usage so you can make informed decisions.</p>
							</div>
						</div>

						<div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
							<div className="p-3 rounded-lg bg-purple-50 text-purple-600">
								<Mail className="w-6 h-6" />
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">Control & choice</h3>
								<p className="text-gray-600">You control locally stored data and can export or clear it at any time.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Policy content */}
			<section id="policy" className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2">
							<div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
								<div className="space-y-6 text-lg text-gray-600 leading-relaxed">
									

									<h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
									<p>Fake Detail (“we”, “us”, or “our”) provides synthetic data generation tools for developers, designers, and testers. We do not collect personal information to build our datasets; any data you enter remains local to you unless you explicitly export or share it.</p>

									<h2 className="text-2xl font-semibold text-gray-900">Information we collect</h2>
									<p>We may collect limited non-identifying information to operate the site and improve the experience:</p>
									<ul className="list-disc pl-5 space-y-2">
										<li>Device and browser statistics (user agent, screen size).</li>
										<li>Usage analytics (page views, feature usage) unless you opt-out via browser settings.</li>
										<li>Local data you store (e.g., generated chats saved in localStorage).</li>
									</ul>

									<h2 className="text-2xl font-semibold text-gray-900">How we use information</h2>
									<p>We use the information to maintain and improve our services, diagnose issues, and understand usage patterns. We never sell personal data.</p>

									<h2 className="text-2xl font-semibold text-gray-900">Third-party services</h2>
									<p>We rely on trusted third parties for hosting and analytics. Their use of data is governed by their privacy policies.</p>

									<h2 className="text-2xl font-semibold text-gray-900">Your choices</h2>
									<p>You can clear local data from your browser, disable analytics cookies, and export any generated content you wish to keep.</p>

									<h2 className="text-2xl font-semibold text-gray-900">Contact</h2>
									<p>Questions? Email <a href="mailto:fakedetailgen@gmail.com" className="text-purple-600">fakedetailgen@gmail.com</a>.</p>
								</div>
							</div>
						</div>

						<div className="lg:col-span-1">
							<div className="sticky top-24">
								<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
									<h3 className="text-lg font-semibold text-gray-900 mb-3">What we store</h3>
									<ul className="text-gray-600 space-y-2">
										<li>Local generated data</li>
										<li>Browser preferences</li>
										<li>Anonymous analytics</li>
									</ul>
									<div className="mt-4">
										<a href="#" className="text-sm font-medium text-purple-600">Read full data retention policy →</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default PrivacyPolicy; 