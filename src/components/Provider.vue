<template>
  <div class="provider" >
    <div class="providerInfo" :class="{ isMinimalmode: !isMinimalmode }">
      <img v-if="isMinimalmode" :src="require('@/assets/icons/' + logo + '.png')" class="providerLogo" />
      <span v-if="isMinimalmode" class="providerName">{{ name }}</span>
      <img v-if="!isMinimalmode" :src="require('@/assets/img/' + logo + '.jpg')" class="providerLogo" />
      <img :src="require('@/assets/img/' + country + '.png')" class="providerCountry" />
    </div>
    <ul>
      <li v-for="article in articles" :key="article" class="article"
        :class="{ minimalArticle: isMinimalmode, isPremium: article.isPremium }" @click="openLink(article)">
        <span class="title" :class="{ hasOpened: article.hasOpened }">{{
          article.title
        }}</span>
        <span class="time">{{ article.dateFormatted }}</span>
      </li>
      <img v-if="!articles" :src="require('@/assets/img/loading.webp')"
        style="max-width: 80%; margin: 50px auto 0 auto" />
    </ul>
  </div>
</template>

<script>
const moment = require("moment"); // require
const axios = require("axios");

export default {
  name: "Provider",
  data() {
    return {
      articles: null,
      API_URL: "https://www.lukasganster.com/projects/Api/news.php?rssUrl=",
    };
  },
  props: {
    rssUrl: {
      type: String,
      require: true,
    },
    maxArticles: {
      type: Number,
      default: 10,
    },
    logo: { type: String },
    name: { type: String },
    country: { type: String },
    isMinimalmode: { type: Boolean },
  },
  async mounted() {
    await this.getRss();
  },
  methods: {
    async getRss() {
      axios({
        url: this.API_URL + this.rssUrl,
        method: "get",
      })
        .then((response) => {
          return response.data;
        })
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => {
          const items = data.querySelectorAll("item");
          this.articles = this.getArticles(items, this.maxArticles);
        });
    },
    getArticle(item) {
      let title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const dateString = item.querySelector("pubDate")?.textContent
        ?? item.querySelector("date")?.textContent;
      const date = dateString ? moment(dateString) : "";
      const dateFormatted = date ? date.format("HH:mm") : "";
      let isPremium = false;
      if (title.includes("premium")) {
        title = title.replace("[premium]", "");
        isPremium = true;
      }

      return {
        title,
        link,
        dateString,
        dateFormatted,
        date,
        isPremium
      };
    },
    getArticles(items, max = 10) {
      items = Array.from(items).slice(0, max);
      let articles = [];
      items.forEach((item) => {
        let article = this.getArticle(item);
        articles.push(article);
      });
      return articles;
    },
    openLink(article) {
      article.hasOpened = true;
      window.open(article.link, "_blank");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.provider {
  display: inline-block;
  scroll-snap-align: start;
  margin: 0 50px;
  box-sizing: border-box;
  height: 100%;
}

ul {
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}

.article {
  background: rgba(212, 212, 212, 0.081);
  cursor: pointer;
  display: grid;
  grid-template-columns: 20px 1fr 30px;
  text-align: left;
  position: relative;
  border-bottom: 1px solid #e7e7e7;
  padding: 10px 7px;
  transition: 0.2s linear;
  color: white;
  font-family: 'SF UI Text', sans-serif;
  align-items: center;
}

.minimalArticle {
  border-bottom: none;
  margin-bottom: 15px;
  padding-left: 10px;
  grid-template-columns: 1fr;
  border-left: white 2px solid;
}

.minimalArticle::before,
.minimalArticle>.time {
  display: none;
}

.article:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.article::before {
  content: "‣";
  padding: 0 5px;
}

.title {
  text-align: left;
}

.hasOpened {
  opacity: 0.4;
}

.hasOpened::after {
  content: " ☑️";
  color: red;
}

.time {
  transform: scale(0.5);
}

.providerInfo {
  display: grid;
  padding: 0 20px;
  grid-template-columns: 50px auto 40px;
  align-items: center;
}

.isMinimalmode {
  grid-template-columns: auto 40px !important;
  justify-content: space-between;
}

.providerName {
  color: white;
  text-align: left;
  font-weight: 700;
  font-size: 1.3em;
}

.providerLogo,
.providerCountry {
  max-height: 40px;
}

li.article.minimalArticle.isPremium {
  border-right: 2px dotted #ffc538;
}
</style>
