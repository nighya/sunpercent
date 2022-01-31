<template>
  <div class="contentdetail pa-6">
    <v-img
      :src="`http://192.168.0.12:4000/${$route.params.datas.image_path}`"
    ></v-img>
      <v-container fluid>
    <p>{{ radios || 'null' }}</p>
    <v-radio-group
      v-model="radios"
      mandatory
    >
      <v-radio
        label="1점"
        value="1"
      ></v-radio>
      <v-radio
        label="2점"
        value="2"
      ></v-radio>
            <v-radio
        label="3점"
        value="3"
      ></v-radio>
            <v-radio
        label="4점"
        value="4"
      ></v-radio>
            <v-radio
        label="5점"
        value="5"
      ></v-radio>
            <v-radio
        label="6점"
        value="6"
      ></v-radio>
            <v-radio
        label="7점"
        value="7"
      ></v-radio>
    </v-radio-group>
    <v-btn @click="SendScore">제출</v-btn>

    <!-- 별점주기 -->
      <v-card
    class="elevation-16 mx-auto"
    width="400"
  >
    <v-card-title class="text-h5">
      이 사진의 외모는 몇점 입니까?
    </v-card-title>
    <v-card-text>
      게시물 작성자가 점수 공개하기 전까지는 해당 게시물 점수는 게시물 작성자만 알 수 있습니다.(7점 만점)

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
        <v-card-text>{{this.rating}} / 7</v-card-text>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn text>
        취소
      </v-btn>
      <v-btn
        color="primary"
        text
      >
        점수 보내기
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radios:null,
      rating:1,
    };
  },
  methods:{
    SendScore(){
      console.log(this.radios)
    }
  }
};
</script>
