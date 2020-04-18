<template>
  <div>
    <b-col>
      <b-card
        :title="item.name"
        :sub-title="item.name_official"
        :img-src= "`https://flagpedia.net/data/flags/normal/${item.code2l.toLowerCase()}.png`"
        :img-alt="item.name"
        img-height="150"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >    
        <b-list-group flush>
          <b-list-group-item>latitude : {{item.latitude}}</b-list-group-item>
          <b-list-group-item>longitude: {{item.longitude}}</b-list-group-item>
          <b-list-group-item>ISO alpha-2: {{item.code2l}}</b-list-group-item>
          <b-list-group-item>ISO alpha-3: {{item.code3l}}</b-list-group-item>
        </b-list-group>

        <!-- 
        <b-button
          v-b-tooltip.hover
          title="Tooltip content"
          v-b-modal="modalId"
          variant="primary"
          >Go somewhere</b-button
        >
        <b-modal :id="modalId" title="BootstrapVue">
          <p class="my-4">Hello from modal!</p>
        </b-modal> -->
      </b-card>
    </b-col>
  </div>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    modalId() {
      return `modal-${this.id}`;
    }
  }
};
</script>

<style scoped></style>