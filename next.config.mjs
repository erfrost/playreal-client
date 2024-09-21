/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.discordapp.com",
      "82.97.240.200",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    BASE_URL: "http://82.97.240.200:8000/api/",
    BASE_SOCKET_URL: "http://82.97.240.200:8000",
    // BASE_URL: "http://localhost:8000/api/",
    // BASE_SOCKET_URL: "http://localhost:8000",
  },
};

export default nextConfig;
