<template>
  <div class="register pa-6">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="purple lighten-3" dark flat>
              <v-toolbar-title>비밀번호를 변경해주세요.</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <p>아이디  : {{this.fields.email}}</p>
                <v-text-field
                  id="old_password"
                  label="현재 비밀번호"
                  name="old_password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="fields.old_password"
                  :rules="passwordRules"
                ></v-text-field>
                <v-text-field
                  id="new_password"
                  label="새로운 비밀번호"
                  name="new_password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="fields.new_password"
                  :rules="passwordRules"
                ></v-text-field>
                <v-text-field
                  id="confirm"
                  label="새로운 비밀번호 확인"
                  name="confirm"
                  prepend-icon="mdi-alert-circle-check"
                  type="password"
                  v-model="fields.confirm"
                  :rules="confirmPasswordRules"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="purple lighten-3" dark @click="ChangePassword"
                >비밀번호 변경</v-btn
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
      fields: {
        email: this.$store.state.loginstore.userstate[0].email,
        old_password: null,
        new_password: null,
        confirm: null
      },
      passwordRules: [
        value => !!value || "비밀번호를 입력해 주세요.",
        value =>
          (value && value.length >= 4) ||
          "최소 문자의 길이가 4 이상이어야 합니다."
      ],
      confirmPasswordRules: [
        value => !!value || "비밀번호를 다시 입력해 주세요.",
        value =>
          value === this.fields.new_password || "비밀번호가 일치하지 않습니다."
      ]
    };
  },
  methods: {
    async ChangePassword() {
      const validate = this.$refs.form.validate();
      if (validate) {
        let passwordChangeObj = {
          email: this.fields.email,
          old_password: this.fields.old_password,
          new_password: this.fields.new_password
        };
        // this.$store
        //     .dispatch("loginstore/password_reset_mail_send", passwordResetObj)

        try {
          const response = await http.post(
            "/login/changepassword",
            passwordChangeObj,
            {
              withCredentials: true
            }
          );
          if (response.status === 200) {
            this.$alert(
              "비밀번호가 변경되었습니다."
            ).then(() => this.$router.push("/"));
          } else if (response.status === 400) {
            this.$alert("비밀번호를 변경하지 못했습니다.");
          } else {
            this.$alert("비밀번호 변경에 실패하였습니다.");
          }
          //   console.log("response :  " + JSON.stringify(response));
        } catch (err) {
          alert("비밀번호 변경실패.");
          console.log("에러1  :" + err);
          throw err;
        }

        // this.clearForm();
      } else {
        alert("빠진 항목을 확인해 주세요.");
      }
    },
    moveRegisterpage() {
      this.$router.push("/register");
    }
  }
};
</script>
