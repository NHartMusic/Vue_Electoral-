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
      <div v-for="(st, index) in states" :key="index" class="field">
        <label for="state">State:</label>
        <input type="text" name="state" v-model="states[index]" />
        <i class="material-icons delete" @click="deleteState(st)">delete</i>
      </div>
      <div class="field add-state">
        <label for="add-state">
          Add a state and press tab. Click the 'Add Combo' button when you're
          done.
        </label>
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
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddCombo",
  data() {
    return {
      title: null,
      additional: null,
      states: [],
      feedback: null,
      slug: null,
    };
  },
  methods: {
    AddCombo() {
      if (this.title) {
        this.feedback = null;
        //create slug

        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection("combos")
          .add({
            title: this.title,
            states: this.states,
            slug: this.slug,
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a title for this combination of states";
      }
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
    deleteState(st) {
      this.states = this.states.filter((state) => {
        return state != st;
      });
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
  position: relative;
}

.add-combo .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>