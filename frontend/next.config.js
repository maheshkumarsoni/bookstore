/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['images-na.ssl-images-amazon.com'],
  },
  assetPrefix: '/e-commerce'
};

module.exports = nextConfig;
