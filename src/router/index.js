import { createRouter, createWebHistory } from "vue-router";
import News from "../views/News.vue";
import Settings from "../views/Settings.vue";

const routes = [
  {
    path: "/",
    name: "News",
    component: News,
  },
  {
    path: "/settings",
    name: "Einstellungen",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
