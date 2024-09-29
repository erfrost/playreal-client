import { NextSeo } from "next-seo";

interface Props {
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  gameName: string;
}
const ServiceItemPageSEO = ({
  serviceId,
  serviceName,
  serviceImage,
  gameName,
}: Props) => {
  return (
    <NextSeo
      title={`PlayReal | ${serviceName}`}
      description={`Улучшите свой аккаунт в ${gameName} с помощью наших профессиональных услуг по бустингу. Достигайте новых высот, повышая MMR и достигая игровых целей с опытными бустерами!`}
      canonical={`https://yourwebsite.com/service/${serviceId}`}
      openGraph={{
        url: `https://yourwebsite.com/service/${serviceId}`,
        title: `PlayReal | ${serviceName}`,
        description: `Откройте для себя наши специализированные услуги по бустингу в ${gameName}. Мы предлагаем профессиональные решения, которые помогут вам повысить уровень аккаунта, улучшить рейтинг и достичь игровых целей. Доверьтесь нашим опытным бустерам и наслаждайтесь игрой без лишних забот!`,
        images: [
          {
            url: serviceImage,
            width: 800,
            height: 600,
            alt: "Изображение услуги",
          },
        ],
        site_name: "PlayReal",
      }}
    />
  );
};

export default ServiceItemPageSEO;
