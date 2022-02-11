<template>
  <div class="register pa-6">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="purple lighten-3" dark flat>
              <v-toolbar-title></v-toolbar-title>
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
                  v-model="email"
                  :rules="emailRules"
                ></v-text-field>
                <v-text-field
                  id="nickname"
                  label="닉네임을 입력하세요."
                  name="nickname"
                  prepend-icon="mdi-alert-circle-check"
                  type="text"
                  v-model="nickname"
                  :rules="nicknameRules"
                ></v-text-field>
                <v-text-field
                  id="password"
                  label="비밀번호"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                ></v-text-field>
                <v-text-field
                  id="confirm"
                  label="비밀번호 확인"
                  name="confirm"
                  prepend-icon="mdi-alert-circle-check"
                  type="password"
                  v-model="confirm"
                  :rules="confirmPasswordRules"
                ></v-text-field>
                <v-radio-group
                  id="gender"
                  v-model="gender"
                  row
                  :rules="genderRules"
                >
                  <v-radio label="남" value="male"></v-radio>
                  <v-radio label="여" value="female"></v-radio>
                </v-radio-group>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="purple lighten-3" dark @click="register"
                >회원등록</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      passwordRules: [
        value => !!value || "비밀번호를 입력해 주세요.",
        value =>
          (value && value.length >= 4) ||
          "최소 문자의 길이가 4 이상이어야 합니다."
      ],
      confirmPasswordRules: [
        value => !!value || "비밀번호를 다시 입력해 주세요.",
        value => value === this.password || "비밀번호가 일치하지 않습니다."
      ],
      emailRules: [
        v =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "이메일 형식에 맞춰 입력하세요."
      ],
      genderRules: [v => !!v || "성별이 선택되지 않았습니다."],
      nicknameRules: [
        v => !!v || "닉네임을 입력해 주세요.",
        v => !(v && v.length >= 30) || "닉네임은 30자 이상 입력할 수 없습니다.",
        v =>
          !/[~!@#$%^&*()_+|<>?:{}]/.test(v) ||
          "닉네임에는 특수문자를 사용할 수 없습니다."
      ],

      email: null,
      nickname: null,
      password: null,
      confirm: null,
      gender: null
    };
  },
  methods: {
    register() {
      const validate = this.$refs.form.validate();
      if (validate) {
        let userregisterObj = {
          email: this.email,
          nickname: this.nickname,
          password: this.password,
          gender: this.gender
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
              console.log("else log  :  " + err.status);
            } else {
              console.log("else log  :  " + err.status);
            }
          });
        // this.clearForm();
      } else {
        alert("빠진 항목을 확인해 주세요.");
      }
    },
    clearForm() {
      this.email = "";
      this.nickname = "";
      this.password = "";
    }
  }
};
</script>
