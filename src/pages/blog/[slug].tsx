import React from 'react';
import { GetStaticPaths } from 'next';

import { renderToString, hydrate } from '@config/mdx';
import { Backend } from '@services/Backend';
import { PostApi, PostsApi } from 'src/types/api/posts';
import { BlogTheme } from '@components/Themes/BlogTheme';

type BlogProps = {
  content: any;
};

const BlogPost: React.FC<BlogProps> = ({ content }) => {
  const parsedContent = hydrate(content);
  console.log(parsedContent);
  return <BlogTheme>{parsedContent}</BlogTheme>;
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const post = (await Backend.fetch(
    'posts',
    `?slug=${params.slug}`,
  )) as PostApi;

  const mdxSource = await renderToString(post.content);

  console.log(post);
  return {
    props: {
      content: mdxSource,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await Backend.fetch('posts')) as PostsApi;

  const paths = posts.map((post) => ({
    params: {
      slug: post['slug'],
    },
    locale: post['language'],
  }));

  return {
    paths,
    fallback: true,
  };
};

export default BlogPost;
