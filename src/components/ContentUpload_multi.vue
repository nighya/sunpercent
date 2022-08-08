<template>
  <div class="pa-3">
    <h3 class="ml-1">multiple</h3>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-form ref="form">
          <v-text-field
            id="제목"
            label="제목을 입력해 주세요."
            name="email"
            prepend-icon="mdi-format-title"
            type="text"
            v-model="title"
            :rules="title_rules"
            :error-messages="email_err_msg"
          ></v-text-field>
          <v-file-input
            chips
            prepend-icon="mdi-camera"
            counter
            show-size
            label="Select Image"
            accept="image/*"
            truncate-length="12"
            @change="selectImage"
            multiple
            :rules="rules"
          ></v-file-input
        >        
        </v-form>
      </v-col>

      <v-col cols="4" class="ma-5"
        align="center" justify="center">
        <v-btn
        class="pa-5"
        align="center" justify="center"
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
      <div v-for="preimage in previewImage" :key="preimage">
        <img class="preview my-3" :src="preimage" alt="" />
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
            게시물 확인은 닉네임으로 검색해 보세요.
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
            이미지 업로드를 실패하였습니다. 이미지 1장당 크기가 5MB 초과하였거나
            이미지 파일이 아닐 수 있습니다.
          </v-card-title>
          <v-card-text>
            이미지를 다시 선택하여 시도해 보세요.
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
      title:null,
      title_rules: [
        value => !!value || "제목을 입력해 주세요.",
        value =>
          (value && value.length <= 50) ||
          "최대 문자의 길이가 50자 이하로 입력하셔야 합니다."
      ],
      rules: [
        files =>
          !files || files.length < 4 || "사진은 최대 3개까지만 가능합니다.",
        files =>
          !files || files.length > 1 || "사진은 최소 2개이상 선택해 주세요."
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
        this.currentImage = [...image];
        this.previewImage = this.currentImage.map(data =>
          URL.createObjectURL(data)
        );
        this.progress = 0;
        this.message = "";
      } else {
        this.currentImage = null;
        this.previewImage = null;
      }
    },
    async upload() {
      const validate = this.$refs.form.validate();
      if (validate) {
        if (this.$store.state.loginstore.userstate[0].point <= 0) {
          alert(
            "게시물을 업로드 하시려면 포인트 2점이 필요합니다. 다른 게시물에 점수를 주면 포인트를 얻을 수 있습니다."
          );
          this.$router.go();
        } else if (!this.currentImage) {
          if (this.buttonKey == 0 || this.buttonKey > 1) {
            return (this.buttonKey = 1);
          }
          this.message = "이미지가 선택되지 않았습니다.";
          return;
        } else {
          if (this.currentImage) {
            const fd = new FormData();
            // fd.append("image", this.currentImage);  //OLD
            //NEW ONE
            for (let index = 0; index < this.currentImage.length; index++) {
              let file = this.currentImage[index];
              fd.append("image", file);
            }
            fd.append(
              "user_uid",
              this.$store.state.loginstore.userstate[0].user_uid
            );
            fd.append(
              "nickname",
              this.$store.state.loginstore.userstate[0].nickname
            );
            fd.append(
              "gender",
              this.$store.state.loginstore.userstate[0].gender
            );
            this.progress = 0;
            await http
              .post("/imageupload_multi", fd, {
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
                this.currentImage = [];
                this.previewImage = [];
                this.loading = false;
                this.dialog_fail = true;
                this.message = "이미지 업로드 실패";
                // console.log(err.response.status);
              });
          }
        }
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
