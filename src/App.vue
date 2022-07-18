<template>
  <v-app id="inspire">
    <v-navigation-drawer
      class="grey darken-4"
      width="180"
      v-model="drawer"
      app
      dark
      :permanent="$vuetify.breakpoint.smAndUp"
    >
      <v-list-item>
        <v-list-item-content >
          <v-list-item-title class="text-h6"  align="center"
        justify="center" >
            SunPercent
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

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

    <v-app-bar app dark class="grey darken-4">
      <v-app-bar-nav-icon
        v-if="drawer == false"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>


        
      <v-app-bar-title class="title" v-if="drawer == false"
        ><router-link class="toolbar__title" to="/"
          >SunPercent</router-link
        ></v-app-bar-title
      >

      <v-spacer></v-spacer>
      <div>
        <v-btn class="search" icon to="/contentupload">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn class="search" icon to="/content/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(menuitem, i) in menuitems"
              :key="i"
              @click="menuclick(menuitem)"
            >
              <v-icon class="mr-2" small>{{ menuitem.icon }}</v-icon>
              <v-list-item-title>{{ menuitem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import baseimage from "./assets/bg.png";
export default {
  data: () => ({
    baseimage: baseimage,
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home-heart", to: "/" },
      { title: "Content", icon: "mdi-format-list-text", to: "/content" }
    ],
    menuitems: [
      { title: "로그인", icon: "mdi-login" },
      { title: "로그아웃", icon: "mdi-logout" },
      { title: "내정보", icon: "mdi-card-account-details-outline" },
      { title: "회원등록", icon: "mdi-account-plus-outline" }
    ]
  }),
  methods: {
    moveMypage() {
      const user_uid = this.$store.state.loginstore.userstate[0].user_uid;
      if (this.$route.path !== `/mypage/${user_uid}`)
        this.$router.push(`/mypage/${user_uid}`).catch(() => true);
    },
    logout() {
      this.$store.dispatch("loginstore/logout");
      sessionStorage.clear();
      this.$router.push({ name: "Login" }).catch(() => true);
    },
    menuclick(menuclick) {
      switch (menuclick.title) {
        case "로그인":
          this.logout();
          this.$router.push("/login").catch(() => true);
          break;
        case "로그아웃":
          this.logout();
          break;
        case "내정보":
          this.moveMypage();
          break;
        case "회원등록":
          this.logout();
          this.$router.push("/register").catch(() => true);
      }
    }
  },
  mounted() {
    this.$store.state.loginstore.userstate;
    // const obj = {
    //   user_uid: this.$store.state.loginstore.userstate[0].user_uid
    // };
    // this.$store.dispatch("loginstore/getUser", obj);
    this.$store.dispatch(
      "loginstore/getUserPoint",
      this.$store.state.loginstore.userstate[0].user_uid
    );
  },
  computed: {
    IsLoginedgeters() {
      return this.$store.getters["loginstore/isLoginedgetters"];
    }
    // getUser() {
    //   return this.$store.dispatch(
    //     "loginstore/getUser",
    //     this.$store.state.loginstore.userstate[0].user_uid
    //   );
    // }
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
