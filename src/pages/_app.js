import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>PlayReal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Мы занимаемся более 10 лет бустингом во всех популярных играх и даём
            гарантию буста"
        />
        <meta name="author" content="PlayReal" />
        <meta property="og:title" content="PlayReal | Главная" />
        <meta
          property="og:description"
          content="Мы занимаемся более 10 лет бустингом во всех популярных играх и даём
          гарантию буста"
        />
        <meta property="og:image" content="/logo.jpg" />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}
