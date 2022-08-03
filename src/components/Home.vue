<template>
  <div>
    <div>
      <Content></Content>
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
        <v-btn
          text
          class="pa-3"
          target="_blank"
          href="http://192.168.0.12:8080/PolicyPrivacy"
        >
          개인정보처리방침 </v-btn
        ><span style="color:grey; padding:12px;">help@sunpercent.com</span>
        <span class="ml-6">© 2022 sunpercent All Rights Reserved.</span>
      </v-col>
    </v-footer>
  </div>
</template>
<script>
import Content from "./Content.vue";

export default {
  components: { Content },
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
