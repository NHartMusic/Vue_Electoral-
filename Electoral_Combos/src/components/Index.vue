<template>
  <div class="index container">
    <div class="card" v-for="combo in combos" :key="combo.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deletecombo(combo.id)"
          >delete</i
        >
        <h3 class="indigo-text">
          {{ combo.title }}
        </h3>
        <ul class="states">
          <li v-for="(state, index) in combo.states" :key="index">
            <span class="chip"> {{ state }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      combos: [],
    };
  },
  methods: {
    deletecombo(id) {
      //delete doc from firestore
      db.collection("combos")
        .doc(id)
        .delete()
        .then(() => {
          this.combos = this.combos.filter((combo) => {
            return combo.id != id;
          });
        });
    },
  },
  created() {
    db.collection("combos")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let combo = doc.data();
          combo.id = doc.id;
          this.combos.push(combo);
        });
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h3 {
  font-size: 1.6em;
  text-align: center;
  margin-top: 0;
}

.index .states {
  margin: 30px;
}

.index .states li {
  display: inline-block;
}

.card {
  padding: 10px;
}

.index .delete {
  position: absolute;
  top: 6px;
  right: 6px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
