<template>
  <div>
    <h1 class=" pa-6">Userpage</h1>
    <div class=" pa-6" align="center">
      <v-avatar
        tile
        v-if="this.$store.state.imagestore.userprofile[0].profile_image == null"
        size="200"
      >
        <v-img contain :src="baseimage"></v-img>
      </v-avatar>
      <v-avatar v-else size="200" tile>
        <v-img
          contain
          :src="
            `http://192.168.0.12:4000${this.$store.state.imagestore.userprofile[0].profile_image}`
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
          <p>쪽지보내기</p>
        </v-row>
      </p>
    </div>
    <v-divider class="ml-6 mr-6"></v-divider>
    <div>
      <v-row class="pa-6 mt-2">
        <span
          class="ml-3"
          v-if="
            this.$store.state.imagestore.userprofile_image[0].image_path ==
              undefined
          "
          >게시물이 없습니다.</span
        >
        <v-col
          v-for="(data, index) in userProfile_image"
          :key="index"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :src="`http://192.168.0.12:4000${data.image_path}`"
            :lazy-src="`http://192.168.0.12:4000${data.image_path}`"
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
  </div>
</template>
<script>
import baseimage from "../assets/base_user.png";

export default {
  data() {
    return {
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
    }
  },
  computed: {
    userProfile() {
      return this.$store.getters["imagestore/userProfile_getters"];
    },
    userProfile_image() {
      return this.$store.getters["imagestore/userProfile_image_getters"];
    }
  }
};
</script>
