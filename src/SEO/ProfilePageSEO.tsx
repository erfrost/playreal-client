import { NextSeo } from "next-seo";

interface Props {
  userId: string;
  userName: string;
}
const ProfilePageSEO = ({ userId, userName }: Props) => {
  return (
    <NextSeo
      title={`PlayReal | ${userName}`}
      description={`Добро пожаловать в профиль ${userName}! Здесь вы можете просмотреть свои заказы, отслеживать прогресс бустинга и взаимодействовать с нашими профессиональными бустерами. Воспользуйтесь всеми преимуществами нашего сервиса и достигайте новых высот в игре!`}
      canonical={`https://yourwebsite.com/profile/${userId}`}
      openGraph={{
        url: `https://yourwebsite.com/profile/${userId}`,
        title: `PlayReal | ${userName}`,
        description: `Добро пожаловать в профиль ${userName}! Здесь вы можете просмотреть свои заказы, отслеживать прогресс бустинга и взаимодействовать с нашими профессиональными бустерами. Воспользуйтесь всеми преимуществами нашего сервиса и достигайте новых высот в игре!`,
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

export default ProfilePageSEO;
