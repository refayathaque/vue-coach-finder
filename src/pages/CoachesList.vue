<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <!-- !! converts a string/empty string/null into the respective boolean value -->
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoading" link to="/register"
            >Register as coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
          {{ coach.firstName }}
        </li> -->
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          />
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import CoachItem from "../components/CoachItem.vue";
import CoachFilter from "../components/CoachFilter.vue";

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coachesModule/loadCoaches", {
          forceRefresh: refresh,
        });
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
        // second part of expression is returned if first part is false
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    isCoach() {
      return this.$store.getters["coachesModule/isCoach"];
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coachesModule/coaches"];
      // syntax for accessing getters within namespaced modules
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
          // returning `true` is analogous to returning `coach`
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    // ...mapGetters("coachesModule", ["hasCoaches"]),
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coachesModule/hasCoaches"];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
