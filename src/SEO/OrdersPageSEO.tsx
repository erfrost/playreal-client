import { NextSeo } from "next-seo";

const OrdersPageSEO = () => {
  return (
    <NextSeo
      title="PlayReal | Заказы"
      description="Принимайте заказы от пользователей, общайтесь с ними для уточнения деталей и обеспечивайте высокий уровень сервиса!"
      canonical="https://yourwebsite.com/orders"
      openGraph={{
        url: "https://yourwebsite.com/orders",
        title: "PlayReal | Чаты",
        description:
          "Принимайте заказы от пользователей, общайтесь с ними для уточнения деталей и обеспечивайте высокий уровень сервиса!",
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

export default OrdersPageSEO;
