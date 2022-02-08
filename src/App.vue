<template>
  <v-app id="inspire">
    <v-navigation-drawer width="200" 
         v-model="drawer" app dark :src="drawerImage_h">
      <v-list>
        <v-list-item class="ma-0.5" @click="moveMypage">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ this.$store.state.loginstore.userstate[0].nickname }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
              this.$store.state.loginstore.userstate[0].email
            }}</v-list-item-subtitle>
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

    <v-app-bar app color="primary" dark :src="drawerImage">
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
        <!-- <v-btn
          class="min-button mr-8"
          icon
          v-if="IsLoginedgeters"
          @click="moveMypage"
          ><v-icon small>mdi-card-account-details-outline</v-icon
          ><span>내 정보</span></v-btn
        >
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
        > -->
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
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import drawerImage from "./assets/gra_rpy.jpg";
import drawerImage_h from "./assets/gra_rpy_h.jpg";
export default {
  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home-heart", to: "/" },
      { title: "Content", icon: "mdi-format-list-text", to: "/content" }
    ],
    drawerImage: drawerImage,
    drawerImage_h:drawerImage_h,
    menuitems: [
      { title: "로그인", icon: "mdi-login",},
      { title: "로그아웃", icon: "mdi-logout" },
      { title: "내정보", icon: "mdi-card-account-details-outline" },
      { title: "회원등록", icon: "mdi-account-plus-outline" }
    ]
  }),
  methods: {
    moveMypage() {
      const user_uid = this.$store.state.loginstore.userstate[0].user_uid;
      if (this.$route.path !== `/mypage/${user_uid}`)
        this.$router.push(`/mypage/${user_uid}`);
    },
    logout() {
      this.$store.dispatch("loginstore/logout");
      sessionStorage.clear();
      this.$router.push({ name: "Login" });
    },
    menuclick(menuclick) {
      switch (menuclick.title) {
        case "로그인":
          this.logout();
          this.$router.push("/login");
          break;
        case "로그아웃":
          this.logout();
          break;
        case "내정보":
          this.moveMypage();
          break;
        case "회원등록":
          this.logout();
          this.$router.push("/register")
      }
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
