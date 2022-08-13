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
    <v-btn
      class="ml-10 mt-1"
      color="primary"
      small
      text
      @click="delete_search_result"
    >
      검색결과삭제하기</v-btn
    >
    <!--데이터 테이블1-->
    <div>
      <p class="ml-5 mr-5">content</p>
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
    <!--데이터 테이블2-->
    <div>
      <p class="ml-5 mr-5">content_multi</p>
      <v-data-table
        :headers="headers"
        :items="content_multi_data"
        :items-per-page="5"
        class="elevation-1 ma-5"
      >
        <template v-slot:[`item.image_path`]="{ item }">
          <v-carousel cycle height="auto" hide-delimiters :show-arrows="false">
            <v-carousel-item
              class="ma-3"
              v-for="(data, index) in item.image_path"
              :key="index"
            >
              <v-row class="fill-height" align="center" justify="center">
                <img
                  :src="`http://192.168.0.12:4000/${data}`"
                  style="width: 80px; height: 80px"
                  @click="ContentDetail_multi(item)"
                />
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
                  </v-row>
                </template>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-data-table>
    </div>
    <v-alert
      color="grey"
      class="ml-5 mr-5"
      v-model="content_no_data_msg"
      dense
      outlined
    >
      검색한 <strong>닉네임</strong>으로 검색된 게시물이
      <strong>없습니다.</strong>
    </v-alert>
  </div>
</template>

<script>
import http from "../http/http";
import ls from "localstorage-slim";

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
      content_multi_data: [],
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
    ls.config.encrypt = true;
    this.search_keyword = JSON.parse(ls.get("search_data_keyword"));
    const get_lo_storage = JSON.parse(ls.get("search_data"));
    const get_lo_storage_multi = JSON.parse(ls.get("search_data_multi"));
    if (get_lo_storage) {
      this.content_data = get_lo_storage;
    }
    if (get_lo_storage_multi) {
      this.content_multi_data = get_lo_storage_multi;
    }
    // this.content_data = JSON.parse(ls.get("search_data"));
  },
  methods: {
    async search_result() {
      const validate = this.$refs.form.validate();
      ls.config.encrypt = true;

      if (validate) {
        try {
          const nicknameObj = { nickname: this.search_keyword };
          // console.log("nicknameObj :  " + JSON.stringify(nicknameObj));
          const response = await http.post(`/sun/content_search`, nicknameObj, {
            withCredentials: true
          });
          if (response.data.msg == "No Data") {
            this.content_no_data_msg = true;
            // localStorage.setItem("search_data", JSON.stringify([]));
            this.content_data = [];
            this.content_multi_data = [];
            ls.set("search_data", JSON.stringify([]));
            ls.set("search_data_multi", JSON.stringify([]));
            ls.set("search_data_keyword", JSON.stringify(this.search_keyword));
          } else {
            if (response.data) {
              const filterData = response.data.filter(
                data => data.report_count <= 2
              );
              const nomal_data = [];
              const multi_data = [];
              filterData.map(data => {
                if (data.image_path.includes("/multi_")) {
                  data.image_path = data.image_path.split(",");
                  multi_data.push(data);
                } else {
                  nomal_data.push(data);
                }
              });
              this.content_data = nomal_data;
              this.content_multi_data = multi_data;
              // localStorage.setItem("search_data", JSON.stringify(filterData));
              ls.set("search_data", JSON.stringify(nomal_data));
              ls.set("search_data_multi", JSON.stringify(multi_data));
              ls.set(
                "search_data_keyword",
                JSON.stringify(this.search_keyword)
              );
              this.content_no_data_msg = false;
            }
          }
        } catch (e) {
          throw e;
        }
      }
    },
    delete_search_result() {
      ls.set("search_data", JSON.stringify([]));
      (this.search_keyword = null), (this.content_data = []);
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
    ContentDetail_multi(data) {
      this.$router.push({
        name: "ContentDetail_multi",
        params: {
          content_uid: data.content_uid,
          datas: data
        }
      });
    }
  }
};
</script>
