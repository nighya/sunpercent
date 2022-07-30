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
        <v-list-item-content>
          <v-list-item-title
            class="mt-2 text-h6 font-weight-black"
            align="center"
            justify="center"
          >
            SunPercent
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="menuclick(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-bottom-navigation
      class="d-flex d-sm-none"
      :value="bottom_nav_bar"
      color="primary"
      horizontal
      app
      grow
    >
      <v-btn
        v-for="item in bottom_items"
        :key="item.title"
        @click="menuclick(item)"
      >
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-app-bar app dark class="grey darken-4">
      <v-app-bar-nav-icon
        v-if="drawer == false"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-app-bar-title class="title font-weight-black" v-if="drawer == false"
        ><router-link class="toolbar__title" to="/"
          >SunPercent</router-link
        ></v-app-bar-title
      >

      <v-spacer></v-spacer>
      <div>
        <v-btn class="search" icon to="/contentupload">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn class="search" icon to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <!-- <v-menu bottom left>
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
        </v-menu> -->

        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar size="36">
                <v-img
                contain
                  v-if="
                    $store.state.loginstore.userstate[0].profile_image == null
                  "
                  :src="baseimage"
                />
                <v-img v-else
                  contain
                  :src="
                    `http://192.168.0.12:4000${$store.state.loginstore.userstate[0].profile_image}`
                  "
                />
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar>
                  <v-img
                  contain
                    v-if="
                      $store.state.loginstore.userstate[0].profile_image == null
                    "
                    :src="baseimage"
                  />
                  <v-img v-else
                  contain
                    :src="
                      `http://192.168.0.12:4000${this.$store.state.loginstore.userstate[0].profile_image}`
                    "
                  />
                </v-avatar>
                <h3>
                  {{ this.$store.state.loginstore.userstate[0].nickname }}
                </h3>
                <p class="text-caption mt-1">
                  {{ this.$store.state.loginstore.userstate[0].email }}
                </p>
                <v-list>
                  <v-list-item
                    v-for="(menuitem, i) in menuitems"
                    :key="i"
                    @click="menuclick(menuitem)"
                  >
                    <v-icon small>{{ menuitem.icon }}</v-icon>
                    <v-list-item-title>{{ menuitem.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import baseimage from "../src/assets/base_user.png";
export default {
  data: () => ({
    baseimage: baseimage,
    bottom_nav_bar: 1,
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home-heart" },
      { title: "Content", icon: "mdi-format-list-text" },
      { title: "Profile", icon: "mdi-card-account-details-outline" },
      { title: "MyNote", icon: "mdi-email-outline" }
    ],
    menuitems: [
      { title: "로그인", icon: "mdi-login" },
      { title: "로그아웃", icon: "mdi-logout" },
      { title: "내정보", icon: "mdi-card-account-details-outline" },
      { title: "회원등록", icon: "mdi-account-plus-outline" }
    ],
    bottom_items: [
      { title: "Refresh", icon: "mdi-refresh" },
      { title: "Home", icon: "mdi-home-heart" },
      { title: "Content", icon: "mdi-format-list-text" },
      { title: "Profile", icon: "mdi-account" }
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
      // this.$router.push({ name: "Login" }).catch(() => true);
    },
    menuclick(menuclick) {
      switch (menuclick.title) {
        case "Refresh":
          this.$router.go();
          break;
        case "Home":
          this.$router.push("/").catch(() => true);
          break;
        case "Content":
          this.$router.push("/content").catch(() => true);
          break;
        case "Profile":
          this.moveMypage();
          break;
        case "MyNote":
          this.$router
            .push(
              `/MyNote/${this.$store.state.loginstore.userstate[0].user_uid}`
            )
            .catch(() => true);
          break;
        case "로그인":
          this.logout();
          this.$router.replace("/login").catch(() => true);
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
