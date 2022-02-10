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
              <v-form>
                <v-text-field
                  id="email"
                  label="email"
                  name="email"
                  prepend-icon="mdi-account"
                  type="email"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  id="password"
                  label="비밀번호"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="purple lighten-3" dark @click="moveRegisterpage"
                >회원가입</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn color="purple lighten-3" dark @click="login">로그인</v-btn>
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
      password: null
    };
  },
  mounted: function mounted() {
    this.logout();
  },
  methods: {
    login() {
      let userloginObj = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("loginstore/login", userloginObj);
      this.clearForm();
      this.$router.go(-1);
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
    }
  }
};
</script>
