<template>
  <q-page ref="pageChat" class="flex column">

    <q-banner
      v-if="!otherUserDetails.online"
      inline-actions
      class="text-white
      bg-grey-4
      text-center
      fixed-top">
        {{otherUserDetails.name}} is offline
    </q-banner>

    <div :class="{'invisible' : !showMessages}" class="q-pa-md column col justify-end">
        <q-chat-message
          v-for="(message,key) in messages"
          :name="message.from =='me'? userDetails.name:otherUserDetails.name"
          :key="key"
          :sent="message.from== 'me'? true:false"
        >
          <span v-if="message.type =='text'">{{message.text}}</span>


            <div class="messageBox__image" v-if="message.type =='image'" v-viewer="{movable: false}">
              <img  :src="message.text" class="">
              <q-btn round dense
                     flat
                     icon="download"
                     size="lg"
                     color="bg-orange-5"
                     class="absolute-bottom-right"
                     type="a" :href="message.text"
              >
                <a :href="message.text" class="display:none"></a>
              </q-btn>
            </div>
<!--            <q-btn round dense-->
<!--                   flat-->
<!--                   icon="download"-->
<!--                   size="lg"-->
<!--                   color="bg-orange-5"-->
<!--                   class="on-left"-->
<!--                   type="a" :href="message.text"-->
<!--            >-->
<!--              <a :href="message.text"></a>-->
<!--            </q-btn>-->

        </q-chat-message>

    </div>

    <q-footer elevated >
      <q-toolbar class="bg-orange-5">
        <q-form  class="full-width row-md"  @keyup.enter="sendMessage()">

          <q-input
            ref="keepfocus"
            @blur="scrollToBottom"
            standout="bg-grey-1 text-grey-5"
            v-model="newMessage"
            bg-color="white"
            class="full-width"
            rounded
            outlined
            label="Message"
            dense>
            <input ref="myFileInput" style="display:none" type="file" accept="image/*" @change="sendImage($event)">
<!--            <q-input ref="myFileInput" style="display:none" v-model="file" type="file" ></q-input>-->
            <q-btn rounded outlined flat color="grey-7" icon="add_to_photos" @click="$refs.myFileInput.click()"></q-btn>
            <template v-slot:before>
              <q-btn

                round dense
                flat
                icon="settings"
              >

                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup :to="/album/+$route.params.otherUserID">
                      <q-item-section avatar>
                        <q-icon color="grey-7" name="photo_album" />
                      </q-item-section>
                      <q-item-section>相簿</q-item-section>
                    </q-item>
                    <q-separator />

                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon color="grey-7" name="attachment" />
                      </q-item-section>
                      <q-item-section>連接</q-item-section>
                    </q-item>
                    <q-separator />

                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon color="grey-7" name="folder" />
                      </q-item-section>
                      <q-item-section>檔案</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>

              <q-btn
                :to='routeID'
                round dense
                flat
                icon="upload"
              >
                <q-tooltip>
                  上傳
                </q-tooltip>
              </q-btn>
              <div>
<!--                <q-input ref="myFileInput" style="display:none" v-model="file" type="file" label="Standard" ></q-input>-->
<!--                <q-btn rounded outlined flat color="dark" icon="cloud_upload" @click="getFile"></q-btn>-->
              </div>
            </template>

            <template v-slot:after>
              <q-btn
                @click="sendMessage"
                round dense
                flat
                icon="send"
                />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous">
</script>
<script>
import {mapActions,mapState} from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details'
import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)



export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: '',
      showMessages:false,
      file: []
    }
  },

  computed: {
    ...mapState('store',['messages',"userDetails"]),
    routeID() {
      return "/addfile/" + this.$route.params.otherUserID
    }

  },

  watch: {
    messages: function (val) {
      if(Object.keys(val).length){
        this.scrollToBottom()
        setTimeout(()=> {
          this.showMessages = true
        },20)
      }
    }
  },

  methods: {
    ...mapActions('store',['firebaseGetMessage',"firebaseStopGetMessage",'firebaseSendMessage','firebaseSendImage']),
    imgclick(type,text){
      if(type == "text") return ['fuckyou']
    },
    scrollToBottom(){
      let pageChat = this.$refs.pageChat.$el
      setTimeout(()=> {
        window.scrollTo(0,pageChat.scrollHeight)
      },20)
    },

    sendMessage() {
      this.firebaseSendMessage({
        message:{
          text: this.newMessage,
          from:"me",
          type:"text"
        },
        otherUserID:this.$route.params.otherUserID
      })
      this.newMessage=""
      this.$refs.keepfocus.focus()
    },


    sendImage(e) {
      const file = e.target.files[0]
      const metadata = {
        contentType: 'image/*'
      };
      // console.log(file)
      this.firebaseSendImage({
        file,
        otherUserID:this.$route.params.otherUserID,
        metadata
      })
      this.$refs.keepfocus.focus()
    }
  },

  mounted() {
    this.firebaseGetMessage(this.$route.params.otherUserID)
  },

  destroyed() {
    this.firebaseStopGetMessage()
  }
}
</script>
<style lang="stylus">

  .platform-ios
    .q-header
      .q-btn,.q-toolbar＿title
        padding-top  constant(safe-area-inset-top)
        padding-top  env(safe-area-inset-top)

  .q-banner
    top 65px
    z-index 1
    opacity 0.7
  .q-message
    z-index 1

  .input-file
    &__input
      visibility: hidden;
    &__button
      background-color: red;
      width: 200px;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;

      &:hover
        background-color: #000;
        color: #fff;

  .messageBox__image {
    margin: 5px 25px 5px 5px;
  }
  .messageBox__image img {
    border-radius: 5px;
    max-width: 100%;
    max-height: 335px;
  }

</style>
