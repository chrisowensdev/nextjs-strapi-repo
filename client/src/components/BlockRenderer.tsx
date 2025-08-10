import type { Block } from "@/types";

import { HeroSection } from "@/components/blocks/HeroSection";
import { InfoBlock } from "@/components/blocks/InfoBlock";
import { FeaturedArticle } from "@/components/blocks/FeaturedArticle";
import { Subscribe } from "@/components/blocks/Subscribe";

function blockRenderer(block: Block, index: number) {
	switch (block.__component) {
		case "blocks.hero-section":
			return <HeroSection {...block} key={index} />;
		case "blocks.info-block":
			return <InfoBlock {...block} key={index} />;
		case "blocks.featured-article":
			return <FeaturedArticle {...block} key={index} />;
		case "blocks.subscribe":
			return <Subscribe {...block} key={index} />;
		default:
			return null;
	}
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
	return blocks.map((block, index) => blockRenderer(block, index));
}
