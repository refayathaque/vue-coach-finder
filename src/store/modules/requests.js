export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
      console.log(state.requests);
    },
  },
  actions: {
    // contactCoach(context, payload) {
    //   const newRequest = {
    //     id: new Date().toISOString(),
    //     coachId: payload.coachId,
    //     email: payload.email,
    //     message: payload.message,
    //   };
    //   context.commit("addRequest", newRequest);
    contactCoach({ commit }, { coachId, email, message }) {
      const newRequest = {
        id: new Date().toISOString(),
        coachId,
        email,
        message,
      };
      commit("addRequest", newRequest);
    },
  },
  getters: {
    // requests({ requests }) {
    //   return requests;
    // },
    // hasRequests(state) {
    //   return state.requests && state.requests.length > 0;
    // },
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
