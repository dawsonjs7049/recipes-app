/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['themealdb.com', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
