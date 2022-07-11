<template>
  <v-card>
    <v-tabs color="deep-purple accent-4" left>
      <v-tab>쪽지보내기</v-tab>
      <v-tab>받은쪽지</v-tab>
      <v-tab>보낸쪽지</v-tab>

      <v-tab-item v-for="n in 3" :key="n">
        <v-container fluid>
          <v-row>
            <v-col>
              <h1 v-if="n == 1">
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
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      note_to_nickname: this.$route.params.nickname,
      note_title: "",
      note_textarea: "",
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
      const test = {
        nickname: this.note_to_nickname,
        title: this.note_title,
        textarea: this.note_textarea
      };
      const validate = this.$refs.form[0].validate();
      console.log(validate)
      if (validate) {
        console.log(test);
      }
    }
  }
};
</script>
