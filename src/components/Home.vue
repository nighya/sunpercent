<template>
  <div>
    <div>
      <h2>Content</h2>
      <v-sheet class="mt-5 mb-5 mx-auto" elevation="8" max-width="1000">
        <v-slide-group
          class="pa-4"
          active-class="success"
          show-arrows
          center-active
          ><v-slide-item v-for="(data, index) in AllGetterslist" :key="index">
            <v-carousel
              :show-arrows="false"
              hide-delimiters
              height="auto"
              hide-delimiter-background
            >
              <v-carousel-item class="ma-3">
                <v-row class="fill-height" align="center" justify="center">
                  <v-img
                    v-if="data.report_count > 2"
                    max-height="175"
                    max-width="175"
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
                    max-height="175"
                    max-width="175"
                    :src="`http://192.168.0.12:4000/${data.image_path}`"
                    aspect-ratio="1"
                    @click="ContentDetail(data)"
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
                </v-row>
              </v-carousel-item> </v-carousel></v-slide-item
        ></v-slide-group>
      </v-sheet>
      <v-divider class="mt-10 mb-3 ml-2 mr-2"></v-divider>
      <h2>Content multi</h2>
      <v-sheet class="mt-5 mb-5 mx-auto" elevation="8" max-width="1000">
        <v-slide-group
          class="pa-4"
          active-class="success"
          show-arrows
          center-active
          ><v-slide-item
            v-for="(data, index) in AllGetterslist_multi"
            :key="index"
          >
            <v-carousel
              hide-delimiters
              :show-arrows="false"
              cycle
              height="auto"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                class="ma-3"
                v-for="(item, index) in data.image_path"
                :key="index"
              >
                <v-row class="fill-height" align="center" justify="center">
                  <v-img
                    v-if="data.report_count > 2"
                    :src="black_image"
                    class="grey--text align-center"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    aspect-ratio="1"
                    max-height="175"
                    max-width="175"
                    ><v-card-text class="font-weight-thin" align="center"
                      >신고누적으로<br />이미지차단</v-card-text
                    ></v-img
                  >
                  <v-img
                    v-else
                    max-height="175"
                    max-width="175"
                    :src="`http://192.168.0.12:4000/${item}`"
                    aspect-ratio="1"
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
                </v-row>
              </v-carousel-item> </v-carousel></v-slide-item
        ></v-slide-group>
      </v-sheet>
    </div>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        <v-btn
          color="grey"
          text
          class="pa-3"
          target="_blank"
          href="http://192.168.0.12:8080/TermsOfUse"
        >
          이용약관
        </v-btn>
        <span style="color:grey; padding:12px;">|</span>
        <v-btn
          text
          class="pa-3"
          target="_blank"
          href="http://192.168.0.12:8080/PolicyPrivacy"
        >
          개인정보처리방침 </v-btn
        ><span style="color:grey; padding:12px;">|</span
        ><span style="color:grey; padding:12px;">help@sunpercent.com</span>
        <v-divider class="pa-1"></v-divider>
        <span class="ml-6">© 2022 sunpercent All Rights Reserved.</span>
      </v-col>
    </v-footer>
  </div>
</template>
<script>
import Content from "./Content.vue";
import Content_multi from "./Content_multi.vue";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import black_image from "../assets/black.jpg";

export default {
  components: { Content, Content_multi },
  data() {
    return { black_image: black_image };
  },
  mounted() {
    this.$store.dispatch("imagestore/getallimages_multi");
    this.$store.dispatch("imagestore/getallimages");
  },
  computed: {
    AllGetterslist_multi() {
      return this.$store.getters["imagestore/allImagelist_multi"];
    },
    AllGetterslist() {
      return this.$store.getters["imagestore/allImagelist"];
    }
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
    },
    dayjs_now(data) {
      const result = dayjs(data).fromNow();
      return result;
    }
  }
};
</script>
<style>
.test a,
u {
  text-decoration: none;
}
</style>
