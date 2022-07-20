<template>
  <div>
    <div class="mt-2 ml-3"><h2>Content</h2></div>
    
    <v-container>
      <v-row>
        <v-col
          v-for="(data, index) in AllGetterslist"
          :key="index"
          class="d-flex child-flex"
          cols="4"
        >
          <div @click="ContentDetail(data)">
            <v-img
              :src="`http://192.168.0.12:4000/${data.image_path}`"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              aspect-ratio="1"
            >
              <!-- <v-card-title v-text="data.user_uid"></v-card-title> -->

              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-row>
              <v-card-text class="mt-2">
                <v-icon class="mr-1" color="blue darken-3" v-if="data.gender == `male`"
                  >mdi-alpha-m-circle-outline</v-icon
                >
                <v-icon class="mr-1" color="pink" v-else
                  >mdi-alpha-w-circle-outline</v-icon
                >{{ data.nickname }}</v-card-text
              >
              </v-row>
              <v-card-text class="grey--text" align="right" v-text="moment_now(data.date)"></v-card-text>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import moment from "moment"
import 'moment/locale/ko'
export default {
  data: () => ({}),
  mounted() {
    this.$store.dispatch("imagestore/getallimages");
  },

  computed: {
    AllGetterslist() {
      return this.$store.getters["imagestore/allImagelist"];
    }
  },
  methods: {
    contentupload() {
      if (this.$store.state.loginstore.userstate[0].point < 2) {
        alert(
          "게시물을 업로드 하시려면 포인트 2점이 필요합니다. 다른 게시물에 점수를 주면 포인트를 얻을 수 있습니다."
        );
      } else {
        this.$router.push("/contentupload");
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
    moment_now(data) {
      moment.locale("ko");
     const result =  moment(data).fromNow()
      return result
     
    }
  }
};
</script>
