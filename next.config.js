module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/ramadan',
        destination: '/campaigns/ramadhan',
        permanent: true,
      },
      {
        source: '/ramadhan',
        destination: '/campaigns/ramadhan',
        permanent: true,
      },
      {
        source: '/campaigns/ramadan',
        destination: '/campaigns/ramadhan',
        permanent: true,
      },
    ]
  },
}
