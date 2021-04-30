<template>
  <q-page class="flex flex-center">
    <q-footer elevated>
      <q-toolbar>
        <q-input
          v-model="newMessage"
          bg-color="white"
          class="full-width"
          rounded
          outlined
          label="Message"
          dense>
          

          <template v-slot:after>
            <q-btn round dense flat icon="send" />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
export default {

}
</script>
