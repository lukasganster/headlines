<template>
  <div class="header">
    <h2>
      <router-link to="/"><span>News</span></router-link>
      <span class="active">Einstellungen</span>
    </h2>
    <h3>
      <span class="date">{{ date }}</span>
      <span class="time">{{ time }} Uhr</span>
    </h3>
  </div>
  <div>
    <p style="color: white">
      Version 0.0.1. Made with ❤️ in Austria by
      <a href="https://www.lukasganster.com" style="color: lightblue"
        >lukasganster</a
      >
    </p>
  </div>
  <div id="providerSelectGrid">
    <div
      v-for="provider in providerList"
      :key="provider"
      class="providerSelect"
    >
      <input type="checkbox" :id="provider.name" v-model="provider.selected" />
      <label :for="provider.name">Toggle</label>
      <img :src="require('@/assets/img/' + provider.logo)" class="logo" />
    </div>
  </div>
</template>

<script>
import providerList from "../providers.json";
const moment = require("moment"); // require
require("moment/locale/de");
moment().locale("de");

export default {
  name: "Settings",
  components: {},
  data() {
    return {
      providerList: providerList,
      date: moment().format("ddd, DD.MM.YYYY"),
      time: moment().format("HH:mm"),
    };
  },
  watch: {
    providerList: {
      handler: function () {
        this.saveSettings(this.providerList);
      },
      deep: true,
    },
  },
  methods: {
    saveSettings(providerList) {
      let saveObject = providerList.map((p) => {
        return {
          name: p.name,
          selected: p.selected ? true : false,
        };
      });
      localStorage.setItem("providers", JSON.stringify(saveObject));
    },
    loadSettings() {
      let settings = localStorage.getItem("providers");
      if (settings) {
        settings = JSON.parse(settings);
        let selectedProviders = settings.filter((p) => p.selected);
        console.log(selectedProviders);
        this.providerList.forEach((p) => {
          selectedProviders.forEach((sP) => {
            if (p.name == sP.name) p.selected = true;
          });
        });
      } else {
        console.log("No settings found");
        this.providerList.map((p) => (p.selected = true));
      }
    },
  },
  mounted() {
    setInterval(() => {
      this.timestamp = moment().format("DD.MM.YYYY HH:mm");
    }, 500);
    this.loadSettings();
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
  overflow: hidden;
  height: 100vh;
}
.header {
  padding: 20px 0 40px 0;
}
h2 span.active {
  color: rgb(249, 217, 76);
  font-weight: 700;
  border-bottom: 2px solid #fad94c;
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
input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}
label {
  cursor: pointer;
  text-indent: -9999px;
  width: 100px;
  height: 50px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
}
label:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}
input:checked + label {
  background: rgb(249, 217, 76);
}
input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}
label:active:after {
  width: 100px;
}
.providerSelect {
  width: 90%;
  margin: 0 auto;
  display: flex;
  margin-bottom: 20px;
}
.providerSelect img {
  max-height: 50px;
  max-width: 200px;
  margin-left: 30px;
}
</style>
