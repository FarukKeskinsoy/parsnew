import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Chatbox from "./components/ChatBox/Chatbox";
import Head from "next/head";
import ScrollToTopButton from "./components/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pars | Buchi Türkiye Temsilcisi",
  description: "Pars Analitik, Sizlere Temsilciğini Yapmış Olduğu Ürünleri Konusunda Uzman Ekibi İle Laboratuvar ve Proses Uygulamalarınız İçin Satış Öncesi ve Satış Sonrası Hizmet Sunar.",
  favicon:"/pars.ico"
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        {/* <link rel="icon" href="/pars.ico" sizes="any" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </Head>
      <body className={"container-self"+inter.className}>
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
