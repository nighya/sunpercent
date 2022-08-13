<template
  ><div class="contentdetail pa-6 center">
    {{ average_total }}{{ pre_url_set }}
    <v-col cols="12">
      <v-row justify="center">
        <v-card
          width="100%"
          max-width="780px"
          class="justify-center"
          v-for="(data, index) in imageDetail_multi"
          :key="index"
          ><v-card-title>{{
            $store.state.imagestore.imagedetail_multi[0].title
          }}</v-card-title>
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
                max-height="500px"
                max-width="1000px"
                aspect-ratio="1"
                contain
                :src="`http://192.168.0.12:4000/${item}`"
                ><div class="pa-9" align="center" justify="center">
                  {{ index + 1 }}번 사진
                </div>
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

          <v-alert
            v-if="
              $store.state.scorestore.scorestate_multi.filter(
                item =>
                  item.from_uid == $store.state.loginstore.userstate[0].user_uid
              ).length > 0
            "
            type="success"
            >내가 사진 선택 완료한 게시물</v-alert
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="
                $store.state.scorestore.scorestate_multi.filter(
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

            <v-btn
              text
              color="primary"
              v-if="
                $store.state.imagestore.imagedetail_multi[0].user_uid ==
                  $store.state.loginstore.userstate[0].user_uid
              "
              dark
              @click.prevent="delete_dialog"
              >삭제하기</v-btn
            >

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

            <v-btn
              v-if="
                $store.state.imagestore.imagedetail_multi[0].user_uid !=
                  $store.state.loginstore.userstate[0].user_uid
              "
              text
              color="grey"
              @click.prevent="report_multi"
              >신고하기</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>

    <div id="chart" class="mt-10 mr-7">
      <apexchart
        class="d-flex justify-center"
        height="350"
        type="donut"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>

    <div class="text-center">
      <v-dialog v-model="scoredialog_multi" width="400" persistent>
        <v-card class="elevation-16 mx-auto " width="400">
          <v-card-title class="text-h5">
            가장 좋은 사진을 선택해 주세요.
          </v-card-title>
          <v-card-text>
            <div class="text-center mt-12">
              <v-container fluid>
                <v-form ref="form">
                  <v-radio-group v-model="score_multi_value" row :rules="rules">
                    <v-radio
                      v-for="n in $store.state.imagestore.imagedetail_multi[0]
                        .image_path.length"
                      :key="n"
                      :label="`${n}번 사진`"
                      :value="`${n}번 사진`"
                    ></v-radio>
                  </v-radio-group>
                </v-form>
              </v-container>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn text @click="score_cancel_multi">
              취소
            </v-btn>
            <v-btn
              :loading="loading"
              color="primary"
              text
              @click.prevent="score_send_multi"
            >
              사진 선택 완료하기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-dialog v-model="deletedialog" width="400" persistent>
        <v-card class="elevation-16 mx-auto " width="400">
          <v-card-title class="text-h10 justify-center">
            사진과 통계점수를 삭제합니다.
          </v-card-title>
          <v-card-text class="text-center mt-5">
            해당 게시물을 삭제하시겠습니까?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn text @click="delete_cancel">
              취소
            </v-btn>
            <v-btn color="primary" text @click.prevent="deleteimage_multi">
              삭제
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center" ref="report_form" align="center" justify="center">
      <v-dialog v-model="reportdialog_multi" width="400" persistent>
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
            <v-btn text @click="report_cancel_multi">
              취소
            </v-btn>
            <v-btn color="primary" text @click.prevent="report_content_multi">
              신고
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
        <v-divider class="mt-15 mb-10"></v-divider>
    <div ><Content_multi></Content_multi></div>
  </div>
</template>
<script>
import http from "../http/http";
import black_image from "../assets/black.jpg";
import VueApexCharts from "vue-apexcharts";
import ls from "localstorage-slim";
ls.config.encrypt = true;
import Content_multi from './Content_multi.vue'

export default {
  components: {
    apexcharts: VueApexCharts,
    Content_multi
  },
  data() {
    return {
      loading: false,
      black_image: black_image,
      reportRules: [v => !!v || "신고사유가 선택되지 않았습니다."],
      report_reason: null,
      report_reason_list: [
        "너무 선정적 입니다.",
        "사진을 알아볼 수가 없어요.",
        "중복된 게시물 입니다.",
        "게시판 성격과 맞지 않아요.",
        "광고성 게시물 입니다.",
        "사진편집이 과해 보여요",
        "외모 사진이 아닙니다.",
        "작성자 성별과 사진의 성별이 다릅니다."
      ],
      reportdialog_multi: false,
      scoredialog_multi: false,
      score_multi_value: null,
      deletedialog: false,

      rules: [v => !!v || "선택되지 않았습니다."],
      score_total: null,
      score_a: null,
      score_b: null,
      score_c: null,
      //차트 데이터
      series: [],
      chartOptions: {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                  label: "TOTAL",
                  fontSize: "12px",
                  color: "white"
                },
                value: {
                  fontSize: "22px",
                  show: true,
                  color: "blue"
                }
              }
            }
          }
        },
        labels: ["1번 사진", "2번 사진", "3번 사진"],
        title: {
          text: "사진 선택 통계",
          align: "center"
        },
        legend: {
          position: "bottom"
        },
        theme: {
          mode: "dark",
          palette: "palette1",
          monochrome: {
            enabled: false,
            color: "#255aee",
            shadeTo: "light",
            shadeIntensity: 0.65
          }
        },
        chart: {
          type: "donut",
          background: "#121212"
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.$store.dispatch(
      "imagestore/getimage_multi",
      this.$route.params.content_uid
    );
    const obj = {
      content_uid: this.$route.params.content_uid
    };
    this.$store.dispatch("scorestore/getscore_multi", obj);
  },
  computed: {
    pre_url_set() {
      return ls.set("pre_target", this.$router.currentRoute.fullPath);
    },
    imageDetail_multi() {
      return this.$store.getters["imagestore/imageDetail_multi"];
    },
    average_total() {
      const total = this.$store.state.scorestore.scorestate_multi;
      let data_a = 0;
      let data_b = 0;
      let data_c = 0;
      this.series = [];
      try {
        total.map(data => {
          if (data.content_score_multi == "1번 사진") {
            data_a += 1;
            // console.log("1번사진");
          }
          if (data.content_score_multi == "2번 사진") {
            data_b += 1;
            // console.log("2번사진");
          }
          if (data.content_score_multi == "3번 사진") {
            data_c += 1;
            // console.log("3번사진");
          }
        });
        this.series.push(data_a, data_b, data_c);
      } catch (err) {}
    }
  },
  methods: {
    delete_cancel() {
      this.deletedialog = false;
    },
    deleteimage_multi() {
      let imagedataObj = {
        content_uid: this.$store.state.imagestore.imagedetail_multi[0]
          .content_uid,
        image_path: this.$store.state.imagestore.imagedetail_multi[0]
          .image_path,
        user_uid: this.$store.state.loginstore.userstate[0].user_uid
      };
      this.$store.dispatch("imagestore/deleteImage_multi", imagedataObj);
      this.$router.go(-1);
    },
    delete_dialog() {
      this.deletedialog = true;
    },
    report_content_multi() {
      const validate = this.$refs.report_form.validate();
      if (validate) {
        let reportdataObj = {
          content_uid: this.$store.state.imagestore.imagedetail_multi[0]
            .content_uid,
          to_uid: this.$store.state.imagestore.imagedetail_multi[0].user_uid,
          from_uid: this.$store.state.loginstore.userstate[0].user_uid,
          report_reason: this.report_reason
        };
        http
          .post("/sun/report_multi", reportdataObj, {
            withCredentials: true
          })
          .then(e => {
            this.reportdialog = false;
          })
          .then(() => this.$router.go(0))
          .catch(err => {
            if (err.response.status == 403) {
              this.reportdialog = false;
              this.$alert(
                "권한이 없습니다. 로그인 페이지로 이동합니다."
              ).then(() => this.$router.push("/login"));
            } else if (err.response.status == 400) {
              this.$alert("이미 신고완료한 게시물 입니다.")
                .then(() => (this.reportdialog = false))
                .then(() => this.$router.go(0));
              // this.$router.go(0)
            } else {
              this.reportdialog = false;
            }
          });
      } else {
        alert("신고사유가 선택되지 않았습니다.");
      }
    },
    report_cancel_multi() {
      this.reportdialog_multi = false;
    },
    report_multi() {
      this.reportdialog_multi = true;
    },
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
      this.loading = true;
      const validate = this.$refs.form.validate();
      if (validate) {
        let scoredata = {
          content_uid: this.$store.state.imagestore.imagedetail_multi[0]
            .content_uid,
          to_uid: this.$store.state.imagestore.imagedetail_multi[0].user_uid,
          from_uid: this.$store.state.loginstore.userstate[0].user_uid,
          content_score_multi: this.score_multi_value,
          gender: this.$store.state.loginstore.userstate[0].gender
        };
        http
          .post("/sun/contentscore_multi", scoredata, {
            withCredentials: true
          })
          .then(e => {
            this.loading = false;
            this.scoredialog_multi = false;
            try {
              const content_uid = this.$store.state.imagestore
                .imagedetail_multi[0].content_uid;
              const payload = {
                content_uid: this.$store.state.imagestore.imagedetail_multi[0]
                  .content_uid
              };
              http.post(`/sun/contentscore_multi/${content_uid}`, payload);
            } catch (e) {
              console.log("score_send_multi 에러");
            }
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
  }
};
</script>
