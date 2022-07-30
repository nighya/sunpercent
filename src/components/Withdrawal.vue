<template>

    <v-stepper
    v-model="e6"
    vertical
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
    >
      회원탈퇴
      <small>비밀번호 확인</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
      text
        color="primary"
        @click="e6 = 2"
      >
        다음단계
      </v-btn>
      <v-btn text>
        취소
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
      Configure analytics for this app
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
      text
        color="primary"
        @click="e6 = 3"
      >
        다음단계
      </v-btn>
      <v-btn text @click="e6 = 1">
       이전단계
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
    >
      Select an ad format and name ad unit
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
      text
        color="primary"
        @click="e6 = 4"
      >
        다음단계
      </v-btn>
      <v-btn text @click="e6 = 2">
        이전단계
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      View setup instructions
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
      text
        color="primary"
        @click="test"
      >
        확인
      </v-btn>
  
    </v-stepper-content>
  </v-stepper>
  </template
>
<script>
export default {
  data() {
    return {
      e6: 1
    };
  },
  methods: {
    test() {
      console.log("test 작동");
    }
  }
};
</script>
