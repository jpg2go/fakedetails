export interface SeoEntry {
	path: string; // route path or slug
	title: string;
	description: string;
	canonical?: string;
}

const entries: Record<string, SeoEntry> = {
	'/': {
		path: '/',
		title: 'Fake Details Generator | Create Random Info Online Free',
		description: 'Use our Fake Details Generator to instantly create random names, emails, phone numbers, and addresses. Safe, quick, and free tool for all your needs.',
		canonical: 'https://fakedetail.app/'
	},
	'/generators': {
		path: '/generators',
		title: 'All Generators | Fake Detail Tools',
		description: 'Browse our library of generators for mock chats, names, phone numbers, addresses and more — build realistic test data and screenshots in seconds.',
		canonical: 'https://fakedetail.app/generators'
	},
	'/whatsapp-chat-generator': {
		path: '/whatsapp-chat-generator',
		title: 'WhatsApp Chat Generator | Create Fake Chats Online Free',
		description: 'Generate realistic fake WhatsApp chats online with our Chat Generator. Fun, easy to use, and perfect for pranks or creative projects. Try it free today!',
		canonical: 'https://fakedetail.app/whatsapp-chat-generator'
	},
	'/warrior-cat-name-generator': {
		path: '/warrior-cat-name-generator',
		title: 'Warrior Cat Name Generator | Create Unique Cat Names Free',
		description: 'Find the perfect Warrior Cat name with our fun generator. Create unique, creative, and powerful cat names for your stories, games, or roleplay.',
		canonical: 'https://fakedetail.app/warrior-cat-name-generator'
	},
	'/insult-name-generator': {
		path: '/insult-name-generator',
		title: 'Insult Name Generator | Create Funny Roast Names Online',
		description: 'Generate hilarious insult names with our Insult Name Generator. Perfect for pranks, jokes, or fun with friends. Quick, creative, and free to use now!',
		canonical: 'https://fakedetail.app/insult-name-generator'
	},
	'/wow-name-generator': {
		path: '/wow-name-generator',
		title: 'WoW Name Generator | Create Unique World of Warcraft Names',
		description: 'Use our WoW Name Generator to create unique, cool, and fantasy-inspired names for your World of Warcraft characters. Quick, fun, and free to try today!',
		canonical: 'https://fakedetail.app/wow-name-generator'
	},
	'/planet-name-generator': {
		path: '/planet-name-generator',
		title: 'Planet Name Generator | Create Unique Fantasy Planet Names',
		description: 'Explore our Planet Name Generator to create unique, creative, and fantasy-inspired planet names for stories, games, or world-building projects.',
		canonical: 'https://fakedetail.app/planet-name-generator'
	},
	'/horse-name-generator': {
		path: '/horse-name-generator',
		title: 'Horse Name Generator | Create Unique & Cool Horse Names',
		description: 'Use our Horse Name Generator to craft unique, creative, and memorable names for your horses. Perfect for games, stories, or real-life pets.',
		canonical: 'https://fakedetail.app/horse-name-generator'
	},
	'/orc-name-generator': {
		path: '/orc-name-generator',
		title: 'Orc Name Generator | Create Fierce & Unique Orc Names',
		description: 'Generate powerful and unique Orc names with our Orc Name Generator. Perfect for games, stories, or roleplay. Quick, fun, and free to use online!',
		canonical: 'https://fakedetail.app/orc-name-generator'
	},
	'/god-name-generator': {
		path: '/god-name-generator',
		title: 'God Name Generator | Create Unique Divine Names Online',
		description: 'Use our God Name Generator to create unique, powerful, and divine names for stories, games, or creative projects. Quick, fun, and free to try!',
		canonical: 'https://fakedetail.app/god-name-generator'
	},
	'/alien-name-generator': {
		path: '/alien-name-generator',
		title: 'Alien Name Generator | Create Unique Extraterrestrial Names',
		description: 'Generate creative and unique alien names with our Alien Name Generator. Perfect for stories, games, or sci-fi projects. Fast, fun, and free to use!',
		canonical: 'https://fakedetail.app/alien-name-generator'
	},
	'/dj-name-generator': {
		path: '/dj-name-generator',
		title: 'DJ Name Generator | Create Cool & Unique DJ Names Fast',
		description: 'Use our DJ Name Generator to craft unique, catchy, and memorable DJ names. Perfect for artists, events, or online profiles. Quick and free to try!',
		canonical: 'https://fakedetail.app/dj-name-generator'
	},
	'/band-name-generator': {
		path: '/band-name-generator',
		title: 'Band Name Generator | Unique & Creative Band Name Ideas',
		description: 'Find the perfect band name with our Band Name Generator. Get unique, creative, and memorable band name ideas instantly. Start your music journey today!',
		canonical: 'https://fakedetail.app/band-name-generator'
	},
	'/nickname-generator': {
		path: '/nickname-generator',
		title: 'Nickname Generator | Cool & Creative Nickname Ideas',
		description: 'Discover the perfect nickname with our Nickname Generator. Get cool, funny, and creative nickname ideas instantly. Find your new favorite nickname today!',
		canonical: 'https://fakedetail.app/nickname-generator'
	},
	'/random-name-generator': {
		path: '/random-name-generator',
		title: 'Random Name Generator | Generate Unique Names Instantly',
		description: 'Use our Random Name Generator to create unique names for any purpose. Whether for characters, pets, or usernames, find the perfect name instantly!',
		canonical: 'https://fakedetail.app/random-name-generator'
	},
	'/aesthetic-name-generator': {
		path: '/aesthetic-name-generator',
		title: 'Aesthetic Name Generator | Cute & Unique Name Ideas',
		description: 'Find dreamy, soft, and stylish names with our Aesthetic Name Generator. Perfect for usernames, brands, or characters. Get inspired with beautiful names!',
		canonical: 'https://fakedetail.app/aesthetic-name-generator'
	},
	'/company-name-generator': {
		path: '/company-name-generator',
		title: 'Company Name Generator | Unique Business Name Ideas',
		description: 'Generate unique, catchy, and brandable names with our Company Name Generator. Perfect for startups, small businesses, and entrepreneurs. Try it now!',
		canonical: 'https://fakedetail.app/company-name-generator'
	},
	'/mail-generator': {
		path: '/mail-generator',
		title: 'Mail Generator | Create Fake, Temp & Custom Emails Fast',
		description: 'Generate temporary, fake, or custom email addresses instantly with our Mail Generator. Perfect for signups, testing, or privacy. Safe and easy to use!',
		canonical: 'https://fakedetail.app/mail-generator'
	},
	'/fake-mail-generator': {
		path: '/fake-mail-generator',
		title: 'Fake Mail Generator | Free Temp Email for Quick Use',
		description: 'Use our Fake Mail Generator to create free, disposable email addresses instantly. Protect your privacy and avoid spam. No sign-up needed—fast & secure!',
		canonical: 'https://fakedetail.app/fake-mail-generator'
	},
	'/phone-number-generator': {
		path: '/phone-number-generator',
		title: 'Phone Number Generator | Create Random Numbers Instantly',
		description: 'Generate random phone numbers quickly with our Phone Number Generator. Perfect for testing, games, or verification. Easy, fast, and free to use!',
		canonical: 'https://fakedetail.app/phone-number-generator'
	},
	'/fake-phone-number-generator': {
		path: '/fake-phone-number-generator',
		title: 'Generate Fake Phone Numbers | Safe & Easy Tool',
		description: 'Create fake phone numbers in regional formats for app testing, forms and mockups. Export and copy lists for development workflows.',
		canonical: 'https://fakedetail.app/fake-phone-number-generator'
	},
	'/address-generator': {
		path: '/address-generator',
		title: 'Generate Realistic Fake Addresses | Easy & Reliable',
		description: 'Create realistic fake addresses quickly for testing, privacy, or fun. Use our reliable fake address generator to get instant, accurate, and unique data every time.',
		canonical: 'https://fakedetail.app/address-generator'
	},
	'/imei-number-generator': {
		path: '/imei-number-generator',
		title: 'IMEI Number Generator | Create Valid IMEI Numbers',
		description: 'Create valid IMEI numbers instantly for testing and development. Use our easy IMEI number generator to get unique and accurate codes every time you need them.',
		canonical: 'https://fakedetail.app/imei-number-generator'
	},
	'/username-generator': {
		path: '/username-generator',
		title: 'Username Generator | Create Unique Usernames Instantly',
		description: 'Generate unique and catchy usernames instantly for social media, gaming, or online accounts. Use our username generator for creative and original ideas every time.',
		canonical: 'https://fakedetail.app/username-generator'
	},
	'/personality-generator': {
		path: '/personality-generator',
		title: 'Personality Generator | Generate Unique Personality Traits Fast',
		description: 'Explore fun and insightful personality traits with our Personality Generator. Get instant, unique profiles for entertainment, self-discovery, or creative projects.',
		canonical: 'https://fakedetail.app/personality-generator'
	},
	'/password-generator': {
		path: '/password-generator',
		title: 'Password Generator | Create Strong & Secure Passwords Fast',
		description: 'Generate strong, secure passwords instantly with our easy-to-use Password Generator. Protect your accounts with unique, reliable passwords every time you need one.',
		canonical: 'https://fakedetail.app/password-generator'
	},
	'/dwarf-name-generator': {
		path: '/dwarf-name-generator',
		title: 'Dwarf Name Generator | Create Unique Dwarf Names Instantly',
		description: 'Generate unique and creative dwarf names for games, stories, or fun. Use our Dwarf Name Generator to get instantly inspired with authentic and catchy names every time.',
		canonical: 'https://fakedetail.app/dwarf-name-generator'
	},
	'/bible-verse-generator': {
		path: '/bible-verse-generator',
		title: 'Bible Verse Generator | Find Inspirational Verses Instantly',
		description: 'Discover meaningful Bible verses quickly with our Bible Verse Generator. Get daily inspiration and spiritual guidance by generating verses tailored to your needs.',
		canonical: 'https://fakedetail.app/bible-verse-generator'
	},
	'/privacy': {
		path: '/privacy',
		title: 'Privacy Policy | Fake Detail',
		description: 'Read our Privacy Policy to learn what data we collect, how we use it, and the controls you have. We prioritize privacy and keep most generated data local to your browser.',
		canonical: 'https://fakedetail.app/privacy'
	},
	'/about': {
		path: '/about',
		title: 'About | Fake Detail',
		description: 'Learn about Fake Detail, our mission and the tools we build for generating mock data and realistic UI screenshots locally in your browser.',
		canonical: 'https://fakedetail.app/about'
	}
};

/**
 * Get SEO entry by route/path. Falls back to root entry if not found.
 */
export function getSeo(path: string): SeoEntry {
	return entries[path] || entries['/'];
}

export default entries; 