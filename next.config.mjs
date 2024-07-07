/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
