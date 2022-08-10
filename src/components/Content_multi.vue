<template>
  <div>
    <div class="mt-2 ml-3 mr-3">
      <v-btn to="/contentupload_multi">
        사진골라줘 사진올리기
      </v-btn>
      
    </div>

    <v-container>
      <v-row>
        <v-col
          v-for="(data, index) in AllGetterslist_multi"
          :key="index"
          class="d-flex child-flex"
          cols="4"
        >
          <div @click="ContentDetail_multi(data)">
            <v-carousel
              hide-delimiter-background
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
                  :src="`http://192.168.0.12:4000/${item}`"
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
            <!-- <v-card-title v-text="data.user_uid"></v-card-title> -->

            <v-row>
              <v-card-text class="mt-2">
                <v-icon
                  class="mr-1"
                  color="blue darken-3"
                  v-if="data.gender == `male`"
                  >mdi-alpha-m-circle-outline</v-icon
                >
                <v-icon class="mr-1" color="pink" v-if="data.gender == `female`"
                  >mdi-alpha-w-circle-outline</v-icon
                >{{ data.nickname }}
                <div class="grey--text" align="right">
                  {{ dayjs_now(data.date) }}
                </div></v-card-text
              >
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import black_image from "../assets/black.jpg";

export default {
  data: () => ({
    black_image: black_image
  }),
  mounted() {
    this.$store.dispatch("imagestore/getallimages_multi");
  },

  computed: {
    AllGetterslist_multi() {
      return this.$store.getters["imagestore/allImagelist_multi"];
    }
  },
  methods: {
    //이미지 업로드
    contentupload() {
      if (this.$store.state.loginstore.userstate[0].point < 2) {
        alert(
          "게시물을 업로드 하시려면 포인트 2점이 필요합니다. 다른 게시물에 점수를 주면 포인트를 얻을 수 있습니다."
        );
      } else {
        this.$router.push("/contentupload");
      }
    },
    ContentDetail_multi(data) {
      this.$router.push({
        name: "ContentDetail_multi",
        params: {
          content_uid: data.content_uid,
          datas: data
        }
      }).catch(()=>{});
    },
    dayjs_now(data) {
      const result = dayjs(data).fromNow();
      return result;
    }
  }
};
</script>
