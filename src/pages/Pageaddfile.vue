<template>
  <q-page class="flex">
    <q-uploader
      :firebase-storage="makeUploadTaskWithTimestamp"
      label="Upload"
      multiple
      style="width: 100%"
    >
      <template v-slot:list="scope">
        <q-list separator>

          <q-item v-for="file in scope.files" :key="file.name">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                Status: {{ file.__status }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }}
              </q-item-label>
              <q-item-label caption>
               {{ file.__progressLabel }} / 100%
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>

        </q-list>
      </template>
    </q-uploader>
<!--    <QFirebaseUploader-->
<!--      multiple-->
<!--      style="width: 100%"-->
<!--      :path="'images/'">-->
<!--      <template v-slot:list="scope">-->
<!--        <q-list separator>-->

<!--          <q-item v-for="file in scope.files" :key="file.name">-->
<!--            <q-item-section>-->
<!--              <q-item-label class="full-width ellipsis">-->
<!--                {{ file.name }}-->
<!--              </q-item-label>-->

<!--              <q-item-label caption>-->
<!--                Status: {{ file.__status }}-->
<!--              </q-item-label>-->

<!--              <q-item-label caption>-->
<!--                {{ file.__sizeLabel }}-->
<!--              </q-item-label>-->
<!--              <q-item-label caption>-->
<!--                {{ file.__progressLabel }} / 100%-->
<!--              </q-item-label>-->
<!--            </q-item-section>-->

<!--            <q-item-section-->
<!--              v-if="file.__img"-->
<!--              thumbnail-->
<!--              class="gt-xs"-->
<!--            >-->
<!--              <img :src="file.__img.src">-->
<!--            </q-item-section>-->

<!--            <q-item-section top side>-->
<!--              <q-btn-->
<!--                class="gt-xs"-->
<!--                size="12px"-->
<!--                flat-->
<!--                dense-->
<!--                round-->
<!--                icon="delete"-->
<!--                @click="scope.removeFile(file)"-->
<!--              />-->
<!--            </q-item-section>-->
<!--          </q-item>-->

<!--        </q-list>-->
<!--      </template>-->
<!--    </QFirebaseUploader>-->
  </q-page>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details'
import {
  firebaseStorage
} from 'boot/firebase'
import QFirebaseUploader from 'src/mixins/QFirebaseUploader'

export default {
  mixins: [mixinOtherUserDetails],
  methods: {
    ...mapActions('store',['firebaseUploadFile']),
    makeUploadTaskWithTimestamp (file) {
      const originalName = file.name
      const newFilename = `${Date.now()}.${file.name}`
      const metadata = {
        customMetadata: {
          originalName
        }
      }
      return firebaseStorage.ref('quasar-uploader-test/test').child(newFilename).put(file, metadata)
    }
  },
  components: {
    QFirebaseUploader
  }
}
</script>

<style scoped>

</style>
