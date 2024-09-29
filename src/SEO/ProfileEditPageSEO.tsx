import { NextSeo } from "next-seo";

const ProfileEditPageSEO = () => {
  return (
    <NextSeo
      title="PlayReal | Редактирование профиля"
      description="Редактируйте свои данные на странице редактирования профиля. Изменяйте имя пользователя, контактную информацию и предпочтения по бустингу, чтобы получить лучший опыт обслуживания."
      canonical="https://yourwebsite.com/profile/edit"
      openGraph={{
        url: "https://yourwebsite.com/profile/edit",
        title: "PlayReal | Редактирование профиля",
        description:
          "Редактируйте свои данные на странице редактирования профиля. Изменяйте имя пользователя, контактную информацию и предпочтения по бустингу, чтобы получить лучший опыт обслуживания.",
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

export default ProfileEditPageSEO;
