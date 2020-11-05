import coaches from "../coaches.js";

export default {
  namespaced: true,
  state() {
    return {
      coaches,
    };
  },
  mutations: {},
  actions: {},
  getters: {
    coaches({ coaches }) {
      return coaches;
    },
    hasCoaches({ coaches }) {
      return coaches && coaches.length > 0
    }
  },
};
