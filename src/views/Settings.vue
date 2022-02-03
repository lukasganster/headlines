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
    <p style="color: white; margin: 0 auto 20px auto; width: 90%">
      Version 0.0.2.<br />Made with ❤️ in Austria by
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
      this.date = moment().format("ddd, DD.MM.YYYY");
      this.time = moment().format("HH:mm");
    }, 500);
    this.loadSettings();
  },
};
</script>

<style>
input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}
label {
  cursor: pointer;
  text-indent: -9999px;
  width: 70px;
  height: 35px;
  background: grey;
  display: block;
  border-radius: 35px;
  position: relative;
}
label:after {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 35px;
  height: 35px;
  background: #fff;
  border-radius: 35px;
  transition: 0.3s;
}
input:checked + label {
  background: rgb(249, 217, 76);
}
input:checked + label:after {
  left: calc(100%);
  transform: translateX(-100%);
}
label:active:after {
  width: 50px;
}
.providerSelect {
  width: 80%;
  margin: 0 auto;
  display: flex;
  margin-bottom: 20px;
}
.providerSelect img {
  max-height: 35px;
  max-width: 200px;
  margin-left: 30px;
}
#providerSelectGrid {
  padding: 20px 0 40px 0;
}
</style>
