<template>
  <v-stepper v-model="step_value" vertical>
    <v-stepper-step :complete="step_value > 1" step="1">
      회원탈퇴 시작
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card class="mb-2" height="200px"
        ><div class="ma-2">
          회원탈퇴시 작성한 게시물과 가입한 정보가 삭제됩니다.
        </div></v-card
      >
      <v-btn text color="primary" @click="step_value = 2">
        다음단계
      </v-btn>
      <v-btn text @click="movePrevious_page">
        취소
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="step_value > 2" step="2">
      비밀번호 확인
      <!-- <small>비밀번호를 입력해주세요.</small> -->
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card class="mb-2" height="200px">
        <v-form ref="form">
          <v-text-field
            v-model="password"
            class="ml-2 mr-2"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
          ></v-text-field></v-form
      ></v-card>
      <v-btn :loading="loading" text color="primary" @click="delete_user">
        다음단계
      </v-btn>
      <v-btn text @click="step_value = 1">
        이전단계
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="step_value > 3" step="3">
      회원탈퇴 완료
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card class="mb-2" height="200px"
        ><div class="ma-2">
          회원 탈퇴 처리가 완료되었습니다. 그동안 이용해 주셔서 다시 한번 깊은
          감사드리며 다시 뵙게 될 날을 기대하면서 좀 더 나은 서비스를 제공하도록
          더 노력하겠습니다.<br />- sunpercent 운영자 올림 -
        </div></v-card
      >
      <v-btn text color="primary" @click="moveHome">
        확인
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import http from "../http/http";

export default {
  data() {
    return {
      loading: false,
      step_value: 1,
      user_uid: this.$store.state.loginstore.userstate[0].user_uid,
      email: this.$store.state.loginstore.userstate[0].email,
      nickname: this.$store.state.loginstore.userstate[0].nickname,
      password: null
    };
  },
  methods: {
    async delete_user() {
      const validate = this.$refs.form.validate();
      if (validate) {
        const withdrawal_obj = {
          user_uid: this.user_uid,
          email: this.email,
          nickname: this.nickname,
          password: this.password
        };

        try {
          this.loading = true;
          const response = await http.post(
            "/delete_user_goodbye",
            withdrawal_obj,
            {
              withCredentials: true
            }
          );
          if (response.status === 200) {
            this.loading = false;
            this.logout();
            this.step_value = 3;
          } else if (response.status === 400) {
            this.$alert("회원탈퇴에 실패하였습니다.(-1)");
            this.loading = false;
          } else {
            this.$alert("회원탈퇴에 실패하였습니다.(-2)");
            this.loading = false;
          }
          //   console.log("response :  " + JSON.stringify(response));
        } catch (err) {
          alert("회원탈퇴에 실패하였습니다.(-3)");
          this.loading = false;
          console.log("catch에러  :" + err);
          throw err;
        }

        // this.clearForm();
      } else {
        alert("빠진 항목이나 메일주소를 확인해 주세요.");
        this.loading = false;
      }
    },
    movePrevious_page() {
      this.$router.go(-1);
    },
    moveHome() {
      this.logout();
      this.$router.push("/");
    },
    logout() {
      this.$store.dispatch("loginstore/logout");
      sessionStorage.clear();
      localStorage.clear();

    }
  }
};
</script>
