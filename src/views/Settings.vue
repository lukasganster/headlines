<template>
  <div class="header">
    <h2>
      <router-link to="/"><span>Headlines</span></router-link>
      <span class="active">Settings</span>
    </h2>
    <h3>
      <span class="date">{{ date }}</span>
      <span class="time">{{ time }} Uhr</span>
    </h3>
  </div>
  <div>
    <p style="color: white; margin: 0 auto 20px auto; width: 90%">
      Version 0.0.3.<br />Made with ❤️ in Austria by
      <a href="https://www.lukasganster.com" style="color: lightblue"
        >lukasganster</a
      >
    </p>
  </div>
  <div id="providerSelectGrid">
    <draggable
      v-model="providerList"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      tag="transition-group"
      :component-data="{ name: 'fade' }"
    >
      <template #item="{ element }">
        <div class="providerSelect">
          <span class="providerIndex"> #{{ element.index }} </span>
          <div>
            <input
              type="checkbox"
              :id="element.name"
              v-model="element.selected"
            />
            <label :for="element.name">Toggle</label>
          </div>
          <img :src="require('@/assets/img/' + element.logo)" class="logo" />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import providerList from "../providers.json";
const moment = require("moment"); // require
require("moment/locale/de");
moment().locale("de");

export default {
  name: "Settings",
  components: { draggable },
  data() {
    return {
      providerList: providerList,
      date: moment().format("ddd, DD.MM.YYYY"),
      time: moment().format("HH:mm"),
      drag: false,
    };
  },
  watch: {
    providerList: {
      handler: function () {
        this.saveSettings(this.providerList);
        this.providerList.map((p, index) => (p.index = index + 1));
      },
      deep: true,
    },
  },
  methods: {
    saveSettings(providerList) {
      let saveObject = providerList.map((p) => {
        return {
          name: p.name,
          index: providerList.indexOf(p) + 1,
          selected: p.selected ? true : false,
        };
      });
      localStorage.setItem("providers", JSON.stringify(saveObject));
    },
    loadSettings() {
      let settings = localStorage.getItem("providers");
      if (settings) {
        let selectedProviders = JSON.parse(settings);
        this.providerList.map((p) => {
          selectedProviders.forEach((sP) => {
            if (p.name == sP.name) {
              p.index = sP.index;
              p.selected = true;
            }
          });
        });
        this.providerList = this.providerList.sort((a, b) =>
          a.index > b.index ? 1 : -1
        );
      } else {
        console.log("No settings found");
        this.providerList.map((p) => (p.selected = true));
        this.providerList.map((p, index) => (p.index = index + 1));
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
  cursor: pointer;
  width: 90%;
  margin: 0 auto;
  display: flex;
  margin-bottom: 20px;
}
.providerSelect > div {
  display: grid;
}
.providerSelect img {
  max-height: 35px;
  max-width: 200px;
  margin-left: 10px;
}
.providerIndex {
  display: grid;
  justify-content: center;
  color: white;
  align-items: center;
  padding-left: 5px;
  min-width: 50px;
}
#providerSelectGrid {
  padding: 20px 0 40px 0;
}
</style>
