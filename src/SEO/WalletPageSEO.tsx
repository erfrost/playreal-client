import { NextSeo } from "next-seo";

const WalletPageSEO = () => {
  return (
    <NextSeo
      title="PlayReal | Кошелёк"
      description="Управляйте своими финансами. Следите за балансом, просматривайте историю транзакций. Все ваши финансовые операции под контролем — просто, безопасно и быстро!"
      canonical="https://yourwebsite.com/wallet"
      openGraph={{
        url: "https://yourwebsite.com/wallet",
        title: "PlayReal | Кошелёк",
        description:
          "Управляйте своими финансами. Следите за балансом, просматривайте историю транзакций. Все ваши финансовые операции под контролем — просто, безопасно и быстро!",
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

export default WalletPageSEO;
