<template>
  <div class="mypage pa-6">
    <!-- <v-img
      :src="
        `http://192.168.0.12:4000${this.$store.state.loginstore.userstate[0].profile_image}`
      "
    ></v-img> -->
    <v-avatar color="primary" size="128">
      <v-img
        :src="
          `http://192.168.0.12:4000${this.$store.state.loginstore.userstate[0].profile_image}`
        "
      ></v-img
    ></v-avatar>
    <p @click="show_dialog">프로필사진 수정</p>
    <v-list-item-content>
      <v-list-item-title class="text-h6">
        {{ this.$store.state.loginstore.userstate[0].nickname }}
      </v-list-item-title>
      <v-list-item-subtitle>{{
        this.$store.state.loginstore.userstate[0].email
      }}</v-list-item-subtitle>
    </v-list-item-content>
    <div class="text-center">
      <v-dialog v-model="dialog_profile_image_update" width="500" persistent>
        <v-card>
          <v-card-title class="text-h7 grey lighten-2">
            프로필사진 수정하기
          </v-card-title>
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
            <div v-if="previewImage">
              <div>
                <v-img
                  max-height="210"
                  max-width="360"
                  class="preview pa-3"
                  :src="previewImage"
                  alt=""
                />
              </div>
            </div>
          </v-row>

          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" text @click="cancel">
              취소
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="updataProfile"
              :loading="loading"
              :key="buttonKey"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog_profile_image_update: false,
      currentImage: null,
      previewImage: null,
      imageInfos: [],
      loading: false,
      buttonKey: 1
    };
  },
  methods: {
    // updataProfile() {
    //   let profileImageObj = {
    //     user_uid: this.$store.state.loginstore.userstate[0].user_uid
    //   };
    // },
    cancel() {
      this.dialog_profile_image_update = false;
    },
    show_dialog() {
      this.dialog_profile_image_update = true;
    },
    selectImage(image) {
      this.currentImage = image;
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
      this.message = "";
    },
    async updataProfile() {
      if (!this.currentImage) {
        if (this.buttonKey == 0 || this.buttonKey > 1) {
          return (this.buttonKey = 1);
        }
        this.message = "이미지가 선택되지 않았습니다.";
        return;
      }
      this.progress = 0;

      const obj = {
        image: this.currentImage,
        user_uid: this.$store.state.loginstore.userstate[0].user_uid
      };
      try {
        this.$store.dispatch("loginstore/profile_image_update", obj);
        this.dialog_profile_image_update = false;
      } catch (err) {
        alert(
          "프로필사진 업로드가 실패하였습니다. 다시 로그인하여 시도해주세요."
        );
        this.$refs.imageRef.reset();
        this.loading = false;
        this.message = "이미지 업로드 실패" + err;
        this.dialog_profile_image_update = false;
        // console.log(err.response.status);
      }
    }
  }
};
</script>
