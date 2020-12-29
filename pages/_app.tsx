import { PrivateContainer } from "components/PrivateContainer";
import { PublicContainer } from "components/PublicContainer";
import { AuthProvider } from "context/auth/auth.context";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { GlobalStyles } from "styles/global";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
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
            <Component {...pageProps} />
          </PrivateContainer>
        )}
      </AuthProvider>
    </>
  );
};

export default MyApp;
