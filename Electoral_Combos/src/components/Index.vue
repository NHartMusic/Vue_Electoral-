<template>
  <div class="index container">
    <div class="card" v-for="state in states" :key="state.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteState(state.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ state.title }}</h2>
        <ul class="districts">
          <li v-for="(district, index) in state.keyDistricts" :key="index">
            <span class="chip"> {{ district }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      states: [
        {
          title: "Georgia",
          slug: "georgia",
          electoralVotes: 16,
          keyDistricts: ["Atlanta", "Athens", "Augusta"],
          id: 1,
        },
        {
          title: "Pennsylvania",
          slug: "pennsylvania",
          electoralVotes: 20,
          keyDistricts: ["Erie", "Philadelphia", "Luzerne"],
          id: 2,
        },
        {
          title: "Nevada",
          slug: "nevada",
          electoralVotes: 6,
          keyDistricts: ["Reno", "Clark", "CarsonCity"],
          id: 3,
        },
      ],
    };
  },
  methods: {
    deleteState(id) {
      this.states = this.states.filter((state) => {
        return state.id != id;
      });
    },
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

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .districts {
  margin: 30px;
}

.index .districts li {
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
