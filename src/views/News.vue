<template>
  <div id="providerGrid">
    <Provider v-bind:rssUrl="url1" :maxArticles="10" />
    <Provider v-bind:rssUrl="url2" :maxArticles="10" />
    <Provider v-bind:rssUrl="url3" :maxArticles="10" />
  </div>
</template>

<script>
import Provider from "../components/Provider.vue";

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
}
</style>
