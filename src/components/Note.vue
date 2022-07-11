<template>
  <v-card>
    <v-tabs color="deep-purple accent-4" left v-model="tab">
      <v-tab href="#tab-1">쪽지보내기</v-tab>
      <v-tab href="#tab-2">받은쪽지</v-tab>
      <v-tab href="#tab-3">보낸쪽지</v-tab>

      <!-- <v-tab-item v-for="n in 3" :key="n">
        <v-container fluid>
          <v-row>
            <v-col>
              <h1 v-if="n == 1" >
                쪽지보내기
                {{ $route.params.nickname }}
                {{ $route.params.user_uid}}
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
              </h1>
              <h1 v-if="n == 2">2번텝</h1>
              <h1 v-if="n == 3">3번텝</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item> -->
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
      <v-tab-item value="tab-2"><h1>텝2</h1></v-tab-item>
      <v-tab-item value="tab-3"><h1>텝3</h1></v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import http from '../http/http'

export default {
  data() {
    return {
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
  methods: {
    SendNote() {
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
          http.post(`/note/sendnote/${noteObj.to_uid}`, noteObj, {
            withCredentials: true
          });
          this.note_to_nickname = "";
          this.note_title = "";
          this.note_textarea = "";
          this.changeTab();
        } catch (err) {
          console.log(err);
        }
      }
    },
    changeTab() {
      this.tab = "tab-3";
    }
  }
};
</script>
