import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from "./pages/CoachDetail.vue";
import CoachesList from "./pages/CoachesList.vue";
import CoachRegistration from "./pages/CoachRegistration.vue";
import ContactCoach from "./pages/ContactCoach.vue";
import NotFound from "./pages/NotFound.vue";
import RequestsReceived from "./pages/RequestsReceived.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      children: [
        // https://next.router.vuejs.org/guide/essentials/nested-routes.html#nested-routes
        { path: "contact", component: ContactCoach }, // will take the form of `coaches/c2/contact`
      ],
    },
    { path: "/register", component: CoachRegistration },
    { path: "/requests", component: RequestsReceived },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
