<template>
  <div class="contentdetail pa-6">
    <v-img
      :src="`http://192.168.0.12:4000/${$route.params.datas.image_path}`"
    ></v-img>
      <v-container fluid>
    <p>{{ radios || 'null' }}</p>
    <v-radio-group
      v-model="radios"
      mandatory
    >
      <v-radio
        label="1점"
        value="1"
      ></v-radio>
      <v-radio
        label="2점"
        value="2"
      ></v-radio>
            <v-radio
        label="3점"
        value="3"
      ></v-radio>
            <v-radio
        label="4점"
        value="4"
      ></v-radio>
            <v-radio
        label="5점"
        value="5"
      ></v-radio>
            <v-radio
        label="6점"
        value="6"
      ></v-radio>
            <v-radio
        label="7점"
        value="7"
      ></v-radio>
    </v-radio-group>
    <v-btn @click="SendScore">제출</v-btn>
  </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radios:null,
    };
  },
  methods:{
    SendScore(){
      console.log(this.radios)
    }
  }
};
</script>
