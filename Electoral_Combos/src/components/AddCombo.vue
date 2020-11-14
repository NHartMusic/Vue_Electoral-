<template>
  <div class="add-combo container">
    <h2 class="center-align indigo-text">
      Add a new combination of electoral votes from different states
    </h2>
    <form @submit.prevent="AddCombo">
      <div class="field">
        <label for="title">Combo Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="field add-state">
        <label for="add-state">Add a state</label>
        <input
          type="text"
          name="add-state"
          @keydown.tab.prevent="addState"
          v-model="additional"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn red">Add Combo</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddCombo",
  data() {
    return {
      title: null,
      additional: null,
      states: [],
      feedback: null,
    };
  },
  methods: {
    AddCombo() {
      console.log(this.title, this.states);
    },
    addState() {
      if (this.additional) {
        this.states.push(this.additional);
        this.additional = null;
        this.feedback = null;
      } else {
        this.feedback = "Enter a state and press tab";
      }
    },
  },
};
</script>

<style>
.add-combo {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-combo h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-combo .field {
  margin: 20px auto;
}
</style>