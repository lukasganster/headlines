<template>
  <div class="header">
    <h2>
      <router-link to="/"><span>Headlines</span></router-link>
      <span class="active">Settings</span>
    </h2>
    <h3 v-if="basicSettings.showDatetime">
      <span class="date">{{ date }}</span>
      <span class="time">{{ time }} Uhr</span>
    </h3>
  </div>

  <div class="section">
    <h2 class="subtitle">Präferenzen ⚙️</h2>

    <div class="settingsSelect">
      <div>
        <input type="checkbox" id="isMinimalmode" v-model="basicSettings.isMinimalmode" />
        <label for="isMinimalmode">Toggle</label>
      </div>
      <span class="settingsIndex">Minimalistische Ansicht der verschiedenen Headlines</span>
    </div>

    <div class="settingsSelect">
      <div>
        <input type="checkbox" id="showDatetime" v-model="basicSettings.showDatetime" />
        <label for="showDatetime">Toggle</label>
      </div>
      <span class="settingsIndex">Datum und Uhrzeit anzeigen</span>
    </div>
  </div>
  <div class="section" id="providerSelectGrid" style="">
    <h2 class="subtitle">
      News-Provider 📰  
    </h2>
    <draggable v-model="providerList" @start="drag = true" @end="drag = false" item-key="id" tag="transition-group"
      :component-data="{ name: 'fade' }">
      <template #item="{ element }">
        <div class="providerSelect">
          <div>
            <input type="checkbox" :id="element.name" v-model="element.selected" />
            <label :for="element.name">Toggle</label>
          </div>
          <span class="providerIndex">
            #{{ element.index > 9 ? element.index : "0" + element.index }}
          </span>
          <img :src="require('@/assets/icons/' + element.logo + '.png')" class="logo" />
          <span class="providerIndex">
            {{ element.name }}
          </span>

          <select v-model="element.maxArticles" style="float: right">
            <option v-for="i in [5, 6, 7, 8, 9, 10, 11]" :key="i">
              {{ i }}
            </option>
          </select>

          <span class="dots">
            ⋮
          </span>
        </div>
      </template>
    </draggable>
  </div>
  <div class="section" style="color: white; padding-bottom: 40px !important">
    <h2 class="subtitle">About 💡</h2>
    <p>
      <b>headlines </b> - Version 1.0.0<br />Made with ❤️ in Austria by
      <a href="https://www.lukasganster.com" style="color: lightblue">lukasganster</a>
    </p>
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
      basicSettings: {
        isMinimalmode: true,
        shuffleProviders: false,
        showDatetime: true,
      },
    };
  },
  watch: {
    providerList: {
      handler: function () {
        this.saveSettings(this.providerList, this.basicSettings);
        this.providerList.map((p, index) => (p.index = index + 1));
      },
      deep: true,
    },
    basicSettings: {
      handler: function () {
        this.saveSettings(this.providerList, this.basicSettings);
      },
      deep: true,
    },
  },
  methods: {
    saveSettings(providerList, basicSettings) {
      let saveObject = providerList.map((p) => {
        return {
          name: p.name,
          index: providerList.indexOf(p) + 1,
          selected: p.selected ? true : false,
          maxArticles: parseInt(p.maxArticles),
        };
      });
      localStorage.setItem("providers", JSON.stringify(saveObject));
      localStorage.setItem("settings", JSON.stringify(basicSettings));
    },
    loadSettings() {
      document.getElementById("app").classList = "midnight";
      let providers = localStorage.getItem("providers");
      if (providers) {
        let selectedProviders = JSON.parse(providers);
        this.providerList.map((p) => {
          selectedProviders.forEach((sP) => {
            if (p.name == sP.name) {
              p.index = sP.index;
              if (sP.selected) p.selected = true;
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

      let basicSettings = localStorage.getItem("settings");
      if (basicSettings) {
        this.basicSettings = JSON.parse(basicSettings);
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
  background: rgb(86, 86, 86);
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

input:checked+label {
  background: #ffb347;
}

input:checked+label:after {
  left: calc(100%);
  transform: translateX(-100%);
}

label:active:after {
  width: 50px;
}

.providerSelect {
  cursor: pointer;
  display: grid;
  margin-bottom: 30px;
  grid-template-columns: 1fr 1fr 1fr 4fr 1fr 1fr;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.providerSelect .dots {
  font-size: 40px;
  color: white;
}

.providerSelect>div {
  display: grid;
}

.providerSelect img {
  max-height: 35px;
  max-width: 180px;
}

.providerIndex {
  display: grid;
  justify-content: left;
  color: white;
  align-items: center;
  text-align: left;
}

#providerSelectGrid {
  padding: 20px 0 30px 0;
}

.section {
  width: 90%;
  margin: 0 auto;
}

select {
  background: white;
  min-height: 40px;
  text-align: center;
}

.settingsSelect {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.settingsSelect div {
  display: grid
}

.settingsIndex {
  color: white;
  text-align: left;
}
</style>
