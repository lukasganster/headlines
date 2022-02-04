<template class="x">
  <div class="header">
    <h2>
      <router-link to="/"><span class="active">Headlines</span></router-link>
      <router-link to="/settings"><span>Settings</span></router-link>
    </h2>
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
      :name="provider.name"
      :isMinimalmode="basicSettings.isMinimalmode"
      :maxArticles="provider.maxArticles"
      :logo="provider.logo"
      :country="provider.country"
    />
  </div>
  <h2 v-if="providerList.length == 0" style="color: white">
    Du hast aktuell keine Newsanbieter ausgewählt. <br />
    <span style="font-size: 200%">😞</span>
  </h2>
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
      basicSettings: { isMinimalmode: false, shuffleProviders: false },
    };
  },
  mounted() {
    setInterval(() => {
      this.date = moment().format("ddd, DD.MM.YYYY");
      this.time = moment().format("HH:mm");
    }, 500);
    this.loadSettings();
    document.getElementById("app").classList = "midnight";
  },
  methods: {
    loadSettings() {
      let basicSettings = localStorage.getItem("settings");
      if (basicSettings) {
        this.basicSettings = JSON.parse(basicSettings);
      }

      let settings = localStorage.getItem("providers");
      if (settings) {
        settings = JSON.parse(settings);
        let selectedProviders = settings.filter((p) => p.selected);
        let showProviders = [];
        this.providerList.forEach((p) => {
          selectedProviders.forEach((sP) => {
            if (p.name == sP.name) {
              p.index = sP.index;
              showProviders.push(p);
            }
          });
        });
        this.providerList = showProviders.sort((a, b) =>
          a.index > b.index ? 1 : -1
        );
        if (this.basicSettings.shuffleProviders)
          this.providerList = this.providerList.sort(() => 0.5 - Math.random());
      }
    },
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
}
#providerGrid {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
}
@media screen and (max-width: 650px) {
  * ::-webkit-scrollbar {
    width: 10px;
  }
  * ::-webkit-scrollbar-thumb {
    background: rgb(249, 217, 76);
    border-radius: 10px;
    width: 10px;
  }
  *::-webkit-scrollbar-track {
    background: rgba(221, 221, 221, 0.046);
    border-radius: 10px;
  }
}
@media screen and (min-width: 650px) {
  #providerGrid {
    width: 90%;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(400px, auto);
    margin: 0 auto;
    overflow: scroll;
  }
  ul {
    width: auto !important;
  }
  .provider {
    margin: 0 !important;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 10px 5px;
    border-radius: 10px;
  }
}
@media screen and (min-width: 900px) {
  #providerGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.header {
  padding: 20px 0 40px 0;
}
h2 span.active {
  /* background: #1a2a6c; */ /* background: linear-gradient(to right, #ff9966,
#ff5e62); */
  background: -webkit-linear-gradient(to right, #ffb347, #ffcc33);
  background: linear-gradient(to right, #ffb347, #ffcc33);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  border-bottom-width: 3px;
  border-bottom-style: solid;
  border-image: linear-gradient(91deg, #ffb247, #ffca33) 1;
}
h2 span {
  color: rgb(112, 112, 112);
  margin: 0 10px;
  font-weight: 400;
}
h3 {
  margin-top: 10px;
  color: white;
}
.date {
  color: rgb(112, 112, 112);
  margin-right: 10px;
}
</style>
