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
      hisimages: [
        "https://i.wifegeek.com/200426/f9459c52.jpg",
        "https://i.wifegeek.com/200426/5ce1e1c7.jpg",
        "https://i.wifegeek.com/200426/5fa51df3.jpg",
        "https://i.wifegeek.com/200426/663181fe.jpg",
        "https://i.wifegeek.com/200426/2d110780.jpg",
        "https://i.wifegeek.com/200426/e73cd3fa.jpg",
        "https://i.wifegeek.com/200426/15160d6e.jpg",
        "https://i.wifegeek.com/200426/d0c881ae.jpg",
        "https://i.wifegeek.com/200426/a154fc3d.jpg",
        "https://i.wifegeek.com/200426/71d3aa60.jpg",
        "https://i.wifegeek.com/200426/d17ce9a0.jpg",
        "https://i.wifegeek.com/200426/7c4deca9.jpg",
        "https://i.wifegeek.com/200426/64672676.jpg",
        "https://i.wifegeek.com/200426/de6ab9c6.jpg",
        "https://i.wifegeek.com/200426/d8bcb6a7.jpg",
        "https://i.wifegeek.com/200426/4085d03b.jpg",
        "https://i.wifegeek.com/200426/177ef44c.jpg",
        "https://i.wifegeek.com/200426/d74d9040.jpg",
        "https://i.wifegeek.com/200426/81e24a47.jpg",
        "https://i.wifegeek.com/200426/43e2e8bb.jpg"

      ],
    }
  },
   computed: {
     ...mapGetters('store',['images']),

  },
  methods: {
    ...mapActions('store',['firebaseGetMessage',"firebaseStopGetMessage",'firebaseSendMessage','firebaseSendImage']),

  },
  mounted() {
    Object.keys(this.images).forEach(image => {
      this.myimage.push(this.images[image].text)
    })

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
