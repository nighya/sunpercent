<template>
  <div class="login pa-6">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title class="ml-2">Login</v-toolbar-title>
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
            <div class="ma-5 subtitle-2" align="center">
              <a align="center" @click="FindPassword">비밀번호 찾기</a>
            </div>
            <v-card-actions class="justify-center">
              <v-btn color="grey darken-3" dark @click="moveRegisterpage"
                >회원가입</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-3"
                dark
                @click="login"
                :loading="loading"
                >로그인</v-btn
              >
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
      loading: false,
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

  methods: {
    async login() {
      this.loading = true;
      const axios_config = {
        headers: {
          // "X-Requested-With": "XMLHttpRequest",
          'X-Requested-With': 'XMLHttpRequest'
        }
      };
      const validate = this.$refs.form.validate();
      const user_login_ip = await axios.get(
        "https://cors.sunpercent.com/https://api.ipify.org",
        axios_config
      );
      if (validate) {
        let userloginObj = {
          email: this.email,
          password: this.password,
          user_login_ip: user_login_ip.data
        };
        this.$store.dispatch("loginstore/login", userloginObj);
        this.clearForm();
        this.loading = false;
        // this.$router.go(-1);
      } else {
        alert("로그인되지 않았습니다.");
        this.loading = false;
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
      this.$router.push("/findpassword");
    }
  }
};
</script>
