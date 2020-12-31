import {
  BigQuote,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  CodePenIframe,
  Gif,
  YouTubeIframe,
  DotDivider,
} from '@raulfdm/blog-components';

import { TwitterCard } from './TwitterCard';
import { Image } from './Image';

export const mdxComponents = {
  BigQuote,
  Gif,
  CodePen: CodePenIframe,
  YouTubeVideo: YouTubeIframe,
  hr: DotDivider,
  Image,
  TwitterCard,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};
