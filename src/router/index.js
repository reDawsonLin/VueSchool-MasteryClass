import { createRouter, createWebHistory } from "vue-router";
import PageHome from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";
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
      component: Profile,
      meta: { toTop: true, smoothScroll: true },
    },
    {
      path: "/me/edit",
      name: "ProfileEdit",
      component: Profile,
      props: { edit: true },
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
      path: "/form/:forumId/thread/create",
      name: "threadCreate",
      component: () => import("@/pages/ThreadCreate.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/pages/NotFound.vue"),
    },
  ],
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = "smooth";
    return scroll;
  },
});

export default router;
