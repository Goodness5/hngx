/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        TMDB_API_KEY: process.env.TMDB_API_KEY,
      },
      images: {
        domains: ['image.tmdb.org'],
      },
}

module.exports = nextConfig
