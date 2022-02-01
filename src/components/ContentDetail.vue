<template>
  <div class="contentdetail pa-6 center">
    <v-img
      :src="`http://192.168.0.12:4000/${$route.params.datas.image_path}`"
    ></v-img>
    <v-card-actions class="justify-center">
      <v-btn color="purple lighten-3" dark @click="score">점수주기</v-btn>
    </v-card-actions>

    <!-- 별점주기 -->

    <v-card v-if="scoredialog == true" class="elevation-16 mx-auto" width="400">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      scoredialog: false,
      radios: null,
      rating: 1
    };
  },
  methods: {
    score() {
      this.scoredialog = true;
    },
    score_send() {
      this.scoredialog = false;
    },
    score_cancel() {
      this.scoredialog = false;
    }
  }
};
</script>

<style scoped>
.my-custom-dialog {
  align-self: flex-end;
}
</style>
