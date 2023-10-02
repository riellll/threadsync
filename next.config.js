/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com",  "icon-library.com"],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
