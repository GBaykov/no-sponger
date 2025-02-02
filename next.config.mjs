/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/vacancies',
        permanent: true,
      },
    ];
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
};

export default nextConfig;
