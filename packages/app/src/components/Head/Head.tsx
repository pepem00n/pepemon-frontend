import React from 'react';
import { Helmet } from 'react-helmet';

export interface HelmetProps {
	title: string,
	description: string,
	ogTitle?: string,
	ogDescription?: string,
	twitterTitle?: string,
	twitterDescription?: string,
	index?: boolean,
	follow?: boolean,
}

const Head: React.FC<HelmetProps> = ({title, description, ogTitle, ogDescription, twitterTitle, twitterDescription, index=true, follow=true}) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description}/>
			<meta name="og:title" content={ogTitle ? ogTitle : title}/>
			<meta name="og:description" content={ogDescription ? ogDescription : description}/>
			<meta name="twitter:title" content={twitterTitle ? twitterTitle : title}/>
			<meta name="twitter:description" content={twitterDescription ? twitterDescription : description}/>
			<meta name="robots" content={`${index ? 'index' : 'noindex'},${follow ? 'follow' : 'nofollow'}`}/>
		</Helmet>
	)
}


export default Head;
