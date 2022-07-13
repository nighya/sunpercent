<template>
  <v-card>
    <v-tabs color="deep-purple accent-4" left v-model="tab">
      <v-tab href="#tab-1">쪽지보내기</v-tab>
      <v-tab href="#tab-2" @click="getReceivedNote">받은쪽지</v-tab>
      <v-tab href="#tab-3" @click="getSentNote">보낸쪽지</v-tab>
      <v-tab href="#tab-4">쪽지보기</v-tab>

      <v-tab-item value="tab-1">
        <h1>
          쪽지보내기
          {{ $route.params.nickname }}
          {{ $route.params.user_uid }}
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    outlined
                    v-model="note_to_nickname"
                    :rules="[
                      rules.rules_nickname.require1,
                      rules.rules_nickname.require2
                    ]"
                    counter
                    maxlength="30"
                    hint=""
                    label="받는사람(닉네임)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    outlined
                    v-model="note_title"
                    :rules="[
                      rules.rules_title.require1,
                      rules.rules_title.require2
                    ]"
                    counter
                    maxlength="30"
                    hint=""
                    label="제목"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-textarea
                    outlined
                    v-model="note_textarea"
                    :rules="[
                      rules.rules_textarea.require1,
                      rules.rules_textarea.require2
                    ]"
                    label="내용"
                    counter
                    maxlength="1000"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-btn @click="SendNote">보내기</v-btn>
        </h1></v-tab-item
      >
      <v-tab-item value="tab-2">
        <v-data-table
          v-model="received_selected"
          :headers="received_headers"
          :items="$store.state.notestore.received_note_state"
          :single-select="singleSelect"
          :loading="loading"
          loading-text="Loading... Please wait"
          item-key="date"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <v-switch
              v-model="singleSelect"
              label="Single select"
              class="pa-3"
            ></v-switch>
          </template> </v-data-table
      ></v-tab-item>
      <v-tab-item value="tab-3">

        <v-btn small><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        <v-data-table
          v-model="sent_selected"
          :headers="sent_headers"
          :items="$store.state.notestore.sent_note_state"
          :single-select="singleSelect"
          :loading="loading"
          mobile-breakpoint="0"
          loading-text="Loading... Please wait"
          item-key="date"
          show-select
          class="elevation-1"
        >
        </v-data-table>
      </v-tab-item>
      <v-tab-item value="tab-4"><h1>쪽지보기</h1></v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import http from "../http/http";

export default {
  data() {
    return {
      //테스트 데이터
      loading: false,
      singleSelect: false,
      sent_selected: [],
      received_selected: [],
      sent_headers: [
        {
          text: "받는사람",
          align: "start",
          sortable: false,
          value: "to_nickname"
        },
        { text: "제목", value: "title" },
        { text: "날짜", value: "date" }
      ],
      received_headers: [
        {
          text: "보낸사람",
          align: "start",
          sortable: false,
          value: "from_nickname"
        },
        { text: "제목", value: "title" },
        { text: "내용", value: "message" },
        { text: "날짜", value: "date" },
        { text: "읽음확인", value: "view_count" }
      ],
      // sentnotes: [
      //   {
      //     to_nickname: "Frozen Yogurt",
      //     title: 159,
      //     message: 6.0,
      //     date: 24,
      //     view_count: 4.0
      //   }
      // ],
      SentNoteStateData: this.$store.state.notestore.sent_note_state,
      ReceivedNoteStateData: this.$store.state.notestore.received_note_state,
      //테스트데이터끝

      tab: "tab-1",
      to_user_uid: this.$route.params.user_uid,
      from_user_uid: this.$store.state.loginstore.userstate[0].user_uid,
      note_to_nickname: this.$route.params.nickname,
      note_from_nickname: this.$store.state.loginstore.userstate[0].nickname,
      note_title: "",
      note_textarea: "",
      note_from_gender: this.$store.state.loginstore.userstate[0].gender,
      rules: {
        rules_nickname: {
          require1: v => !!v || "닉네임을 입력해 주세요.",
          require2: v =>
            !(v && v.length >= 30) || "닉네임은 30자 이상 입력할 수 없습니다."
        },
        rules_title: {
          require1: v => !!v || "제목을 입력해 주세요.",
          require2: v =>
            !(v && v.length >= 30) || "제목은 30자 이상 입력할 수 없습니다."
        },
        rules_textarea: {
          require1: v => !!v || "내용을 입력해 주세요.",
          require2: v =>
            !(v && v.length >= 1000) || "내용은 1000자 이상 입력할 수 없습니다."
        }
      }
    };
  },
  // mounted() {
  //   const payload = {
  //     from_uid: this.$store.state.loginstore.userstate[0].user_uid,
  //     from_nickname: this.$store.state.loginstore.userstate[0].nickname
  //   };
  //   this.$store.dispatch("notestore/getsentnote", payload);
  // },
  // computed: {
  //   GetterGetSentNoteList() {
  //     return this.$store.getters["notestore/getters_getsentnote"];
  //   }
  // },
  methods: {
    async SendNote() {
      const noteObj = {
        to_uid: this.to_user_uid,
        from_uid: this.from_user_uid,
        to_nickname: this.note_to_nickname,
        from_nickname: this.note_from_nickname,
        title: this.note_title,
        message: this.note_textarea,
        from_gender: this.note_from_gender
      };
      const validate = this.$refs.form.validate();
      if (validate) {
        try {
          await http.post(`/note/sendnote/${noteObj.to_uid}`, noteObj, {
            withCredentials: true
          });

          this.note_to_nickname = "";
          this.note_title = "";
          this.note_textarea = "";
          // this.$forceUpdate();
          this.changeTab();
        } catch (err) {
          alert("쪽지보내기를 실패하였습니다.");
        }
      }
    },
    async changeTab() {
      try {
        await this.getSentNote();
        this.tab = "tab-3";
      } catch (e) {
        console.log(e);
      }
    },
    async getSentNote() {
      this.loading = true;
      const payload = {
        from_uid: this.$store.state.loginstore.userstate[0].user_uid,
        from_nickname: this.$store.state.loginstore.userstate[0].nickname
      };
      this.$store.dispatch("notestore/getsentnote", payload);
      this.loading = false;
    },
    async getReceivedNote() {
      this.loading = true;
      const payload = {
        to_uid: this.$store.state.loginstore.userstate[0].user_uid,
        to_nickname: this.$store.state.loginstore.userstate[0].nickname
      };
      this.$store.dispatch("notestore/getreceivednote", payload);
      this.loading = false;
    }
  }
};
</script>
