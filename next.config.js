const withMakeswiftInitializer = require("@makeswift/runtime/next/plugin");

const withMakeswift = withMakeswiftInitializer();

module.exports = withMakeswift({
  reactStrictMode: true,
  images: {
    domains: ["s.mkswft.com", "flightcontrol-docs.motif.land", "res.cloudinary.com"],
  },
});
