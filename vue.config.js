module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/projects/News2/" : "/",
  pwa: {
    name: "News",
    themeColor: "#2e3439",
    display: "fullscreen",
  },
};
