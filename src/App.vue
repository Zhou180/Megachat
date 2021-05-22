<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import  {mapActions} from 'vuex'
import Viewer from 'v-viewer'
import Vue from 'vue'

export default {
  name: 'App',
  methods: {
    ...mapActions('store',['handleAuthStateChange']),

  },
  mounted() {
    this.handleAuthStateChange()
  }


}
</script>
