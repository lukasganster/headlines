<template>
  <div class="provider">
    <ul>
      <li
        v-for="article in articles"
        :key="article"
        class="article"
        @click="openLink(article)"
      >
        <span class="title">{{ article.title }}</span>
        <span class="date">{{ article.dateFormatted }} Uhr</span>
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
  },
  async mounted() {
    await this.getRss();
    console.log(process.env.BASE_URL);
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
      console.log(article);
      window.open(article.link, "_blank");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.provider {
  margin: 30px 0;
  background: lightblue;
  display: inline-block;
  scroll-snap-align: start;
}
ul {
  width: 100vw;
  margin: 10px;
  padding: 0px;
}
.article {
  cursor: pointer;
  display: block;
  text-align: left;
  position: relative;
  border-bottom: 1px solid #e7e7e7;
  padding: 10px 0;
  transition: 0.2s linear;
}
.article:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.article::before {
  content: "-";
  padding: 0 5px;
}
.title {
  text-align: left;
}
.date {
  position: absolute;
  transform: scale(0.5);
  right: 0;
}
</style>
