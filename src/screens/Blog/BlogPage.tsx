import { SEO } from '@components/SEO';
import { PostApiData } from '@types-api';
import { Header } from './components/Header';
import { FeaturedImage } from './components/FeaturedImage';
import { AppThemeProvider } from '@contexts/AppTheme';
import { MenuBar } from '@components/MenuBar';
import { Container, LineDivider } from '@components/Ui';
import { DotDivider } from '@components/MdxComponents/DotDivider';
import { SeriesSection } from './components/SeriesSection';
import { RelevantPostSerieData } from './utils/series';
import { RelevantTranslationData } from './utils/translations';
import { AvailableTranslations } from './components/AvailableTranslations';
import { getPostUrl } from '@utils/url';
import { useLocalization } from '@hooks/useLocalization';
import { Tags } from '@components/Tags';

export type BlogPageProps = {
  content: RenderToStringReturnType;
  post: PostApiData;
  series?: RelevantPostSerieData;
  translation?: RelevantTranslationData;
};

export const BlogPage: React.FC<BlogPageProps> = ({
  content,
  post,
  series,
  translation,
}) => {
  const { featured_image, post_tags } = post;
  const { locale } = useLocalization();

  const allSeries = series ? (
    <SeriesSection series={series} currentPostId={post.id} />
  ) : null;

  const seriesWithDivider = series ? (
    <>
      <DotDivider />
      {allSeries}
    </>
  ) : null;

  const featuredImage = featured_image ? (
    <FeaturedImage
      src={featured_image.url}
      width={featured_image.width}
      height={featured_image.height}
    />
  ) : null;

  const translations = translation ? (
    <AvailableTranslations {...translation} />
  ) : null;

  return (
    <>
      <SEO
        imageUrl={featured_image.url}
        title={post.title}
        description={post.description}
        url={getPostUrl(post.slug, locale)}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
        />
        <link rel="stylesheet" href="/styles/blog.css" />
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />
      </SEO>
      <AppThemeProvider>
        <MenuBar />
        <Header title={post.title} subtitle={post.subtitle} />
        {translations}
        {allSeries}
        {featuredImage}
        <article className="prose lg:prose-xl container mx-auto px-4 md:px-0 max-w-screen-md">
          {content}
        </article>
        <Container as="footer">
          {seriesWithDivider}
          <LineDivider />
          {post_tags ? <Tags tags={post_tags} /> : null}
        </Container>
      </AppThemeProvider>
    </>
  );
};
