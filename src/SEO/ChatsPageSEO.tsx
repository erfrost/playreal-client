import { NextSeo } from "next-seo";

const ChatsPageSEO = () => {
  return (
    <NextSeo
      title="PlayReal | Чаты"
      description="Общайтесь напрямую с нашими бустерами в чате! Получите ответы на ваши вопросы, обсудите детали заказа и следите за прогрессом вашего буста. Мы гарантируем качественное обслуживание и поддержку на каждом этапе!"
      canonical="https://yourwebsite.com/chats"
      openGraph={{
        url: "https://yourwebsite.com/chats",
        title: "PlayReal | Чаты",
        description:
          "Общайтесь напрямую с нашими бустерами в чате! Получите ответы на ваши вопросы, обсудите детали заказа и следите за прогрессом вашего буста. Мы гарантируем качественное обслуживание и поддержку на каждом этапе!",
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

export default ChatsPageSEO;
