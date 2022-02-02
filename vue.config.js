module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/projects/News2/" : "/",
  pwa: {
    name: "News",
    themeColor: "#1b2128",
    display: "fullscreen",
  },
};
