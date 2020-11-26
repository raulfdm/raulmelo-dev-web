import React from 'react';
import { GetStaticProps } from 'next';

import { Backend } from '@services/Backend';
import { PersonalInformationApiData, SocialApiData } from '@types-api';
import { PostsApiData } from 'src/types/api/posts';
import { HomePage, HomePageProps } from '@screens/Home/HomePage';
import { sanitizePosts } from '@screens/Home/utils/apiSanitizer';
import { sortDescPostsByDate } from '@utils/posts';
import { pipe } from '@utils/ramda';

const Home = (props: HomePageProps) => {
  return <HomePage {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [posts, personalInfo, social] = (await Promise.all([
    /**
     * TODO: fix get posts by locale
     * If I filter by locale, when the user switch from one lang to other
     * the posts for the selected language wont be available
     */
    // Backend.fetch('posts', `?language=${locale}`),
    Backend.fetch('posts'),
    Backend.fetch('personal-information'),
    Backend.fetch('social'),
  ])) as [PostsApiData, PersonalInformationApiData, SocialApiData];

  return {
    props: {
      // TODO: I really don't know how to fix this type coercion
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      posts: pipe(sanitizePosts, sortDescPostsByDate)(posts),
      locale,
      personalInfo,
      social,
    },
    revalidate: 1,
  };
};

export default Home;
