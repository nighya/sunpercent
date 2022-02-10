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
              <v-form>
                <v-text-field
                  id="email"
                  label="ID로 쓰일 email을 입력하세요."
                  name="email"
                  prepend-icon="mdi-account"
                  type="email"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  id="nickname"
                  label="닉네임을 입력하세요."
                  name="nickname"
                  prepend-icon="mdi-alert-circle-check"
                  type="text"
                  v-model="nickname"
                ></v-text-field>
                <v-text-field
                  id="password"
                  label="비밀번호"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
                <v-text-field
                  id="confirm"
                  label="비밀번호 확인"
                  name="confirm"
                  prepend-icon="mdi-alert-circle-check"
                  type="password"
                  v-model="confirm"
                ></v-text-field>
                <v-radio-group id="gender" v-model="gender" row>
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
      email: null,
      nickname: null,
      password: null,
      confirm: null,
      gender: null,
    };
  },
  methods: {
    register() {
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
          this.$alert("회원가입이 성공했습니다. 로그인 해주세요.").then(()=>this.$router.push("/"))
            
          } else {
            console.log(err);
          }
        });
      // this.clearForm();
    },
    clearForm() {
      this.email = "";
      this.nickname = "";
      this.password = "";
    }
  }
};
</script>
