/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.discordapp.com",
      "147.45.168.75",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  //
  env: {
    BASE_URL: "http://147.45.168.75:8000/api/",
    BASE_SOCKET_URL: "http://147.45.168.75:8000",
    // BASE_URL: "http://localhost:8000/api/",
    // BASE_SOCKET_URL: "http://localhost:8000",
  },
};

export default nextConfig;
