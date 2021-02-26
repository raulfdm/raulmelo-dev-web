import { GA_TRACKING_ID } from '@config/analytics';
import classNames from 'classnames';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { extractCritical } from '@emotion/server';

export default class MyDocument extends Document<{
  ids: string[];
  css: string;
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          {/* Global Theme handler
            It needs to be in the header to avoid FOUC (flash of unstyled content)
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function themeHandler() {
                if (
                  window.__theme === 'dark' ||
                  localStorage.theme === 'dark' ||
                  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  ) {
                  document.documentElement.classList.add('dark');
                  window.__theme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  window.__theme = 'light'
                }
              })()
            `,
            }}
          />
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body
          className={classNames([
            'min-h-screen',
            'bg-white dark:bg-blue-900',
            'text-black dark:text-white',
            'transition-theme duration-200 ease',
            'relative',
          ])}
        >
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
