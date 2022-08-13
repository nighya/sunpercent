<template>
  <div class="register pa-6">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12">
            <v-toolbar class="ml-2" dark flat>
              <v-toolbar-title>Register</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  id="email"
                  label="ID로 쓰일 email을 입력하세요."
                  name="email"
                  prepend-icon="mdi-account"
                  type="email"
                  v-model="fields.email"
                  :rules="[
                    rules.email.require1,
                    rules.email.require2,
                    rules.email.duplicate
                  ]"
                  :error-messages="email_err_msg"
                ></v-text-field>
                <v-text-field
                  id="nickname"
                  label="닉네임을 입력하세요."
                  name="nickname"
                  prepend-icon="mdi-alert-circle-check"
                  type="text"
                  v-model="fields.nickname"
                  :rules="[
                    rules.nickname.require1,
                    rules.nickname.require2,
                    rules.nickname.require3,
                    rules.nickname.require4,
                    rules.nickname.duplicate
                  ]"
                  :error-messages="nickname_err_msg"
                ></v-text-field>
                <v-text-field
                  id="password"
                  label="비밀번호"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="fields.password"
                  :rules="passwordRules"
                ></v-text-field>
                <v-text-field
                  id="confirm"
                  label="비밀번호 확인"
                  name="confirm"
                  prepend-icon="mdi-alert-circle-check"
                  type="password"
                  v-model="fields.confirm"
                  :rules="confirmPasswordRules"
                ></v-text-field>
                <v-radio-group
                  id="gender"
                  v-model="fields.gender"
                  row
                  :rules="genderRules"
                >
                  <v-radio label="남" value="male"></v-radio>
                  <v-radio label="여" value="female"></v-radio>
                </v-radio-group>
                <v-checkbox v-model="checkbox" :rules="checkboxRules">
                  <template v-slot:label>
                    <div>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            target="_blank"
                            href="https://sunpercent.com/TermsOfUse"
                            @click.stop
                            v-on="on"
                          >
                            이용약관
                          </a>
                        </template>
                        이용약관 보기
                      </v-tooltip>
                      에 동의 합니다.
                    </div>
                  </template>
                </v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="grey darken-3" dark @click="moveLoginpage">로그인</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="grey darken-3" dark @click="register">회원등록</v-btn>
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
      checkbox: false,
      passwordRules: [
        value => !!value || "비밀번호를 입력해 주세요.",
        value =>
          (value && value.length >= 8) ||
          "최소 문자의 길이가 8 이상이어야 합니다."
      ],
      confirmPasswordRules: [
        value => !!value || "비밀번호를 다시 입력해 주세요.",
        value =>
          value === this.fields.password || "비밀번호가 일치하지 않습니다."
      ],
      emailRules: [
        v =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "이메일 형식에 맞춰 입력하세요."
      ],
      genderRules: [v => !!v || "성별이 선택되지 않았습니다."],
      checkboxRules: [v => !!v || "이용약관 동의를 하지 않았습니다."],
      rules: {
        email: {
          require1: v => !!v || "이메일을 입력해 주세요.",
          require2: v =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "이메일 형식에 맞춰 입력하세요.",
          duplicate: v => this.duplicateEmail(v) || "중복된 email 주소입니다."
        },
        nickname: {
          require1: v => !!v || "닉네임을 입력해 주세요.",
          require2: v =>
            !(v && v.length >= 15) || "닉네임은 15자 이상 입력할 수 없습니다.",
          require3: v =>
            !/[~!@#$%^&*()_+|<>?:{} ]/.test(v) ||
            "닉네임에는 특수문자를 사용할 수 없습니다.",
          require4: v =>
            !(v && v.length <= 1) || "닉네임은 2자 이상 입력해야 합니다.",
          duplicate: v => this.duplicateNickname(v)
        }
      },
      fields: {
        email: null,
        nickname: null,
        password: null,
        confirm: null,
        gender: null
      },

      email_err_msg: [],
      nickname_err_msg: []
    };
  },
  methods: {
    async duplicateEmail(value) {
      let emailObj = {
        email: value
      };
      try {
        const response = await http.post("/sun/email_validate", emailObj, {
          withCredentials: true
        });
        // console.log("response.data.msg"+ response.data.msg);
        if (response.data.msg == "Email Address empty") {
          this.email_err_msg = [];
        } else if (response.data.msg == "Email Address Exists") {
          this.email_err_msg = ["이미 등록된 이메일 주소입니다."];
        }
      } catch (err) {
        throw err;
      }
    },
    async duplicateNickname(value) {
      let nicknameObj = {
        nickname: value
      };
      try {
        const response = await http.post("/sun/nickname_validate", nicknameObj, {
          withCredentials: true
        });
        if (response.data.msg == "Nickname empty") {
          this.nickname_err_msg = [];
        } else if (response.data.msg == "Nickname Exists") {
          this.nickname_err_msg = ["중복된 닉네임 입니다."];
        }
      } catch (err) {
        throw err;
      }
    },
    register() {
      const validate = this.$refs.form.validate();
      if (validate) {
        let userregisterObj = {
          email: this.fields.email,
          nickname: this.fields.nickname,
          password: this.fields.password,
          gender: this.fields.gender
        };
        this.$store
          .dispatch("loginstore/register", userregisterObj)
          .then((res, err) => {
            if (res.status === 200) {
              this.$alert(
                "회원등록이 성공했습니다. 로그인 해주세요."
              ).then(() => this.$router.push("/"));
            } else if (err) {
              this.$alert("회원등록이 되지 않았습니다. 다시 등록해주세요");
            } else {
            }
          });
        // this.clearForm();
      } else {
        alert("빠진 항목을 확인해 주세요.");
      }
    },
    clearForm() {
      this.fields.email = "";
      this.fields.nickname = "";
      this.fields.password = "";
    },
    moveLoginpage() {
      this.$router.push("/login");
    }
  }
};
</script>
