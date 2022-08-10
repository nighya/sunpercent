<template>
  <v-card>
    {{ confirm_received_note }}
    <v-tabs color="deep-purple accent-1" left v-model="tab">
      <v-tab class="ml-5" href="#tab-1">쪽지보내기</v-tab>
      <v-tab href="#tab-2" @click="getReceivedNote"
        >받은쪽지
        <v-badge
          v-if="$store.state.notestore.confirm_received_state > 0"
          color="pink"
          :content="$store.state.notestore.confirm_received_state"
        >
        </v-badge
      ></v-tab>
      <v-tab href="#tab-3" @click="getSentNote">보낸쪽지</v-tab>
      <v-tab href="#tab-4">쪽지보기</v-tab>

      <v-tab-item value="tab-1" class="ma-2">
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
        <v-col class="text-right"
          ><v-btn text color="primary" @click="SendNote">보내기</v-btn></v-col
        >
      </v-tab-item>
      <v-tab-item class="ma-2" value="tab-2">
        <v-icon class="ma-4" @click="deleteReceivedNoteSelected"
          >mdi-trash-can-outline</v-icon
        >

        <v-data-table
          v-model="received_selected"
          :headers="received_headers"
          :items="$store.state.notestore.received_note_state"
          :single-select="singleSelect"
          :loading="loading"
          :sort-by.sync="columnName"
          :sort-desc.sync="isDescending"
          :items-per-page="5"
          mobile-breakpoint="0"
          loading-text="Loading... Please wait"
          item-key="date"
          show-select
          class="elevation-1"
          @click:row="showNoteDetail"
        >
        </v-data-table
      ></v-tab-item>
      <v-tab-item class="ma-2" value="tab-3">
        <v-icon class="ma-4" @click="deleteSentNoteSelected"
          >mdi-trash-can-outline</v-icon
        >
        <v-data-table
          v-model="sent_selected"
          :headers="sent_headers"
          :items="$store.state.notestore.sent_note_state"
          :single-select="singleSelect"
          :loading="loading"
          :sort-by.sync="columnName"
          :sort-desc.sync="isDescending"
          :items-per-page="5"
          mobile-breakpoint="0"
          loading-text="Loading... Please wait"
          item-key="date"
          show-select
          class="elevation-1"
          @click:row="showNoteDetail"
        >
        </v-data-table>
      </v-tab-item>
      <v-tab-item class="ma-5" value="tab-4">
        <div v-if="showNoteData.date !== null">
          <!--받은쪽지 리플 버튼-->
          <v-icon
            v-if="
              $store.state.loginstore.userstate[0].nickname ==
                showNoteData.to_nickname
            "
            @click="moveReceivedReplyNotetab"
            >mdi-email-outline</v-icon
          >
          <v-icon
            class="ml-2"
            v-if="
              $store.state.loginstore.userstate[0].nickname ==
                showNoteData.to_nickname
            "
            @click="deleteReceivedNoteDetail"
            >mdi-trash-can-outline</v-icon
          >

          <!--내가 보낸사람에게 다시보내기 버튼-->
          <v-icon
            v-if="
              $store.state.loginstore.userstate[0].nickname ==
                showNoteData.from_nickname
            "
            @click="moveSentReplyNotetab"
            >mdi-email-outline</v-icon
          >
          <v-icon
            class="ml-2"
            v-if="
              $store.state.loginstore.userstate[0].nickname ==
                showNoteData.from_nickname
            "
            @click="deleteSentNoteDetail"
            >mdi-trash-can-outline</v-icon
          >
          <v-divider></v-divider>
          <v-row class="mt-1 mb-1">
            <v-col>
              <v-icon
                color="blue darken-3"
                v-if="showNoteData.from_gender == 'male'"
                >mdi-alpha-m-circle-outline</v-icon
              >
              <v-icon color="pink" v-if="showNoteData.from_gender == 'female'"
                >mdi-alpha-w-circle-outline</v-icon
              >
              <span
                v-if="
                  $store.state.loginstore.userstate[0].nickname ==
                    showNoteData.to_nickname
                "
              >
                {{ showNoteData.from_nickname }}
              </span>
              <span
                v-if="
                  $store.state.loginstore.userstate[0].nickname ==
                    showNoteData.from_nickname
                "
              >
                {{ showNoteData.to_nickname }}
              </span> </v-col
            ><v-col align="end">
              <span>{{ showNoteData.date }}</span>
            </v-col></v-row
          >
          <v-divider></v-divider>
          <div class="mt-2 mb-1">제목</div>
          <div class="mb-2">{{ showNoteData.title }}</div>
          <v-divider></v-divider>
          <div class="mt-2 mb-1">내용</div>
          <div class="mb-2">{{ showNoteData.message }}</div>
        </div>
        <div v-else>쪽지가 선택되지 않았습니다.</div>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import http from "../http/http";

