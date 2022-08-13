<template>
  <div class="pa-3">
    <div class="ml-1">
      <v-list-item-title class="text-h5">외모점수 사진올리기</v-list-item-title>
      <span style="color:gray"
        >1.이미지크기는 5MB이하 이어야 하며 1장만 가능합니다.<br />2.외모점수는
        작성자만 볼 수 있습니다.<br />3.이미지 업로드시 2포인트 차감되며 각
        게시물당 점수주기나 사진고르기로 1포인트씩 얻을 수 있습니다.</span
      >
    </div>
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
          :rules="rules"
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

    <v-alert v-if="message" border="left" color="grey" outlined dense>
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
          <v-card-title>
            이미지가 업로드 되었습니다.
          </v-card-title>
          <v-card-text class="mt-3">
            게시물 확인은 닉네임으로 검색하거나 내정보에서 볼 수 있습니다.
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
          <v-card-title>
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
import http from "../http/http";
export default {
  name: "ContentUpload",
  data() {
    return {
      rules: [
        files =>
          !files ||
          files.size < 5242880 ||
          "사진 크기는 5MB 초과 할 수 없습니다."
      ],
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
      if (image) {
        this.currentImage = image;
        this.previewImage = URL.createObjectURL(this.currentImage);
        this.progress = 0;
        this.message = "";
      } else {
        this.currentImage = null;
        this.previewImage = null;
      }
    },
    async upload() {
      if (this.$store.state.loginstore.userstate[0].point <= 0) {
        alert(
          "게시물을 업로드 하시려면 포인트 2점이 필요합니다. 다른 게시물에 점수를 주면 포인트를 얻을 수 있습니다."
        );
        this.$router.go();
      } else {
        if (!this.currentImage) {
          if (this.buttonKey == 0 || this.buttonKey > 1) {
            return (this.buttonKey = 1);
          }
          this.message = "이미지가 선택되지 않았습니다.";
          return;
        }
        const fd = new FormData();
        fd.append("image", this.currentImage);
        fd.append(
          "user_uid",
          this.$store.state.loginstore.userstate[0].user_uid
        );
        fd.append(
          "nickname",
          this.$store.state.loginstore.userstate[0].nickname
        );
        fd.append("gender", this.$store.state.loginstore.userstate[0].gender);
        this.progress = 0;
        await http
          .post("/sun/imageupload", fd, {
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
            } else if (err.response.status == 405) {
            } else if (err.response.status == 400) {
              alert(
                "게시물을 업로드 하시려면 포인트 2점이 필요합니다. 다른 게시물에 점수를 주면 포인트를 얻을 수 있습니다."
              );
              this.$router.go();
            }
            this.$refs.imageRef.reset();
            this.loading = false;
            this.dialog_fail = true;
            this.message = "이미지 업로드 실패";
            this.$router.go();
            // console.log(err.response.status);
          });
      }
    },
    successDialog() {
      this.dialog_success = false;
      this.$router.go();
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
