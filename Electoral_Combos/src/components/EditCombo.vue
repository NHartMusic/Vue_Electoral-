<template>
  <div v-if="combo" class="edit-combo container">
    <h2>Edit the '{{ combo.title }}' Electoral Combo</h2>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "EditCombo",
  data() {
    return {
      combo: null,
    };
  },
  created() {
    let ref = db
      .collection("combos")
      .where("slug", "==", this.$route.params.combo_slug);

    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.combo = doc.data();
        this.combo.id = doc.id;
      });
    });
  },
};
</script>

<style>
</style>