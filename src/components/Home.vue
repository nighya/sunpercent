<template>
  <div>
    <div>
      <Content></Content>
      <Content_multi></Content_multi>
    </div>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        <v-btn
          color="grey"
          text
          class="pa-3"
          target="_blank"
          href="http://192.168.0.12:8080/TermsOfUse"
        >
          이용약관
        </v-btn>
        <span style="color:grey; padding:12px;">|</span>
        <v-btn
          text
          class="pa-3"
          target="_blank"
          href="http://192.168.0.12:8080/PolicyPrivacy"
        >
          개인정보처리방침 </v-btn
        ><span style="color:grey; padding:12px;">|</span><span style="color:grey; padding:12px;">help@sunpercent.com</span>
        <v-divider class="pa-1"></v-divider>
        <span class="ml-6">© 2022 sunpercent All Rights Reserved.</span>
      </v-col>
    </v-footer>
  </div>
</template>
<script>
import Content from "./Content.vue";
import Content_multi from "./Content_multi.vue";

export default {
  components: { Content,Content_multi },
  data() {
    return {};
  }
};
</script>
<style>
.test a,
u {
  text-decoration: none;
}
</style>
