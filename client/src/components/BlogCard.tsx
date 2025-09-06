import { Card, type CardProps } from "@/components/Card";

export const BlogCard = (props: Readonly<CardProps>) => {
	return <Card {...props} basePath="blog" />;
};
