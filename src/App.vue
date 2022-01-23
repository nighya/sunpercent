<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app dark :src="drawerImage">
      <v-list>
        <v-list-item class="ma-0.5" @click="moveMypage">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{this.$store.state.loginstore.userstate[0].nickname}}
            </v-list-item-title>
            <v-list-item-subtitle>{{this.$store.state.loginstore.userstate[0].email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      height="100"
      app
      color="primary"
      dark
      :src="drawerImage"
      prominent
    >
      <!-- <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template> -->

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="title"
        ><router-link class="toolbar__title" to="/"
          >SunPercent</router-link
        ></v-app-bar-title
      >

      <v-spacer></v-spacer>
      <div>
        <v-btn class="min-button mr-8" icon to="/login" v-if="!IsLoginedgeters"
          ><v-icon small>mdi-login</v-icon><span>로그인</span></v-btn
        >
        <v-btn class="min-button mr-8" icon v-else @click="logout"
          ><v-icon small>mdi-logout</v-icon><span>로그아웃</span></v-btn
        >
        <v-btn
          class="min-button mr-5"
          icon
          to="/register"
          v-if="!IsLoginedgeters"
          ><v-icon small>mdi-account-plus-outline</v-icon
          ><span>회원등록</span></v-btn
        >
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import drawerImage from "./assets/gra_rpy.jpg";
export default {
  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home-heart", to: "/" },
      { title: "Content", icon: "mdi-format-list-text", to: "/content" },
      { title: "Mypage", icon: "mdi-help-box", to: "/mypage/:user_uid" }
    ],
    drawerImage: drawerImage
  }),
  methods: {
    moveMypage() {
      const user_uid = this.$store.state.loginstore.userstate[0].user_uid
      if (this.$route.path !== `/mypage/${user_uid}`) this.$router.push(`/mypage/${user_uid}`);
      console.log(user_uid);
    },
    logout() {
      this.$store.dispatch("loginstore/logout");
      sessionStorage.clear();
      this.$router.push({ name: "Login" });
    }
  },
  mounted() {
    this.$store.state.loginstore.userstate;
    
  },
  computed: {
    IsLoginedgeters() {
      return this.$store.getters["loginstore/isLoginedgetters"];
    }
  }
};
</script>

<style scoped>
.min-button::before {
  display: none;
}
.toolbar__title {
  color: white;
  text-decoration: none;
}
</style>
