<template>
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

export default {
  name: "News",
  components: {
    Provider,
  },
  data() {
    return {
      url1: "https://rss.orf.at/news.xml",
      url2: "https://www.diepresse.com/rss/home",
      url3: "https://www.derstandard.at/rss",
      providerList: providerList,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}
body {
  background-color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#providerGrid {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
}
</style>
