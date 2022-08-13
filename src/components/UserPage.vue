<template>
  <div>
    {{ pre_url_set }}
    <h1 class=" pa-6">Userpage</h1>
    <div class=" pa-6" align="center">
      <v-avatar
        tile
        v-if="
          this.$store.state.imagestore.userprofile[0].profile_image == null ||
            this.$store.state.imagestore.userprofile[0].profile_image ==
              undefined
        "
        size="200"
      >
        <v-img contain :src="baseimage"></v-img>
      </v-avatar>
      <v-avatar v-else size="200" tile>
        <v-img
          contain
          :src="
            `${$httpurl}${this.$store.state.imagestore.userprofile[0].profile_image}`
          "
        ></v-img>
      </v-avatar>
      <p class="pa-1 mt-2">
        <v-row>
          <v-card-text class="mt-2">
            <v-icon
              class="mr-1"
              color="blue darken-3"
              v-if="
                this.$store.state.imagestore.userprofile[0].gender == `male`
              "
              >mdi-alpha-m-circle-outline</v-icon
            >
            <v-icon
              class="mr-1"
              color="pink"
              v-if="
                this.$store.state.imagestore.userprofile[0].gender == `female`
              "
              >mdi-alpha-w-circle-outline</v-icon
            >{{ this.$store.state.imagestore.userprofile[0].nickname }}
          </v-card-text>
        </v-row>
      </p>
    </div>
    <div class="mr-2" align="end">
      <v-btn
        class="mb-2 mr-2"
        text
        color="primary"
        :to="
          `/note/${this.$store.state.imagestore.userprofile[0].nickname}/${this.$store.state.imagestore.userprofile[0].user_uid}`
        "
        >쪽지보내기</v-btn
      >
    </div>

    <v-divider class="ml-6 mr-6"></v-divider>

    <div>
      <!--image-->
      <div class="mt-5">
        <span class="ml-6">외모점수</span>
        <v-row class="pa-6 mt-2">
          <span
            class="ml-3"
            v-if="
              this.$store.state.imagestore.userprofile_image[0].image_path ==
                undefined ||
                this.$store.state.imagestore.userprofile_image[0].image_path ==
                  null
            "
            >게시물이 없습니다.</span
          >

          <v-col
            v-else
            v-for="(data, index) in userProfile_image"
            :key="index"
            class="d-flex child-flex"
            cols="4"
          >
            <v-img
              v-if="data.report_count > 2"
              :src="black_image"
              class="grey--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              aspect-ratio="1"
              @click="ContentDetail(data)"
              ><v-card-text class="font-weight-thin" align="center"
                >신고누적으로<br />이미지차단</v-card-text
              ></v-img
            >
            <v-img
              v-else
              :src="`${$httpurl}${data.image_path}`"
              :lazy-src="`${$httpurl}${data.image_path}`"
              aspect-ratio="1"
              class="grey lighten-2"
              @click="ContentDetail(data)"
            >
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
      <!--multi image-->
      <div class="mt-5">
        <span class="ml-6">사진골라줘</span>
        <v-row class="pa-6 mt-2">
          <span
            class="ml-3"
            v-if="
              this.$store.state.imagestore.userprofile_image_multi[0]
                .image_path == undefined ||
                this.$store.state.imagestore.userprofile_image_multi[0]
                  .image_path == null
            "
            >게시물이 없습니다.</span
          >
          <v-col
            v-else
            v-for="(data, index) in userProfile_image_multi"
            :key="index"
            class="d-flex child-flex"
            cols="4"
          >
            <v-carousel
              cycle
              hide-delimiters
              show-arrows-on-hover
              height="auto"
            >
              <v-carousel-item
                v-for="(item, index) in data.image_path"
                :key="index"
              >
                <v-img
                  v-if="data.report_count > 2"
                  :src="black_image"
                  class="grey--text align-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  aspect-ratio="1"
                  ><v-card-text class="font-weight-thin" align="center"
                    >신고누적으로<br />이미지차단</v-card-text
                  ></v-img
                >
                <v-img
                  v-else
                  aspect-ratio="1"
                  :src="`${$httpurl}${item}`"
                  @click="ContentDetail_multi(data)"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row> </template
                ></v-img>
              </v-carousel-item>
            </v-carousel>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import baseimage from "../assets/base_user.png";
import black_image from "../assets/black.jpg";
import ls from "localstorage-slim";
ls.config.encrypt = true;
export default {
  data() {
    return {
      black_image: black_image,
      baseimage: baseimage,
      nickname: this.$route.params.nickname,
      user_uid: this.$route.params.user_uid
    };
  },
  mounted() {
    const payload = {
      nickname: this.$route.params.nickname,
      user_uid: this.$route.params.user_uid
    };
    this.$store.dispatch("imagestore/userProfile", payload);
    this.$store.dispatch("imagestore/userProfile_image", payload);
  },

  methods: {
    ContentDetail(data) {
      this.$router.push({
        name: "ContentDetail",
        params: {
          content_uid: data.content_uid,
          datas: data
        }
      });
    },
    ContentDetail_multi(data) {
      this.$router.push({
        name: "ContentDetail_multi",
        params: {
          content_uid: data.content_uid,
          datas: data
        }
      });
    }
  },
  computed: {
    pre_url_set() {
      return ls.set("pre_target", this.$router.currentRoute.fullPath);
    },
    userProfile() {
      return this.$store.getters["imagestore/userProfile_getters"];
    },
    userProfile_image() {
      return this.$store.getters["imagestore/userProfile_image_getters"];
    },
    userProfile_image_multi() {
      return this.$store.getters["imagestore/userProfile_image_multi_getters"];
    }
  }
};
</script>
