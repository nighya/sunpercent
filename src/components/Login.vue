<template>
  <div class="login pa-6">
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
                  label="email"
                  name="email"
                  prepend-icon="mdi-account"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
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
              </v-form>
            </v-card-text>
            <v-card-text @click="FindPassword">비밀번호 찾기</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="purple lighten-3" dark @click="moveRegisterpage"
                >회원가입</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn color="purple lighten-3" dark @click="login" :loading="loading">로그인</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loading:false,
      passwordRules: [value => !!value || "비밀번호를 입력해 주세요."],
      emailRules: [
        v => !!v || "이메일을 입력해 주세요",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "이메일 형식에 맞춰 입력하세요."
      ],
      email: null,
      password: null
    };
  },
  mounted: function mounted() {
    this.logout();
  },
  methods: {
    async login() {
      this.loading = true;
      const proxy_cors_url = "http://192.168.0.25:8888/";
      const validate = this.$refs.form[0].validate();
      const user_login_ip = await axios.get(
        proxy_cors_url + "https://api.ipify.org"
      );
      if (validate) {
        let userloginObj = {
          email: this.email,
          password: this.password,
          user_login_ip: user_login_ip.data
        };
        this.$store.dispatch("loginstore/login", userloginObj);
        this.clearForm();
        this.loading = false
        this.$router.go(-1);
      } else {
        alert("로그인되지 않았습니다.");
      }
      // let userloginObj = {
      //   email: this.email,
      //   password: this.password
      // };
      // this.$store.dispatch("loginstore/login", userloginObj);
      // this.clearForm();
      // this.$router.go(-1);
    },
    clearForm() {
      this.email = "";
      this.password = "";
    },
    moveRegisterpage() {
      this.$router.push("/register");
    },
    logout() {
      this.$store.dispatch("loginstore/logout");
      sessionStorage.clear();
    },
    FindPassword() {
      this.$router.push("/findpassword")
    }
  }
};
</script>
