<template
  ><div>{{ imageDetail_multi }}</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch(
      "imagestore/getimage_multi",
      this.$route.params.content_uid
    );
    const obj = {
      content_uid: this.$route.params.content_uid,
      user_uid: this.$store.state.loginstore.userstate[0].user_uid
      };
    this.$store.dispatch("scorestore/getscore", obj);
  },
  computed: {
    imageDetail_multi() {
      return this.$store.getters["imagestore/imageDetail_multi"];
    }
  },
  methods: {}
};
</script>
