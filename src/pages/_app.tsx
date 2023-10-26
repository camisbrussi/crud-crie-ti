import { AuthProvider } from "@/contexts/AuthContext";
import { GlobalStyle } from "@/styles/global";
import { darkTheme } from "@/styles/themes/dark";
import { defaultTheme } from "@/styles/themes/default";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkTheme, setDarkTheme] = useState(true);
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={isDarkTheme ? darkTheme : defaultTheme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
