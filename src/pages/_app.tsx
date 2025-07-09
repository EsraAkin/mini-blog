import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Layout from '../components/Layout';
import Script from 'next/script'; // 👈 Script eklendi

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 👇 Plausible Analytics kodu */}
      <Script
        defer
        data-domain="mini-blog-cejr.vercel.app"
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
