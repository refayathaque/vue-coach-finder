import { createStore } from "vuex";

import coachesModule from "./modules/coaches.js";
import requestsModule from "./modules/requests.js";

const store = createStore({
  modules: { coachesModule, requestsModule },
  state() {
    return {
      userId: "c3",
    };
  },
  getters: {
    userId({ userId }) {
      return userId;
    },
  },
});

export default store;
