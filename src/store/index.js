import { createStore } from "vuex";

import coachesModule from "./modules/coaches.js";

const store = createStore({
  modules: { coachesModule },
});

export default store;
