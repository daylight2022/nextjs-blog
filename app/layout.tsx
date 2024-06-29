import BaiDuAnalytics from '@/app/BaiDuAnalytics';
import GoogleAnalytics from '@/app/GoogleAnalytics';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { TailwindIndicator } from '@/components/theme/TailwindIndicator';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { siteConfig } from '@/config/site';
import { getPosts } from '@/lib/posts';
import '@/styles/globals.css';
import '@/styles/loading.css';
import { Post, PostsByMonth } from '@/types/post';
import { Analytics } from '@vercel/analytics/react';
import { Viewport } from 'next';

export const metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	authors: siteConfig.authors,
	creator: siteConfig.creator,
	icons: siteConfig.icons,
	metadataBase: siteConfig.metadataBase,
	openGraph: siteConfig.openGraph,
	twitter: siteConfig.twitter,
};
export const viewport: Viewport = {
	themeColor: siteConfig.themeColors,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { posts }: { posts: Post[]; postsByMonth: PostsByMonth } = await getPosts();

	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className="min-h-screen bg-background">
				<ThemeProvider attribute="class" defaultTheme={siteConfig.defaultNextTheme} enableSystem>
					<Header />
					<main className="flex flex-col items-center py-6">{children}</main>
					<Footer />
					<Analytics />
					<TailwindIndicator />
				</ThemeProvider>
				{process.env.NODE_ENV === 'development' ? (
					<></>
				) : (
					<>
						<GoogleAnalytics />
						<BaiDuAnalytics />
					</>
				)}
			</body>
		</html>
	);
}
