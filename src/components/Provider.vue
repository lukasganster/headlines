<template>
  <div class="provider">
    <div class="providerImages">
      <img :src="require('@/assets/img/' + logo)" class="logo" />
      <img :src="require('@/assets/img/' + country + '.png')" class="country" />
    </div>
    <ul>
      <li
        v-for="article in articles"
        :key="article"
        class="article"
        @click="openLink(article)"
      >
        <span class="title" :class="{ hasOpened: article.hasOpened }">{{
          article.title
        }}</span>
        <span class="time">{{ article.dateFormatted }}</span>
      </li>
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
      require,
    },
    maxArticles: {
      type: Number,
      default: 10,
    },
    logo: { type: String },
    country: { type: String },
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

          console.log(this.articles);
        });
    },
    getArticle(item) {
      let title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const dateString = item.querySelector("pubDate")
        ? item.querySelector("pubDate").textContent
        : item.querySelector("date").textContent;
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
        isPremium,
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
  font-family: "SF UI Display";
  align-items: center;
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
  opacity: 0.6;
}
.time {
  transform: scale(0.5);
}
.providerImages {
  display: block;
  min-height: 50px;
}
.logo,
.country {
  max-height: 50px;
  margin: 0 20px;
}

.logo {
  float: left;
  max-width: 60%;
}
.country {
  float: right;
}
</style>
