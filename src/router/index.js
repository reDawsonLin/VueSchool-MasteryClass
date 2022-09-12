import { createRouter, createWebHistory } from "vue-router";
import PageHome from "@/pages/Home.vue";
import sourceData from "@/data.json";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: PageHome,
    },
    {
      path: "/me",
      name: "Profile",
      component: () => import("@/pages/Profile.vue"),
    },
    {
      path: "/category/:id",
      name: "category",
      component: () => import("@/pages/Category.vue"),
      props: true,
    },
    {
      path: "/forum/:id",
      name: "forum",
      component: () => import("@/pages/Forum.vue"),
      props: true,
      // beforeEnter(to, from, next) {
      //   // check if thread exists
      //   const threadExists = sourceData.threads.find(
      //     (thread) => thread.id === to.params.id
      //   );
      //   // if exists continue
      //   if (threadExists) {
      //     next();
      //   } else {
      //     next({
      //       name: "NotFound",
      //       params: { pathMatch: to.path.substring(1).split("/") },
      //       query: to.query,
      //       hash: to.hash,
      //     });
      //   }
      //   // if doesn't exist redirect to not found
      // },
    },
    {
      path: "/thread/:id",
      name: "threadShow",
      component: () => import("@/pages/ThreadShow.vue"),
      props: true,
      beforeEnter(to, from, next) {
        // check if thread exists
        const threadExists = sourceData.threads.find(
          (thread) => thread.id === to.params.id
        );
        // if exists continue
        if (threadExists) {
          next();
        } else {
          next({
            name: "NotFound",
            params: { pathMatch: to.path.substring(1).split("/") },
            query: to.query,
            hash: to.hash,
          });
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/pages/NotFound.vue"),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
