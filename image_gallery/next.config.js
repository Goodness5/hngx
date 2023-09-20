/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // Add your public variables here
        IMAGES_API_KEY: process.env.IMAGES_API_KEY,
      },
    
}

module.exports = nextConfig
