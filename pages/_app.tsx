import { PrivateContainer } from "components/PrivateContainer";
import { AuthProvider } from "context/auth/auth.context";
import type { AppProps } from "next/app";

import { GlobalStyles } from "styles/global";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <PrivateContainer>
          <Component {...pageProps} />
        </PrivateContainer>
      </AuthProvider>
    </>
  );
};

export default MyApp;
