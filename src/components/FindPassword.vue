<template>
  <div class="login pa-6">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title class="ml-2">비밀번호 찾기</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  id="email"
                  label="email을 입력해주세요."
                  name="email"
                  prepend-icon="mdi-account"
                  type="email"
                  v-model="fields.email"
                  :rules="[rules.email.require1,rules.email.require2,]"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="grey darken-3" dark @click="moveRegisterpage"
                >회원가입</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                :loading="loading"
                color="grey darken-3"
                dark
                @click.prevent="PasswordResetMailSend"
                >비밀번호 찾기</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import http from "../http/http";

export default {
  data() {
    return {
      loading: false,
      fields: {
        email: null
      },
      rules: {
        email: {
          require1: v =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "이메일 형식에 맞춰 입력하세요.",
          require2: v => !!v || "이메일을 입력해 주세요"
        }
      }
    };
  },
  methods: {
    async PasswordResetMailSend() {
      const validate = this.$refs.form.validate();
      if (validate) {
        let passwordResetObj = {
          email: this.fields.email
        };
        // this.$store
        //     .dispatch("loginstore/password_reset_mail_send", passwordResetObj)

        try {
          this.loading = true;
          const response = await http.post(
            "/sun/login/forgotpassword",
            passwordResetObj,
            {
              withCredentials: true
            }
          );
          if (response.status === 200) {
            this.$alert(
              "해당 메일 주소로 임시 비밀번호를 보냈습니다.메일을 확인해 주세요."
            ).then(() => this.$router.push("/login"));
            this.loading = false;
          } else if (response.status === 400) {
            this.$alert("비밀번호 초기화를 실패하였습니다.");
            this.loading = false;
          } else {
            this.$alert("메일 발송에 실패하였습니다.");
            this.loading = false;
          }
          //   console.log("response :  " + JSON.stringify(response));
        } catch (err) {
          alert(
            "비밀번호 초기화에 실패하였습니다. 정확한 이메일 주소를 넣어주세요."
          );
          this.loading = false;
          console.log("catch에러  :" + err);
          throw err;
        }

        // this.clearForm();
      } else {
        alert("빠진 항목이나 메일주소를 확인해 주세요.");
        this.loading = false;
      }
    },
    moveRegisterpage() {
      this.$router.push("/register");
    }
  }
};
</script>
