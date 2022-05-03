<template>
  <div class="pa-3">
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          ref="imageRef"
          chips
          prepend-icon="mdi-camera"
          counter
          show-size
          label="Select Image"
          accept="image/*"
          truncate-length="12"
          @change="selectImage"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-4">
        <v-btn
          color="success"
          dark
          small
          @click="upload"
          :loading="loading"
          :key="buttonKey"
        >
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
      <v-dialog v-model="dialog_success" width="500" persistent>
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
      <v-dialog v-model="dialog_fail" width="500" persistent>
        <v-card>
          <v-card-title class="text-h7 grey lighten-2">
            이미지 업로드를 실패하였습니다.
          </v-card-title>
          <v-card-text>
            이미지를 선택하여 다시 시도해 보세요.
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
    <div class="text-center">
      <v-dialog v-model="dialog_relogin" width="500" persistent>
        <v-card>
          <v-card-title class="text-h7 grey lighten-2">
            로그인 페이지 이동
          </v-card-title>
          <v-card-text>
            로그인 하지 않았거나 인증서 만료로 재로그인이 필요합니다.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="relogin">
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
import http from "../http/http"
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
      dialog_relogin: false,
      loading: false,
      buttonKey: 1
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
        if (this.buttonKey == 0 || this.buttonKey > 1) {
          return (this.buttonKey = 1);
        }
        this.message = "이미지가 선택되지 않았습니다.";
        return;
      }
      const fd = new FormData();
      fd.append("image", this.currentImage);
      fd.append("user_uid", this.$store.state.loginstore.userstate[0].user_uid);
      fd.append("nickname", this.$store.state.loginstore.userstate[0].nickname);
      fd.append("gender", this.$store.state.loginstore.userstate[0].gender);
      this.progress = 0;
      await http
        .post("/imageupload", fd, {
          withCredentials: true
        })
        .then((this.loading = true))
        .then(e => {
          this.loading = false;
          this.dialog_success = true;
          this.message = "이미지 업로드 성공";
        })

        .catch(err => {
          if (err.response.status == 403) {
            this.dialog_relogin = true;
          }
          this.$refs.imageRef.reset();
          this.loading = false;
          this.dialog_fail = true;
          this.message = "이미지 업로드 실패" + err;
          // console.log(err.response.status);
        });
    },
    successDialog() {
      this.dialog_success = false;
      this.$router.go(-1);
    },
    failDialog() {
      this.buttonKey++;
      this.currentImage = null;
      this.previewImage = null;
      this.progress = 0;
      this.dialog_fail = false;
    },
    relogin() {
      this.dialog_relogin = false;
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.preview {
  max-width: 200px;
}
</style>
