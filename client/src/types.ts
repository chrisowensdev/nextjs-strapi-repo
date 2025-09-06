export interface LinkProps {
	id: number;
	text: string;
	href: string;
	isExternal: boolean;
}

export interface ImageProps {
	id: number;
	documentId: string;
	url: string;
	alternativeText: string;
}

export interface LogoProps {
	logoText: string;
	image: ImageProps;
}

export interface ArticleProps {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	image: ImageProps;
	author: string;
	featured: boolean;
	publishedAt: string;
	createdAt: string;
	updatedAt: string;
}

type ComponentType =
	| "blocks.hero-section"
	| "blocks.info-block"
	| "blocks.featured-article"
	| "blocks.subscribe";

interface Base<
	T extends ComponentType,
	D extends object = Record<string, unknown>
> {
	id: number;
	__component?: T;
	documentId?: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	data?: D;
}

export type Block =
	| HeroSectionProps
	| InfoBlockProps
	| FeaturedArticleProps
	| SubscribeProps;

export interface HeroSectionProps extends Base<"blocks.hero-section"> {
	theme: "turquoise" | "orange";
	heading: string;
	image: ImageProps;
	cta?: LinkProps;
	logo?: LogoProps;
	author?: string;
	darken?: boolean;
}

export interface InfoBlockProps extends Base<"blocks.info-block"> {
	theme: "turquoise" | "orange";
	reversed?: boolean;
	headline: string;
	content: string;
	image: ImageProps;
	cta?: LinkProps;
}

export interface FeaturedArticleProps extends Base<"blocks.featured-article"> {
	headline: string;
	excerpt: string;
	link: LinkProps;
	image: ImageProps;
}

export interface SubscribeProps extends Base<"blocks.subscribe"> {
	headline: string;
	content: string;
	placeholder: string;
	buttonText: string;
}
