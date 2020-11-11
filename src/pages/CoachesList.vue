<template>
  <section>
    <CoachFilter @change-filter="setFilters" />
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach" link to="/register"
          >Register as coach</base-button
        >
      </div>
      <ul v-if="hasCoaches">
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
</template>

<script>
import { mapGetters } from "vuex";
import CoachItem from "../components/CoachItem.vue";
import CoachFilter from "../components/CoachFilter.vue";

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  created() {
    this.loadCoaches()
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    loadCoaches() {
      this.$store.dispatch('coachesModule/loadCoaches')
    }
  },
  computed: {
    isCoach() {
      return this.$store.getters['coachesModule/isCoach']
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coachesModule/coaches"];
      // syntax for accessing getters within namespaced modules
      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
          // returning `true` is analogous to returning `coach`
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      })
    },
    ...mapGetters("coachesModule", ["hasCoaches"]),
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
