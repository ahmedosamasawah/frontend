/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["files-rayan-taqaddi.s3.amazonaws.com"],
  },
};

export default nextConfig;
