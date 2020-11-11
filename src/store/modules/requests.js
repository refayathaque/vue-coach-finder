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
    setRequests(state, payload) {
      state.requests = payload;
    }
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
    async contactCoach({ commit }, { coachId, email, message }) {
      const newRequest = {
        email,
        message,
      };
      const response = await fetch(
        `https://vue-coach-finder-1004b.firebaseio.com/requests/${coachId}.json`,
        {
          method: "POST",
          body: JSON.stringify(newRequest),
        }
      );
      // ^ example of using backticks - 'template literal'
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to send request."
        );
        throw error;
      }
      newRequest.id = responseData.name;
      newRequest.coachId = coachId;
      commit("addRequest", newRequest);
    },
    async fetchRequests({ rootGetters, commit }) {
      const coachId = rootGetters.userId;
      const response = await fetch(`https://vue-coach-finder-1004b.firebaseio.com/requests/${coachId}.json`)
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to fetch requests."
        );
        throw error;
      }
      let requests = [];
      for (const key in responseData) {
        const request = {
          id: key,
          coachId: coachId,
          email: responseData[key].email,
          message: responseData[key].message
        }
        requests.push(request)
        commit('setRequests', requests)
      }
    }
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
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
