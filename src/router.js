import Vue from "vue";
import Home from "./components/views/Home.vue";
import About from "./components/views/About.vue";
import Admin from "./components/views/Admin.vue";
import Overview from "./components/sections/Overview.vue";
import Product from "./components/sections/Product.vue";
import Router from "vue-router";
import { fb } from "./firebaseConfig";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requireAuth: true },
      children: [
        {
          path: "overview",
          name: "overview",
          component: Overview
        },
        {
          path: "product",
          name: "product",
          component: Product
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
