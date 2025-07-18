import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const nextConfig: NextConfig = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: false, // Geliştirme modunda da aktif olsun
  },
});

export default nextConfig;
