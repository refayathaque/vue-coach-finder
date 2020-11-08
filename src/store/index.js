import { createStore } from "vuex";

import coachesModule from "./modules/coaches.js";

const store = createStore({
  modules: { coachesModule },
  state() {
    return {
      userId: 'c3'
    }
  },
  getters: {
    userId({ userId }) {
      return userId;
    }
  }
});

export default store;
