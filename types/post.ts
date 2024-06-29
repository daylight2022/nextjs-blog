export type Post = {
	id?: string;
	slug?: string;
	title?: string;
	content: string;
	metadata: {
		[key: string]: any;
	};
};

export type PostsByMonth = {
	[key: string]: Post[];
};
