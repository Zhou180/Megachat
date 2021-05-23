<template>
<div >
  <ul v-viewer="{movable: false}">
    <li v-for="(image,key) in images">
      <img :src="image.text"  :key="key" >
    </li>
    <li></li>
  </ul>

</div>


</template>


<script>
import {mapActions, mapGetters} from 'vuex'
import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)



export default {
  data () {
    return {
      myimage: [],
    }
  },
   computed: {
     ...mapGetters('store',['images']),

  },
  methods: {
    ...mapActions('store',['firebaseGetMessage',"firebaseStopGetMessage",'firebaseSendMessage','firebaseSendImage']),

  },
  mounted() {
    this.firebaseGetMessage(this.$route.params.otherUserID)
    Object.keys(this.images).forEach(image => {
      this.myimage.push(this.images[image].text)
    })

  },
  destroyed() {
    this.firebaseStopGetMessage()
  }

}
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding:0;

}

li {
  height: 40vh;
  flex-grow: 1;

}

li:last-child {
// There's no science in using "10" here. In all my testing, this delivered the best results.
flex-grow: 5;
}

img {
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
}

// ADVANCED

// Portrait

@media (max-aspect-ratio: 1/1) {
  li {
    height: 30vh;
  }
}

// Short screens

@media (max-height: 480px) {
  li {
    height: 80vh;
  }
}

// Smaller screens in portrait

@media (max-aspect-ratio: 1/1) and (max-width: 480px) {
  ul {
    flex-direction: row;
  }

  li {
    height: auto;
    width: 100%;
  }
  img {
    width: 100%;
    max-height: 75vh;
    min-width: 0;
  }
}
</style>
