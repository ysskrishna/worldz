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
import axios from "axios";

export default {
  name: "Home",
  components: {
    CardItem
  },
  data() {
    return {
      countries: [],
      display:[],
      currentPage:1,      
      rows:1,
      perPage:10
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(
          "https://raw.githubusercontent.com/cristiroma/countries/master/data/json/countries.json"
        )
        .then(res => {
          this.countries = res.data;
          this.display =  res.data.slice(0, this.perPage);
          this.rows = this.countries.length;
        })
        .catch(err => console.log(err));
    },
    paginate(currentPage){
      console.log(currentPage);
      const start = (currentPage-1)*this.perPage;
      const end = currentPage*this.perPage;
      this.display =  this.countries.slice(start, end);
    }
  }
};
</script>
