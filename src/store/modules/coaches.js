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
      state.coaches.push(payload);
      console.log(state);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
  },
  actions: {
    async registerCoach(context, data) {
      const userId = context.rootGetters.userId;
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
      };
      const response = await fetch(
        `https://vue-coach-finder-1004b.firebaseio.com/coaches/${userId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(coachData),
        }
      );
      // const responseData = await response.json()
      if (!response.ok) {
        // const error = new Error(responseData.message || "Failed to fetch!");
        // throw error;
      }
      context.commit("registerCoach", {
        ...coachData,
        id: userId,
      });
    },
    async loadCoaches(context) {
      const response = await fetch(
        `https://vue-coach-finder-1004b.firebaseio.com/coaches/.json`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }
      let coaches = [];
      for (const key in responseData) {
        // https://www.w3schools.com/jsref/jsref_forin.asp The for/in statement loops through the properties of an object. The block of code inside the loop will be executed once for each property.
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        coaches.push(coach);
      }
      context.commit("setCoaches", coaches);
    },
  },
  getters: {
    coaches({ coaches }) {
      return coaches;
    },
    hasCoaches({ coaches }) {
      return coaches && coaches.length > 0;
    },
    // isCoach(state, getters, rootState, rootGetters) {
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some((coach) => coach.id === userId);
    },
  },
};
