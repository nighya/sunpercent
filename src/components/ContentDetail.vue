<template>
  <div class="contentdetail pa-6 center">
    <v-card>
      <v-img
        :src="
          `http://192.168.0.12:4000${this.$store.state.imagestore.imagedetail[0].image_path}`
        "
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        max-height="500px"
        max-width="1000px"
      >
        <v-card-text
          v-text="this.$store.state.imagestore.imagedetail[0].date"
        ></v-card-text>
      </v-img>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="purple lighten-3" dark @click="score">점수주기</v-btn>
      </v-card-actions>
    </v-card>
    <!-- 별점주기 -->

    <div class="text-center">
      <v-dialog v-model="scoredialog" width="500" persistent>
        <v-card class="elevation-16 mx-auto " width="400">
          <v-card-title class="text-h5">
            이 사진의 외모는 몇점 입니까?
          </v-card-title>
          <v-card-text>
            게시물 작성자가 점수 공개하기 전까지는 해당 게시물 점수는 게시물
            작성자만 알 수 있습니다.(7점 만점)
            <div class="text-center mt-12">
              <v-rating
                v-model="rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                length="7"
                x-large
              ></v-rating>
              <v-card-text>{{ this.rating }} / 7</v-card-text>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn text @click="score_cancel">
              취소
            </v-btn>
            <v-btn color="primary" text @click="score_send">
              점수 보내기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      scoredialog: false,
      rating: 1
    };
  },
  methods: {
    score() {
      this.scoredialog = true;
    },
    score_send() {
      let scoredata = {
        content_uid: this.$store.state.imagestore.imagedetail[0].content_uid,
        to_uid: this.$store.state.imagestore.imagedetail[0].user_uid,
        from_uid: this.$store.state.loginstore.userstate[0].user_uid,
        content_score: this.rating
      };
      axios
        .post("http://192.168.0.12:4000/contentscore", scoredata, {
          withCredentials: true
        })
        .then(e => {
          this.scoredialog = false;
        })

        .catch(err => {
          if (err.response.status == 403) {
          }
          this.scoredialog = false;
        });
    },
    score_cancel() {
      this.scoredialog = false;
    }
  },
  mounted() {
    this.$store.dispatch("imagestore/getimage", this.$route.params.content_uid);
  },

  computed: {
    imageDetail() {
      return this.$store.getters["imagestore/imageDetail"];
    }
  }
};
</script>

<style scoped>
.my-custom-dialog {
  align-self: flex-end;
}
</style>
