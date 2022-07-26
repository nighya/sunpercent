<template>
  <div>
    <v-form ref="form">
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
          rules.nickname.require4
        ]"
        :error-messages="nickname_err_msg"
      ></v-text-field>
    </v-form>
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
    <v-alert color="grey" class="ml-5 mr-5" v-model="content_no_data_msg" dense outlined>
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
            !(v && v.length >= 15) || "15자 이상 입력할 수 없습니다.",
          require3: v =>
            !/[~!@#$%^&*()_+|<>?:{} ]/.test(v) ||
            "빈칸 및 특수문자를 사용할 수 없습니다.",
          require4: v =>
            !(v && v.length <= 1) || "닉네임은 2자 이상 입력해야 합니다."
          // duplicate: v => this.duplicateNickname(v)
        }
      },
      content_data: [],
      content_no_data_msg: false,
      search_keyword: null,
      headers: [
        {
          text: "content",
          value: "image_path",
          align: "center",
          sortable: false
        },
        {
          text: "nickname",
          value: "nickname",
          align: "center",
          sortable: false
        },
        { text: "date", value: "date", align: "center", sortable: true }
      ]
    };
  },
  mounted() {
    this.content_data = JSON.parse(localStorage.getItem("search_data"));
  },
  methods: {
    async search_result() {
      const validate = this.$refs.form.validate();
      if (validate) {
        try {
          const nicknameObj = { nickname: this.search_keyword };
          // console.log("nicknameObj :  " + JSON.stringify(nicknameObj));
          const response = await http.post(`/content/search`, nicknameObj, {
            withCredentials: true
          });
          if (response.data.msg == "No Data") {
            this.content_no_data_msg = true;
            localStorage.setItem("search_data",JSON.stringify([]))
            this.content_data = [];
          } else {
            const filterData = response.data.filter(d => d.report_count <= 2);
            this.content_data = filterData;
            localStorage.setItem("search_data",JSON.stringify(filterData))
            this.content_no_data_msg = false;
          }
        } catch (e) {
          throw e;
        }
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
