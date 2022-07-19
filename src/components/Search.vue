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
            :rules="[
        rules.nickname.require2,
        rules.nickname.require3,
      ]"
      :error-messages="nickname_err_msg"
    ></v-text-field>

    <div>
      <v-data-table
        :headers="headers"
        :items="content_data"
        :items-per-page="5"
        class="elevation-1 ma-5"
      >
        <template v-slot:[`item.image_path`]="{ item }">
          <img
            :src="`http://192.168.0.12:4000/${item.image_path}`"
            style="width: 80px; height: 80px"
            @click="ContentDetail(item)"
          />
        </template>
      </v-data-table>
    </div>
    <v-alert class="ml-5 mr-5" v-model="content_no_data_msg" dense outlined>
      검색한 <strong>닉네임</strong>으로 검색된 게시물이
      <strong>없습니다.</strong>
    </v-alert>
  </div>
</template>

<script>
import http from "../http/http";

export default {
  data() {
    return {
      nickname_err_msg: [],
      rules: {
        nickname: {
          // require1: v => !!v || "닉네임을 입력해 주세요.",
          require2: v =>
            !(v && v.length >= 30) || "30자 이상 입력할 수 없습니다.",
          require3: v =>
            !/[~!@#$%^&*()_+|<>?:{} ]/.test(v) ||
            "빈칸 및 특수문자를 사용할 수 없습니다.",
          // duplicate: v => this.duplicateNickname(v)
        }
      },
      content_data: [],
      content_no_data_msg: false,
      search_keyword: null,
      headers: [
        { text: "content", value: "image_path",align: 'center', sortable: false, },
        { text: "nickname", value: "nickname", align: 'center',sortable: false,},
        { text: "date", value: "date",align: 'center', sortable: true,}
      ]
    };
  },
  methods: {
    async search_result() {
      const nicknameObj = { nickname: this.search_keyword };
      console.log("nicknameObj :  " + JSON.stringify(nicknameObj));
      const response = await http.post(`/content/search`, nicknameObj, {
        withCredentials: true
      });
      this.content_data = response.data;
      this.content_no_data_msg = false;
      if (response.data.msg == "No Data") {
        this.content_no_data_msg = true;
        this.content_data = [];
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
