/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "images.unsplash.com" },
        { hostname: "lh3.googleusercontent.com" },
        { hostname: "cdn11.bigcommerce.com" },
        ]
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
