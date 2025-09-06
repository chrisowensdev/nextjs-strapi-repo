import type { ArticleProps, Block } from "@/types";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/format-date";
import { getContentBySlug } from "@/data/loaders";

import { HeroSection } from "@/components/blocks/HeroSection";
import { BlockRenderer } from "@/components/BlockRenderer";
import Link from "next/link";
import { ContentList } from "@/components/ContentList";
import { BlogCard } from "@/components/BlogCard";

interface PageProps {
	params: Promise<{ slug: string }>;
}

async function loader(slug: string) {
	const { data } = await getContentBySlug(slug, "/api/articles");
	const article = data[0];
	if (!article) throw notFound();
	return { article: article as ArticleProps, blocks: article?.blocks };
}

interface ArticleOverviewProps {
	headline: string;
	description: string;
	tableOfContents: { heading: string; linkId: string }[];
}

function ArticleOverview({
	headline,
	description,
	tableOfContents,
}: Readonly<ArticleOverviewProps>) {
	return (
		<div className="article-overview">
			<div className="article-overview__info">
				<h3 className="article-overview__headline">{headline}</h3>
				<p className="article-overview__description">{description}</p>
			</div>
			{tableOfContents && (
				<ul className="article-overview__contents">
					{tableOfContents.map((item, index) => (
						<li key={index}>
							<Link
								href={`#${item.linkId}`}
								className="article-overview__link"
							>
								{index + 1}. {item.heading}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
export default async function SingleBlogRoute({ params }: PageProps) {
	const slug = (await params).slug;
	const { article, blocks } = await loader(slug);
	const { title, author, publishedAt, description, image } = article;

	console.dir(blocks, { depth: null });

	const tableOfContent = blocks?.filter(
		(block: Block) => block.__component === "blocks.heading"
	);

	return (
		<div>
			<HeroSection
				id={article.id}
				heading={title}
				theme="orange"
				image={image}
				author={author}
				publishedAt={formatDate(publishedAt)}
				darken={true}
			/>
			<div className="container">
				<ArticleOverview
					headline={title}
					description={description}
					tableOfContents={tableOfContent}
				/>
				<BlockRenderer blocks={blocks} />
			</div>
			<ContentList
				headline="Featured Articles"
				path="/api/articles"
				component={BlogCard}
				featured
				headlineAlignment="center"
			/>
		</div>
	);
}
