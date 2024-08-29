import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Chatbox from "./components/ChatBox/Chatbox";
import Head from "next/head";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pars | Buchi Türkiye Temsilcisi",
  description: "Pars Analitik, Sizlere Temsilciğini Yapmış Olduğu Ürünleri Konusunda Uzman Ekibi İle Laboratuvar ve Proses Uygulamalarınız İçin Satış Öncesi ve Satış Sonrası Hizmet Sunar.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
       <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K6HKF7G');
            `,
          }}
        />
      </head>
      <body className={"container-self"+inter.className}>
      <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K6HKF7G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <div id="top" ></div>
        <Header/>
        <main className="main container-self" >
        {children}
        </main>
        <Footer/>
        <ScrollToTopButton />

      {/* <Chatbox/> */}
      </body>
    </html>
  );
}
