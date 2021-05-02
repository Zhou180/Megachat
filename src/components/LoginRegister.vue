<template>
 <q-form @submit="submitForm">
   <q-input
     v-if="tab == 'register'"
     filled
     outlined
     class="q-mb-md"
     v-model="formData.name"
     label="Name"
   />

   <q-input
     filled
     v-model="formData.email"
     class="q-mb-md"
     type="email"
     label="Email"
   />

   <q-input
     filled
     v-model="formData.password"
     class="q-mb-md"
     type="password"
     label="Password"
   />

   <q-btn
    class="float-right"
    color="primary"
    type="submit"
    :label="tab"
   />

 </q-form>
</template>

<script>
import {
  mapActions
} from "vuex"


export default {
  props: ['tab'],
  data(){
    return {
      formData: {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    ...mapActions("store",['registerUser','loginUser']),
    submitForm() {
      if (this.tab == 'login'){
         this.loginUser(this.formData)
      }
      else{
        this.registerUser(this.formData)
      }
    }
  }
}
</script>

<style scoped>

</style>
