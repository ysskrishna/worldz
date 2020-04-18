<template>
  <div>
    <b-container>
      <b-row align-v="center">
        <CardItem v-for="item in display" :key="item.id" v-bind:item="item" />
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        @input="paginate(currentPage)"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CardItem from "../components/CardItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    CardItem
  },
  computed: {
    ...mapGetters(["rows", "countries", "display"])
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("fetchCountries");
    },
    async paginate(currentPage) {
      await this.$store.dispatch("paginate", {
        currentPage,
        perPage: this.perPage
      });
    }
  }
};
</script>
