import { AuthProvider } from "context/auth/auth.context";
import type { AppProps } from "next/app";

import { GlobalStyles } from "styles/global";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
