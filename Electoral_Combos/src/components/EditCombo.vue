<template>
  <div v-if="combo" class="edit-combo container">
    <h2>Edit the '{{ combo.title }}' Electoral Combo</h2>
    <form @submit.prevent="EditCombo">
      <div class="field">
        <label for="title">Combo Title:</label>
        <input type="text" name="title" v-model="combo.title" />
      </div>
      <div v-for="(st, index) in combo.states" :key="index" class="field">
        <label for="state">State:</label>
        <input type="text" name="state" v-model="combo.states[index]" />
        <i class="material-icons delete" @click="deleteState(st)">delete</i>
      </div>
      <div class="field edit-state">
        <label for="edit-state">
          Edit the name of any state, or delete them. To add a new state, enter
          the name and press tab. Click the 'Save' button when you are complete.
        </label>
        <input
          type="text"
          name="edit-state"
          @keydown.tab.prevent="addState"
          v-model="additional"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn red">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditCombo",
  data() {
    return {
      combo: null,
      additional: null,
      feedback: null,
    };
  },
  methods: {
    EditCombo() {
      if (this.combo.title) {
        this.feedback = null;
        //create slug

        this.combo.slug = slugify(this.combo.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection("combos")
          .doc(this.combo.id)
          .update({
            title: this.combo.title,
            states: this.combo.states,
            slug: this.combo.slug,
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
        this.combo.states.push(this.additional);
        this.additional = null;
        this.feedback = null;
      } else {
        this.feedback = "Enter a state and press tab";
      }
    },
    deleteState(st) {
      this.combo.states = this.combo.states.filter((state) => {
        return state != st;
      });
    },
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
.edit-combo {
  margin-top: 60px;
  pediting: 20px;
  max-width: 500px;
}
.edit-combo h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-combo .field {
  margin: 20px auto;
  position: relative;
}

.edit-combo .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>