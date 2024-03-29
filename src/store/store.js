import Vue from 'vue'
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage
} from 'boot/firebase'

let messageRef

const state = {
  userDetails: {},
  users: {},
  messages: {}
}

const mutations = {
  setUserDetails(state,payload) {
    state.userDetails = payload
  },
  addUser(state,payload) {
    Vue.set(state.users,payload.userID,payload.userDetails)
  },
  updateUser(state,payload) {
    Object.assign(state.users[payload.userID],payload.userDetails)
  },
  addMessage(state,payload) {
    Vue.set(state.messages,payload.messageID,payload.messageDetails)
  },
  clearMessages(state,payload) {
    state.messages={}
  },

}

const actions = {

  registerUser({},payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {

        let userID = firebaseAuth.currentUser.uid
        firebaseDB.ref('Users/' + userID ).set({
          name: payload.name,
          email:payload.email,
          online:true
        })
      })
      .catch(error => {
        console.log(error)
      })
  },

  loginUser({},payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log("log in!")
      })
      .catch(error => {
        console.log(error)
      })
  },

  logoutUser({},payload){
    firebaseAuth.signOut()
  },

  handleAuthStateChange({commit,dispatch,state},payload) {
    firebaseAuth.onAuthStateChanged(user=> {
      if(user) {
        //when user log in
        let userID = firebaseAuth.currentUser.uid
        firebaseDB.ref('Users/' + userID).once('value',snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails',{
            name:userDetails.name,
            email:userDetails.email,
            userID:userID
          })
        })
        //switch user to online
        dispatch('firebaseUpdateUser',{
          userID: userID,
          updates: {
            online: true
          }
        })
        //retrieve online poeple
        dispatch('firebaseGetUsers')
        //if log in direct user to main page
        this.$router.push('/')
      }
      else {
        //
        dispatch('firebaseUpdateUser',{
          userID: state.userDetails.userID,
          updates: {
            online: false
          }
        })
        //when user log out
        commit('setUserDetails',{})
        //if log in direct user to login page
        this.$router.push('/auth')
      }
    })
  },

  firebaseUpdateUser({},payload) {
    if(payload.userID){
      firebaseDB.ref('Users/'+payload.userID).update(payload.updates)
    }
  },

  firebaseGetUsers({commit},payload) {
    firebaseDB.ref('Users').on('child_added',snapshot => {
      let userDetails = snapshot.val()
      let userID = snapshot.key
      commit('addUser',{
        userID,
        userDetails
      })
    })

    firebaseDB.ref('Users').on('child_changed',snapshot => {
      let userDetails = snapshot.val()
      let userID = snapshot.key
      commit('updateUser',{
        userID,
        userDetails
      })
    })
  },

  firebaseGetMessage({state,commit},otherUserID){
    let userID = state.userDetails.userID
    messageRef = firebaseDB.ref('Chats/'+userID+'/'+otherUserID)
    messageRef.on('child_added',snapshot =>{
      let messageDetails = snapshot.val()
      let messageID = snapshot.key

      commit('addMessage',{messageID,messageDetails})
    })
  },

  firebaseStopGetMessage({state,commit},otherUserID){
    if(messageRef) {
      messageRef.off('child_added')
      commit('clearMessages')
    }
  },

  firebaseSendMessage({state,commit},payload){

    firebaseDB.ref('Chats/'+state.userDetails.userID+'/'+payload.otherUserID)
      .push(payload.message)

    payload.message.from = 'you'
    firebaseDB.ref('Chats/'+payload.otherUserID+'/'+state.userDetails.userID)
      .push(payload.message)

  },

  firebaseUploadFile({state,commit},payload){
    let userID = state.userDetails.userID

    firebaseStorage.ref(userID + '/' + payload.otherUserID)
      .put(payload.files)
  },

  firebaseSendImage({state,commit},payload){
    let userID = state.userDetails.userID
    let fileName = Math.floor(Date.now() / 1000) +'-'+payload.file.name
    let uploadref = firebaseStorage.ref('images/'+userID+'/'+payload.otherUserID+"/"+fileName)
    let uploadTask = uploadref.put(payload.file,payload.metadata)

    uploadTask.on("state_changed",
      /* 上傳進度 */
      function(snapshot) {
        let progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      },
      /* 錯誤處理 */
      function(error) {
        firebaseDB.ref('Chats/'+state.userDetails.userID+'/'+payload.otherUserID)
          .push({
            type: 'image',
            message: error.code,
            timeStamp: Math.floor(Date.now() / 1000),
            from:'me'
          })
        firebaseDB.ref('Chats/'+state.userDetails.userID+'/'+payload.otherUserID)
          .push({
            type: 'image',
            message: error.code,
            timeStamp: Math.floor(Date.now() / 1000),
            from:'you'
          })
      },
      /* 上傳結束處理 */
      function() {
        var Imagemessage = {
          text: "",
          from: "me",
          type: "image"
        }

        var downloadurl =  uploadref.getDownloadURL()
          .then(function (url) {
            Imagemessage.text = url.toString()
            firebaseDB.ref('Chats/'+state.userDetails.userID+'/'+payload.otherUserID)
              .push(Imagemessage)

            Imagemessage.from = 'you'

            firebaseDB.ref('Chats/'+payload.otherUserID+'/'+state.userDetails.userID)
              .push(Imagemessage)
          })
          .catch(function (err) {
            console.log(err)
          })



      });
  }

}

const getters = {
 users: state => {
   let usersFiltered = {}
   Object.keys(state.users).forEach(key => {
     if(key =='undefined'){
       return;
     }
     if(key !== state.userDetails.userID){
       usersFiltered[key] = state.users[key]
     }
   })
   return usersFiltered
 },
 images: state => {
   let imageMessage = {}
   Object.keys(state.messages).forEach(key => {
     if(state.messages[key].type == 'image'){
       imageMessage[key] = state.messages[key]
     }
   })

   return imageMessage
 }
}


export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
