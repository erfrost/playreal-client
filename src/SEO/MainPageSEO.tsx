import { NextSeo } from "next-seo";

const MainPageSEO = () => {
  return (
    <NextSeo
      title="PlayReal | Главная"
      description="Мы занимаемся более 10 лет бустингом во всех популярных играх и даём гарантию буста"
      canonical="https://yourwebsite.com"
      openGraph={{
        url: "https://yourwebsite.com",
        title: "PlayReal | Главная",
        description:
          "Мы занимаемся более 10 лет бустингом во всех популярных играх и даём гарантию буста",
        images: [
          {
            url: "/logo.jpg",
            width: 800,
            height: 300,
            alt: "Изображение сервиса",
          },
        ],
        site_name: "PlayReal",
      }}
    />
  );
};

export default MainPageSEO;