export default {
  data() {
    return {
      columnName: "date",
      isDescending: true,
      showNoteData: { date: null },
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
        { text: "날짜", value: "date" },
        { text: "조회수", value: "view_count" }
      ],
      SentNoteStateData: this.$store.state.notestore.sent_note_state,
      ReceivedNoteStateData: this.$store.state.notestore.received_note_state,

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
  computed: {
    confirm_received_note() {
      this.loading = true;
      const payload = {
        to_uid: this.$store.state.loginstore.userstate[0].user_uid,
        to_nickname: this.$store.state.loginstore.userstate[0].nickname
      };
      this.$store.dispatch("notestore/getreceivednote", payload);
      this.loading = false;
    }
  },

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
          if (noteObj.to_nickname == noteObj.from_nickname) {
            alert("자기자신에게는 보낼 수 없습니다.");
          } else {
            await http.post(`/note/sendnote`, noteObj, {
              withCredentials: true
            });

            this.note_to_nickname = "";
            this.note_title = "";
            this.note_textarea = "";
            // this.$forceUpdate();
            this.changeTab();
          }
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
    },

    async deleteSentNoteDetail() {
      const delsentObj = {
        from_uid: this.showNoteData.from_uid,
        id_num: this.showNoteData.id_num
      };
      try {
        this.$store.dispatch("notestore/deletesentnotedetail", delsentObj);
        this.showNoteData = { date: null };
        this.tab = "tab-3";
      } catch (err) {
        if (err) {
          alert("쪽지 삭제에 실패하였습니다");
        }
      }
    },

    async deleteSentNoteSelected() {
      const delsentSelectedObj = [];
      this.sent_selected.map(item =>
        delsentSelectedObj.push({
          id_num: item.id_num,
          from_uid: item.from_uid
        })
      );

      try {
        this.$store.dispatch(
          "notestore/deletesentnoteselected",
          delsentSelectedObj
        );
      } catch (err) {
        if (err) {
          alert("쪽지 삭제에 실패하였습니다");
        }
      }
      // console.log("deleteSentNoteSelected  :" + JSON.stringify(delsentSelectedObj))
    },

    async deleteReceivedNoteDetail() {
      const delreceivedObj = {
        to_uid: this.showNoteData.to_uid,
        id_num: this.showNoteData.id_num
      };
      try {
        this.$store.dispatch(
          "notestore/deletereceivednotedetail",
          delreceivedObj
        );
        this.showNoteData = { date: null };
        this.tab = "tab-2";
      } catch (err) {
        if (err) {
          alert("쪽지 삭제에 실패하였습니다");
        }
      }
    },

    async deleteReceivedNoteSelected() {
      const delreceivedSelectedObj = [];
      this.received_selected.map(item =>
        delreceivedSelectedObj.push({
          id_num: item.id_num,
          to_uid: item.to_uid
        })
      );

      try {
        this.$store.dispatch(
          "notestore/deletreceivednoteselected",
          delreceivedSelectedObj
        );
      } catch (err) {
        if (err) {
          alert("쪽지 삭제에 실패하였습니다");
        }
      }
    },

    showNoteDetail(data) {
      this.showNoteData = Object.assign({}, data);
      const confirmNoteObj = {
        id_num: data.id_num,
        to_uid: data.to_uid
      };
      try {
        this.$store.state.notestore.confirm_received_state -= 1;
        this.$store.dispatch("notestore/confirmreceivednote", confirmNoteObj);
      } catch (err) {
        if (err) {
        }
      }
      this.tab = "tab-4";
    },
    moveSentReplyNotetab() {
      if (
        this.$route.path !==
        `/note/${this.showNoteData.to_nickname}/${this.showNoteData.to_uid}`
      ) {
        this.$router
          .push(
            `/note/${this.showNoteData.to_nickname}/${this.showNoteData.to_uid}`
          )
          .catch(() => true);
      } else {
        this.tab = "tab-1";
      }
    },
    moveReceivedReplyNotetab() {
      if (
        this.$route.path !==
        `/note/${this.showNoteData.from_nickname}/${this.showNoteData.from_uid}`
      ) {
        this.$router
          .push(
            `/note/${this.showNoteData.from_nickname}/${this.showNoteData.from_uid}`
          )
          .catch(() => true);
      } else {
        this.tab = "tab-1";
      }
    }
  }
};
</script>
