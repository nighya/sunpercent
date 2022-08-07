<template
  ><div class="contentdetail pa-6 center">
    <v-col cols="12">
      <v-row justify="center">
        <v-card
          width="100%"
          max-width="780px"
          class="justify-center"
          v-for="(data, index) in imageDetail_multi"
          :key="index"
        >
          <v-carousel
            hide-delimiter-background
            show-arrows-on-hover
            height="auto"
          >
            <v-carousel-item
              v-for="(item, index) in data.image_path"
              :key="index"
            >
              <v-img
                v-if="data.report_count > 2"
                :src="black_image"
                class="grey--text align-center"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                max-height="500px"
                max-width="1000px"
                aspect-ratio="1"
                contain
                ><v-card-text class="font-weight-thin" align="center"
                  >신고누적으로<br />이미지차단</v-card-text
                ></v-img
              >
              <v-img
                v-else
                class="white--text align-end mx-auto"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                max-height="500px"
                max-width="1000px"
                aspect-ratio="1"
                contain
                :src="`http://192.168.0.12:4000/${item}`"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row> </template
              ></v-img>
            </v-carousel-item>
          </v-carousel>
          <template>
            <div>
              <v-row class="mt-6 ml-3">
                <v-icon
                  class="mr-1"
                  color="blue darken-3"
                  v-if="
                    $store.state.imagestore.imagedetail_multi[0].gender ==
                      `male`
                  "
                  >mdi-alpha-m-circle-outline</v-icon
                >
                <v-icon
                  class="mr-1"
                  color="pink"
                  v-if="
                    $store.state.imagestore.imagedetail_multi[0].gender ==
                      `female`
                  "
                  >mdi-alpha-w-circle-outline</v-icon
                ><span class="ml-1">{{
                  $store.state.imagestore.imagedetail_multi[0].nickname
                }}</span>
                <v-icon class="ml-6">mdi-eye-outline</v-icon>
                <span class="ml-2">
                  {{ $store.state.imagestore.imagedetail_multi[0].view_count }}
                </span>
                <v-icon class="ml-6">mdi-bullhorn-outline</v-icon>
                <span class="ml-2">{{
                  $store.state.imagestore.imagedetail_multi[0].report_count
                }}</span>
              </v-row>
              <v-card-text
                v-text="$store.state.imagestore.imagedetail_multi[0].date"
              ></v-card-text>
            </div>
          </template>

          <!-- <v-alert
            v-if="
              this.$store.state.scorestore.scorestate.filter(
                item =>
                  item.from_uid ==
                  this.$store.state.loginstore.userstate[0].user_uid
              ).length > 0
            "
            type="success"
            >내가 점수 등록한 게시물</v-alert
          > -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="
                $store.state.scorestore.scorestate.filter(
                  item =>
                    item.from_uid ==
                    $store.state.loginstore.userstate[0].user_uid
                ).length <= 0 &&
                  $store.state.imagestore.imagedetail_multi[0].user_uid !=
                    $store.state.loginstore.userstate[0].user_uid
              "
              text
              color="primary"
              dark
              @click.prevent="score_multi"
              >사진고르기</v-btn
            >

            <!-- <v-btn
              text
              color="primary"
              v-if="
                this.$store.state.imagestore.imagedetail_multi[0].user_uid ==
                  this.$store.state.loginstore.userstate[0].user_uid
              "
              dark
              @click.prevent="delete_dialog"
              >삭제하기</v-btn
            > -->

            <v-btn
              v-if="
                $store.state.imagestore.imagedetail_multi[0].user_uid !=
                  $store.state.loginstore.userstate[0].user_uid
              "
              text
              color="primary"
              :to="
                `/userpage/${$store.state.imagestore.imagedetail_multi[0].nickname}/${$store.state.imagestore.imagedetail_multi[0].user_uid}`
              "
              >프로필보기</v-btn
            >
            <v-btn
              text
              color="primary"
              v-if="
                $store.state.imagestore.imagedetail_multi[0].user_uid !=
                  $store.state.loginstore.userstate[0].user_uid
              "
              :to="
                `/note/${$store.state.imagestore.imagedetail_multi[0].nickname}/${$store.state.imagestore.imagedetail_multi[0].user_uid}`
              "
              >쪽지보내기</v-btn
            >
            <!--
            <v-btn
              v-if="
                this.$store.state.imagestore.imagedetail_multi[0].user_uid !=
                  this.$store.state.loginstore.userstate[0].user_uid
              "
              text
              color="grey"
              @click="report"
              >신고하기</v-btn
            > -->
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
    <!-- 별점주기 -->

    <div class="text-center">
      <v-dialog v-model="scoredialog_multi" width="400" persistent>
        <v-card class="elevation-16 mx-auto " width="400">
          <v-card-title class="text-h5">
            가장 좋은 사진을 선택해 주세요.
          </v-card-title>
          <v-card-text>
            <div class="text-center mt-12">
              <v-container fluid>
                <v-radio-group v-model="score_multi_value" row>
                  <v-radio
                    v-for="n in $store.state.imagestore.imagedetail_multi[0]
                      .image_path.length"
                    :key="n"
                    :label="`${n}번 사진`"
                    :value="`${n}번 사진`"
                  ></v-radio>
                </v-radio-group>
              </v-container>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn text @click="score_cancel_multi">
              취소
            </v-btn>
            <v-btn color="primary" text @click.prevent="score_send_multi">
              점수 보내기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- <div class="text-center">
      <v-dialog v-model="deletedialog" width="400" persistent>
        <v-card class="elevation-16 mx-auto " width="400">
          <v-card-title class="text-h10 justify-center">
            사진과 점수를 삭제합니다.
          </v-card-title>
          <v-card-text class="text-center mt-5">
            해당 게시물을 삭제하시겠습니까?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn text @click="delete_cancel">
              취소
            </v-btn>
            <v-btn color="primary" text @click.prevent="deleteimage">
              삭제
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center" ref="report_form" align="center" justify="center">
      <v-dialog v-model="reportdialog" width="400" persistent>
        <v-card class="elevation-16 mx-auto " width="400">
          <v-card-title class="text-h10 justify-center">
            신고하기
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-center mt-5">
            해당 게시물을 신고하시겠습니까?
          </v-card-text>
          <v-form ref="report_form">
            <v-row align="center" justify="center">
              <v-col class="d-flex" cols="12" sm="10">
                <v-select
                  :items="report_reason_list"
                  label="신고사유를 선택해 주세요."
                  outlined
                  required
                  :rules="reportRules"
                  v-model="report_reason"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions class="justify-space-between">
            <v-btn text @click="report_cancel">
              취소
            </v-btn>
            <v-btn color="primary" text @click.prevent="report_content">
              신고
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div> -->
  </div>
