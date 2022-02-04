module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/projects/headlines" : "/",
  pwa: {
    name: "Headlines",
    themeColor: "#1b2128",
    display: "fullscreen",
  },
};
