<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData" />
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../components/CoachForm.vue";

export default {
  components: { CoachForm },
  methods: {
    saveData(data) {
      this.$store.dispatch("coachesModule/registerCoach", data);
      this.$router.replace("/coaches");
      // `replace` is similar to `push` but precludes user from going back to prior route, appropriate here because you don't want the user to go back to the form post submission
    },
  },
};
</script>
