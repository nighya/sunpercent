<template>
  <div class="pa-3">
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          chips
          prepend-icon="mdi-camera"
          counter
          show-size
          label="Select Image"
          accept="image/*"
          truncate-length="15"
          @change="selectImage" 
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-4">
        <v-btn color="success" dark small @click.once="upload" :loading="loading">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="progress">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <div v-if="previewImage">
      <div>
        <img class="preview my-3" :src="previewImage" alt="" />
      </div>
    </div>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>

    <v-card v-if="imageInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>List of Images</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(image, index) in imageInfos" :key="index">
            <a :href="image.url">{{ image.name }}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <div class="text-center">
      <v-dialog v-model="dialog_success" width="500">
        <v-card>
          <v-card-title class="text-h7 grey lighten-2">
            이미지가 업로드 되었습니다.
          </v-card-title>
          <v-card-text>
            게시물 확인은 닉네임으로 검색해 보세요. 이전페이지로 이동합니다.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="successDialog">
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog_fail" width="500">
        <v-card>
          <v-card-title class="text-h7 grey lighten-2">
            이미지 업로드를 실패하였습니다.
          </v-card-title>
          <v-card-text>
            이미지를 선택하여 다시 시도해 보세요
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="failDialog">
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ContentUpload",
  data() {
    return {
      currentImage: null,
      previewImage: null,
      progress: 0,
      message: "",
      imageInfos: [],
      dialog_success: false,
      dialog_fail: false,
      loading:false,
    };
  },
  methods: {
    selectImage(image) {
      this.currentImage = image;
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
      this.message = "";
    },
    async upload() {
      if (!this.currentImage) {
        this.message = "이미지가 선택되지 않았습니다.";
        return;
      }
      const fd = new FormData();
      fd.append("image", this.currentImage);
      fd.append("user_uid", this.$store.state.loginstore.userstate[0].user_uid);
      this.progress = 0;
      await axios
        .post("http://192.168.0123.12:4000/imageupload", fd, {
          withCredentials: true
        }).then(this.loading = true)
        .then(e => {
          this.loading = false;
          this.dialog_success = true;
          this.message = "이미지 업로드 성공";
          // this.$router.go(-1)
        })

        .catch(err => {
          this.loading = false;
          this.dialog_fail = true;
          this.message = "이미지 업로드 실패" + err;
        });
    },
    successDialog() {
      this.dialog_success = false;
      this.$router.go(-1);
    },
     async failDialog() {
      this.currentImage = null;
      this.previewImage = null;
      this.progress = 0;
      await this.$router.go()
      this.dialog_fail = false;
    }
  }
};
</script>

<style scoped>
.preview {
  max-width: 200px;
}
</style>
