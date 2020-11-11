import React from 'react';
import { GetStaticPaths } from 'next';
import head from 'ramda/src/head';

import { Backend } from '@services/Backend';
import {
  PersonalInformationApiData,
  PostsTagApiData,
  SiteApiData,
  SocialApiData,
} from '@types-api';
import { TagPage, TagPageProps } from '@screens/Tag/TagPage';

const Tag = ({ tag, personalInfo, social, site }: TagPageProps) => {
  return (
    <TagPage
      tag={tag}
      personalInfo={personalInfo}
      social={social}
      site={site}
    />
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const [tags, personalInfo, social, site]: [
    PostsTagApiData,
    PersonalInformationApiData,
    SocialApiData,
    SiteApiData,
  ] = await Promise.all([
    Backend.fetch('post-tags', `?slug=${params.slug}`),
    Backend.fetch('personal-information'),
    Backend.fetch('social'),
    Backend.fetch('site'),
  ]);

  const tag = head(tags);

  return {
    props: { tag, personalInfo, social, site },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = (await Backend.fetch('post-tags')) as PostsTagApiData;

  const paths = tags.map((tag) => ({
    params: {
      slug: tag['slug'],
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Tag;