</template>
<script>
import http from "../http/http";
import black_image from "../assets/black.jpg";

export default {
  data() {
    return {
      black_image: black_image,
      scoredialog_multi: false,
      score_multi_value: null
    };
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
    // this.$store.dispatch("scorestore/getscore", obj);
  },
  computed: {
    imageDetail_multi() {
      return this.$store.getters["imagestore/imageDetail_multi"];
    }
  },
  methods: {
    score_multi() {
      this.scoredialog_multi = true;
    },
    score_cancel_multi() {
      this.scoredialog_multi = false;
    },
    // score_send_multi() {
    //   console.log("score_send_multi : " + this.score_multi_value);
    //   this.scoredialog_multi = false;
    // },
    score_send_multi() {
      let scoredata = {
        content_uid: this.$store.state.imagestore.imagedetail_multi[0].content_uid,
        to_uid: this.$store.state.imagestore.imagedetail_multi[0].user_uid,
        from_uid: this.$store.state.loginstore.userstate[0].user_uid,
        content_score_multi: this.score_multi_value,
        gender: this.$store.state.loginstore.userstate[0].gender
      };
      http
        .post("/contentscore_multi", scoredata, {
          withCredentials: true
        })
        .then(e => {
          this.scoredialog_multi = false;
        })
        .then(() => this.$router.go(0))
        .catch(err => {
          if (err.response.status == 403) {
            this.scoredialog_multi = false;
            this.$alert(
              "권한이 없습니다. 로그인 페이지로 이동합니다."
            ).then(() => this.$router.push("/login"));
          } else if (err.response.status == 400) {
            this.$alert("이미 점수가 등록된 게시물 입니다.")
              .then(() => (this.scoredialog_multi = false))
              .then(() => this.$router.go(0));
            // this.$router.go(0)
          } else {
            this.scoredialog_multi = false;
          }
        });
    }
  }
};
</script>
