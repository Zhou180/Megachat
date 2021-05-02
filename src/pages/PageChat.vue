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
          :text="[message.text]"
          :sent="message.from== 'me'? true:false"
        >
        </q-chat-message>
    </div>

    <q-footer elevated >
      <q-toolbar class="bg-orange-5">
        <q-form  class="full-width"  @keyup.enter="sendMessage">
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

<script>
import {mapActions,mapState} from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details'

export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: '',
      showMessages:false,
    }
  },

  computed: {
    ...mapState('store',['messages',"userDetails"]),

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
    ...mapActions('store',['firebaseGetMessage',"firebaseStopGetMessage",'firebaseSendMessage']),

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
          from:"me"
        },
        otherUserID:this.$route.params.otherUserID
      })
      this.newMessage=""
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
    top 100px
    z-index 2
    opacity 0.7
  .q-message
    z-index 1
</style>
