<template>
  <div id="app">
    <div class="page" v-if="loading">
      <RotateLoader class="loader" :loading="loading" color="#fff" size="15px"></RotateLoader>
    </div>
    <Header />
    <router-view />
    <div class="footer">
      <div class="footerText">
        <p>Contact Me</p>
        <p>
          <a
            href="https://www.linkedin.com/in/ysskrishna/"
            target="_blank"
            rel="noopener"
          >Linkedin-YSSKRISHNA</a>
          <br />
          <a href="https://gitlab.com/YSSKrishna" target="_blank" rel="noopener">Gitlab-YSSKRISHNA</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./components/layout/Header.vue";
import RotateLoader from "vue-spinner/src/RotateLoader.vue";
export default {
  name: "app",
  computed: {
    ...mapGetters(["loading"])
  },
  components: {
    Header,
    RotateLoader
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.page {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  z-index: 25;
  width: 100%;
  height: 100%;
}
.loader {
  z-index: 26;
  position: relative;
  top: 50%;
}
.footer {
  background: #243238;
  min-height: 20px;
  padding: 20px;
}
.footerText {
  color: aliceblue;
}
</style>
