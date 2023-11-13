import type { AppProps as NextAppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "@/styles/globals.css";


interface AppProps extends NextAppProps {
  clientId?: string;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
