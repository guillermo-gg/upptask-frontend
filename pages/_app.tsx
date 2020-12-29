import { PrivateContainer } from "components/PrivateContainer";
import { PublicContainer } from "components/PublicContainer";
import { AuthProvider } from "context/auth/auth.context";
import Head from "next/head";

import { DefaultSeo, NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import SEO from "seo.config";

import { GlobalStyles } from "styles/global";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <GlobalStyles />
      <AuthProvider>
        <DefaultSeo {...SEO} />
        {pathname === "/" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname.startsWith("/legal") ? (
          <PublicContainer
            hasNavbar={!(pathname === "/login" || pathname === "/signup")}
          >
            <Component {...pageProps} />
          </PublicContainer>
        ) : (
          <PrivateContainer>
            <NextSeo noindex />
            <Component {...pageProps} />
          </PrivateContainer>
        )}
      </AuthProvider>
    </>
  );
};

export default MyApp;
