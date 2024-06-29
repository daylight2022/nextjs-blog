import PostList from '@/components/PostList';
import TOC from '@/components/TOC';
import MDXComponents from '@/components/mdx/MDXComponents';
import { Separator } from '@/components/ui/separator';
import { getPosts } from '@/lib/posts';
import { Post } from '@/types/post';
import dayjs from 'dayjs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

type Props = {
	params: {
		slug: string;
	};
};

export default async function DetaliPage({ params }: Props) {
	const { slug } = params;
	const { posts }: { posts: Post[] } = await getPosts();
	const postIndex = posts.findIndex((post) => post.metadata.slug === slug);
	const post = posts[postIndex];

	const prevPost = postIndex - 1 >= 0 ? posts[postIndex - 1] : null;
	const nextPost = postIndex + 1 < posts.length ? posts[postIndex + 1] : null;

	const { content, metadata } = post;

	return (
		<div className="flex flex-row w-full pt-12">
			<aside>
				<PostList isSide posts={posts}></PostList>
			</aside>
			<div className="w-full md:w-3/5 px-6">
				<article>
					<h1>{metadata.title}</h1>
					<MDXRemote source={content} components={MDXComponents} />
				</article>
				<Separator className="my-12 bg-gray-600" />
				<div className="flex justify-between">
					<div>发布时间：{dayjs(metadata.date).format('YYYY-MM-DD')}</div>
					<div className="flex gap-2 flex-col sm:flex-row">
						{prevPost ? <Link href={`/post/${prevPost.metadata.slug}`}>上一篇</Link> : <></>}
						{nextPost ? <Link href={`/post/${nextPost.metadata.slug}`}>下一篇</Link> : <></>}
						<Link href="/" className="link-underline">
							去首页
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden md:flex flex-col justify-start md:w-1/5 pr-6">
				<TOC />
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const { posts }: { posts: Post[] } = await getPosts();
	return posts.map((post) => ({
		slug: post.metadata.slug,
	}));
}
