import { NextSeo } from "next-seo";

interface Props {
  gameId: string;
  gameName: string;
}
const ServicesPageSEO = ({ gameId, gameName }: Props) => {
  return (
    <NextSeo
      title={`PlayReal | ${gameName}`}
      description={`Откройте для себя наши специализированные услуги по бустингу в ${gameName}. Мы предлагаем профессиональные решения, которые помогут вам повысить уровень аккаунта, улучшить рейтинг и достичь игровых целей. Доверьтесь нашим опытным бустерам и наслаждайтесь игрой без лишних забот!`}
      canonical={`https://yourwebsite.com/games/${gameId}`}
      openGraph={{
        url: `https://yourwebsite.com/games/${gameId}`,
        title: `PlayReal | ${gameName}`,
        description: `Откройте для себя наши специализированные услуги по бустингу в ${gameName}. Мы предлагаем профессиональные решения, которые помогут вам повысить уровень аккаунта, улучшить рейтинг и достичь игровых целей. Доверьтесь нашим опытным бустерам и наслаждайтесь игрой без лишних забот!`,
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

export default ServicesPageSEO;
