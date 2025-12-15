/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "ugc.production.linktr.ee",
    },
    {
      protocol: "https",
      hostname: "ghchart.rshah.org",
    },
    {
      protocol: "https",
      hostname: "mishalturkane.xyz",
    },
  ],
},

  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'vault.mishalturkane.xyz',
          },
        ],
        destination: 'https://vault.mishalturkane.xyz',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
