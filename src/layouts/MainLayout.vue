<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-orange-5 text-white">
        <q-btn
          v-if="backvisible()"
          v-go-back.single
          color="amber"
          icon="arrow_back"
          label="back"
        />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn
          v-if="!userDetails.userID"
          to="/auth"
          class=" q-pr-sm absolute-right"
          icon="account_circle"
          label="Login"
          no-caps
          flat
          dense
        />
        <q-btn
          v-else
          @click="logoutUser"
          class="q-pr-sm absolute-right"
          icon="account_circle"
          no-caps
          flat
          dense
        >
          Logout<br>
          {{userDetails.name}}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {
  mapState,
  mapActions,
} from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details'


export default {
  name: 'MainLayout',
  mixins: [mixinOtherUserDetails],
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  computed: {
    ...mapState('store',['userDetails']),
    title() {
      let currentpath = this.$route.fullPath
      if (currentpath=='/') return 'mega'
      else  if (currentpath.includes('/chat')) return this.otherUserDetails.name
      else  if (currentpath == '/auth') return 'Auth'
      else if (currentpath == '/addfile') return 'Addfiles'

    }
  },
  methods: {
    ...mapActions("store",['logoutUser']),
    backvisible() {
      if(this.$route.fullPath.includes('/chat') || this.$route.fullPath.includes('/addfile')||this.$route.fullPath.includes('/album')){
        return true
      }else{
        return false
      }
    }
  }
}
</script>
<style lang="stylus">
  .q-toolbar
    .q-btn
      line-height: 1.2

</style>
