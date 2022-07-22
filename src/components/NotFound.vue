<template>
  <div>
    <v-row>
      <v-col align="center">
        <v-img
          :src="notfoundimage"
          max-height="300"
          max-width="400"
        ></v-img>
        <v-card-text>
        <div class="text-subtitle-1 justify-center">
        잘못된 페이지 입니다.
        </div></v-card-text></v-col
      ></v-row
    >
  </div>
</template>
<script>
import notfoundimage from "../assets/404_3.png";
export default {
  data() {
    return { notfoundimage: notfoundimage };
  }
};
</script>
