<template>
  <section>
    <base-card>
      <h3>{{ selectedCoach.firstName }} {{ selectedCoach.lastName }}</h3>
      <h4>${{ selectedCoach.hourlyRate }}/hour</h4>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in selectedCoach.areas"
        :key="area"
        :type="area"
        :title="area"
        >{{ area }}</base-badge
      >
      <p>{{ selectedCoach.description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    contactLink() {
      return `/coaches/${this.id}/contact`;
    }
  },
  created() {
    this.selectedCoach = this.$store.getters["coachesModule/coaches"].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>