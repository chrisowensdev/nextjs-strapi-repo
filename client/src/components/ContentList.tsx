import { ArticleProps } from "@/types";
import { getContent } from "@/data/loaders";

interface ContentListProps {
	headline: string;
	query?: string;
	path: string;
	featured?: boolean;
	component: React.ComponentType<ArticleProps & { basePath: string }>;
	headlineAlignment?: "center" | "right" | "left";
}

async function loader(path: string, featured?: boolean) {
	const { data, meta } = await getContent(path, featured);
	return {
		articles: (data as ArticleProps[]) || [],
	};
}

export async function ContentList({
	headline,
	path,
	featured,
	component,
	headlineAlignment,
}: Readonly<ContentListProps>) {
	console.log(path);
	const { articles } = await loader(path, featured);
	console.log(articles);
	const Component = component;
	return (
		<section className="content-items container">
			<h3
				className={`content-items__headline ${headlineAlignment ?? ""}`}
			>
				{headline || "Featured Articles"}
			</h3>
			<div className="content-items__container--card">
				{articles.map((article) => (
					<Component
						key={article.documentId}
						{...article}
						basePath={path}
					/>
				))}
			</div>
		</section>
	);
}
