/** @type {import('next').NextConfig} */
const nextConfig = {
  // 외부 이미지 사용시 도메인 URL 등록 (Unhandled Runtime Error)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
