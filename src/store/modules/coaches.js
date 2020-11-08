import coaches from "../coaches.js";

export default {
  namespaced: true,
  state() {
    return {
      coaches,
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload)
      console.log(state)
    }
  },
  actions: {
    registerCoach(context, data) {
      const coachData = {
        id: context.rootGetters.userId,
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
      }
      context.commit('registerCoach', coachData)
    }
  },
  getters: {
    coaches({ coaches }) {
      return coaches;
    },
    hasCoaches({ coaches }) {
      return coaches && coaches.length > 0
    },
    // isCoach(state, getters, rootState, rootGetters) {
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches
      const userId = rootGetters.userId
      return coaches.some(coach => coach.id === userId);
    }
  },
};
