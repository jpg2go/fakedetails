import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo } from '../seo';

const setOrCreateMeta = (attrName: string, attrValue: string, content: string) => {
	let el: HTMLMetaElement | HTMLLinkElement | null = null;
	if (attrName === 'canonical') {
		el = document.querySelector('link[rel="canonical"]');
		if (!el) {
			el = document.createElement('link');
			(el as HTMLLinkElement).rel = 'canonical';
			document.head.appendChild(el);
		}
		(el as HTMLLinkElement).href = content;
		return;
	}

	el = document.querySelector(`meta[name="${attrName}"]`);
	if (!el) {
		el = document.createElement('meta');
		(el as HTMLMetaElement).name = attrName;
		document.head.appendChild(el);
	}
	(el as HTMLMetaElement).content = content;
};

const Seo: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		const path = location.pathname;
		const seo = getSeo(path);

		if (seo?.title) document.title = seo.title;
		if (seo?.description) setOrCreateMeta('description', 'description', seo.description);
		if (seo?.canonical) setOrCreateMeta('canonical', 'canonical', seo.canonical);
		// set other common tags if desired (og:title, og:description, etc.)
		setOrCreateMeta('og:title', 'og:title', seo.title);
		setOrCreateMeta('og:description', 'og:description', seo.description);
		// optional: set twitter tags
		setOrCreateMeta('twitter:title', 'twitter:title', seo.title);
		setOrCreateMeta('twitter:description', 'twitter:description', seo.description);
	}, [location.pathname]);

	return null;
};

export default Seo; 