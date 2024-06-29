import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
	options: {},
});

export default withMDX(nextConfig);
