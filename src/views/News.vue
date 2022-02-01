<template>
  <div class="header">
    <h2>news.site</h2>
    <h3>
      <span class="date">{{ date }}</span>
      <span class="time">{{ time }} Uhr</span>
    </h3>
  </div>
  <div id="providerGrid">
    <Provider
      v-for="provider in providerList"
      :key="provider"
      :rssUrl="provider.rssUrl"
      :maxArticles="provider.maxArticles"
      :logo="provider.logo"
      :country="provider.country"
    />
  </div>
</template>

<script>
import Provider from "../components/Provider.vue";
import providerList from "../providers.json";
const moment = require("moment"); // require
require("moment/locale/de");
moment().locale("de");

export default {
  name: "News",
  components: {
    Provider,
  },
  data() {
    return {
      providerList: providerList,
      date: moment().format("ddd, DD.MM.YYYY"),
      time: moment().format("HH:mm"),
    };
  },
  mounted() {
    setInterval(() => {
      this.timestamp = moment().format("DD.MM.YYYY HH:mm");
    }, 500);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box !important;
}
body {
  height: 100%;
  width: 100vw;
  box-sizing: border-box;
}
#app {
  font-family: "SF UI Display", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-image: linear-gradient(180deg, #1b2128 0%, #2e3439 100%);
}
#providerGrid {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
}
.header {
  padding: 20px 0 40px 0;
}
h2 {
  color: rgb(249, 217, 76);
}
h3 {
  color: white;
}
.date {
  opacity: 0.6;
  margin-right: 10px;
}
</style>
