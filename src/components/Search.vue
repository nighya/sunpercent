<template>
  <div>
    <v-text-field
      class="ml-5 mr-5"
      prepend-icon="mdi-magnify"
      label="search"
      hint="닉네임으로 게시물을 검색 합니다."
      persistent-hint
      @keydown.prevent.enter="search_result"
      v-model="search_keyword"
    ></v-text-field>
    <v-row>
      <v-col
        v-for="(data, index) in content_data"
        :key="index"
        class="d-flex child-flex"
        cols="4"
      >
        <v-img
          :src="`http://192.168.0.12:4000/${data.image_path}`"
          :lazy-src="`http://192.168.0.12:4000/${data.image_path}`"
          aspect-ratio="1"
          class="grey lighten-2"
          @click="ContentDetail(data)"
        >
          <span class="white--text">{{ data.nickname }}</span>
          <span class="white--text">({{ data.date }})</span>

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
import http from "../http/http";

export default {
  data() {
    return {
      content_data: "",
      content_no_data_msg: "",
      search_keyword: null
    };
  },
  methods: {
    async search_result() {
      const nicknameObj = { nickname: this.search_keyword };
      console.log("nicknameObj :  " + nicknameObj);
      const response = await http.post(`/content/search`, nicknameObj, {
        withCredentials: true
      });
      this.content_data = response.data;
      if (response.data.msg == "No Data") {
        this.content_no_data_msg = "검색 결과가 없습니다.";
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
    }
  }
};
</script>
