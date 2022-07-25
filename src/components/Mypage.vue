<template>
  <div class="mypage pa-6" align="center">
    <v-avatar
      tile
      v-if="this.$store.state.loginstore.userstate[0].profile_image == null"
      size="200"
    >
      <v-img contain :src="baseimage"></v-img>
    </v-avatar>
    <v-avatar v-else size="200" tile>
      <v-img
        contain
        :src="
          `http://192.168.0.12:4000${this.$store.state.loginstore.userstate[0].profile_image}`
        "
      ></v-img>
    </v-avatar>
    <p class="pa-1 mt-2">
      <v-row>
        <v-card-text class="mt-2">
          <p>
            {{ this.$store.state.loginstore.userstate[0].email }}
          </p>
          <v-icon
            class="mr-1"
            color="blue darken-3"
            v-if="this.$store.state.loginstore.userstate[0].gender == `male`"
            >mdi-alpha-m-circle-outline</v-icon
          >
          <v-icon
            class="mr-1"
            color="pink"
            v-if="this.$store.state.loginstore.userstate[0].gender == `female`"
            >mdi-alpha-w-circle-outline</v-icon
          >{{ this.$store.state.loginstore.userstate[0].nickname }}

          <v-icon class="mr-1" color="amber lighten-1"
            >mdi-alpha-p-circle</v-icon
          >{{ this.$store.state.loginstore.userstate[0].point }}
        </v-card-text>
      </v-row>
    </p>

    <v-btn color="primary" text @click="show_dialog">프로필사진 수정</v-btn>
    <v-btn color="primary" text @click="deleteProfile">
      기본이미지
    </v-btn>
    <v-btn color="primary" text @click="ChangePassword">비밀번호 변경</v-btn>
    <v-btn color="primary" text @click="moveMynote">쪽지함</v-btn>

    <div class="text-center">
      <v-dialog v-model="dialog_profile_image_update" width="600" persistent>
        <v-card>
          <v-card-title class="grey darken-3">
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
                  contain
                  max-height="310"
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
    <v-divider></v-divider>
    <v-row class="mt-2">
      <span
        class="ml-3"
        v-if="this.$store.state.imagestore.imagemycontentstate[0] == undefined"
        >게시물이 없습니다.</span
      >
      <v-col
        v-for="(data, index) in mycontentGetterslist"
        :key="index"
        class="d-flex child-flex"
        cols="4"
      >
        <!-- <span class="ml-3" >게시물이 없습니다.{{data}}</span> -->
        <v-img
          :src="`http://192.168.0.12:4000/${data.image_path}`"
          :lazy-src="`http://192.168.0.12:4000/${data.image_path}`"
          aspect-ratio="1"
          class="grey lighten-2"
          @click="ContentDetail(data)"
        >
          <span class="white--text">{{ data.score_count }}명</span>

          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import baseimage from "../assets/base_user.png";
export default {
  data() {
    return {
      user_uid: this.$store.state.loginstore.userstate[0].user_uid,
      dialog_profile_image_update: false,
      currentImage: null,
      previewImage: null,
      imageInfos: [],
      loading: false,
      buttonKey: 1,
      baseimage: baseimage
    };
  },
  mounted() {
    this.$store.dispatch("imagestore/mycontentimage", this.user_uid);
  },

  computed: {
    mycontentGetterslist() {
      return this.$store.getters["imagestore/mycontentimagegetters"];
    }
  },
  methods: {
    // updataProfile() {
    //   let profileImageObj = {
    //     user_uid: this.$store.state.loginstore.userstate[0].user_uid
    //   };
    // },
    ChangePassword() {
      this.$router.push("/changepassword");
    },
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
        alert("프로필사진 업로드가 실패하였습니다.");
        this.$refs.imageRef.reset();
        this.loading = false;
        this.message = "이미지 업로드 실패" + err;
        this.dialog_profile_image_update = false;
        // console.log(err.response.status);
      }
    },
    async deleteProfile() {
      const obj = {
        profile_image: this.$store.state.loginstore.userstate[0].profile_image,
        user_uid: this.$store.state.loginstore.userstate[0].user_uid
      };
      try {
        this.$store.dispatch("loginstore/profile_image_delete", obj);
        this.dialog_profile_image_update = false;
      } catch (err) {
        alert("기본이미지로 변경하지 못했습니다.");
        this.$refs.imageRef.reset();
        this.loading = false;
        this.message = "기본이미지로 변경실패" + err;
        this.dialog_profile_image_update = false;
        // console.log(err.response.status);
      }
    },
    ContentDetail(data) {
      this.$router.push({
        name: "ContentDetail",
        params: {
          content_uid: data.content_uid,
          datas: data
        }
      });
    },
    moveMynote() {
      this.$router
        .push(`/MyNote/${this.$store.state.loginstore.userstate[0].user_uid}`)
        .catch(() => true);
    }
  }
};
</script>
