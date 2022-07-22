<template>
  <div class="contentdetail pa-6 center">
    <v-col cols="12">
      <v-row justify="center">
        <v-card width="100%" max-width="780px" class="justify-center">
          <v-img
            :src="
              `http://192.168.0.12:4000${this.$store.state.imagestore.imagedetail[0].image_path}`
            "
            class="white--text align-end mx-auto"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            max-height="500px"
            max-width="1000px"
            @click="newWindowImage"
            contain
          >
            <div class="ms-4">
              닉네임
              <v-card-text
                v-text="this.$store.state.imagestore.imagedetail[0].nickname"
              >
              </v-card-text>
              <!-- 메뉴띄우기 -->
              <template>
                <div>
                  <v-menu offset-y max-width="120px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-card-text
                        v-bind="attrs"
                        v-on="on"
                        v-text="$store.state.imagestore.imagedetail[0].nickname"
                      >
                      </v-card-text>
                    </template>
                    <v-list>
                      <v-list-item
                        link
                        :to="
                          `/userpage/${$store.state.imagestore.imagedetail[0].nickname}/${$store.state.imagestore.imagedetail[0].user_uid}`
                        "
                      >
                        <v-list-item-title>프로필보기</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        link
                        :to="
                          `/note/${$store.state.imagestore.imagedetail[0].nickname}/${$store.state.imagestore.imagedetail[0].user_uid}`
                        "
                      >
                        <v-list-item-title>쪽지보내기</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
            </div>
            <div class="ms-4">
              날짜
              <v-card-text
                v-text="this.$store.state.imagestore.imagedetail[0].date"
              ></v-card-text>
            </div>
            <div class="ms-4">
              조회수
              <v-card-text
                v-text="this.$store.state.imagestore.imagedetail[0].view_count"
              ></v-card-text>
            </div>
            <div class="ms-4">
              
              <v-card-text
                v-text="
                  this.$store.state.imagestore.imagedetail[0].report_count
                "
              >
              </v-card-text>
            </div>

            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-alert
            v-if="
              this.$store.state.scorestore.scorestate.filter(
                item =>
                  item.from_uid ==
                  this.$store.state.loginstore.userstate[0].user_uid
              ).length > 0
            "
            type="success"
            >내가 점수 등록한 게시물</v-alert
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="
                this.$store.state.scorestore.scorestate.filter(
                  item =>
                    item.from_uid ==
                    this.$store.state.loginstore.userstate[0].user_uid
                ).length <= 0 &&
                  this.$store.state.imagestore.imagedetail[0].user_uid !=
                    this.$store.state.loginstore.userstate[0].user_uid
              "
              dark
              @click.prevent="score"
              >점수주기</v-btn
            >
            <v-btn
              v-if="
                this.$store.state.imagestore.imagedetail[0].user_uid ==
                  this.$store.state.loginstore.userstate[0].user_uid
              "
              dark
              @click.prevent="delete_dialog"
              >삭제하기</v-btn
            >
            <v-btn @click="report">신고하기</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
    <!-- 별점주기 -->

    <div class="text-center">
      <v-dialog v-model="scoredialog" width="400" persistent>
        <v-card class="elevation-16 mx-auto " width="400">
          <v-card-title class="text-h5">
            이 사진의 외모는 몇점 입니까?
          </v-card-title>
          <v-card-text>
            해당 게시물 점수는 게시물 작성자에게만 표시 됩니다.<br />(7점 만점)
            <div class="text-center mt-12">
              <v-rating
                v-model="rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                length="7"
                x-large
              ></v-rating>
              <v-card-text>{{ this.rating }} / 7</v-card-text>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn text @click="score_cancel">
              취소
            </v-btn>
            <v-btn color="primary" text @click.prevent="score_send">
              점수 보내기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
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
    </div>
    <div>
      <v-dialog v-model="showimage_dialog" width="auto"
        ><v-img
          max-width="100%"
          max-height="100%"
          :src="
            `http://192.168.0.12:4000${this.$store.state.imagestore.imagedetail[0].image_path}`
          "
          ><v-col class="text-right"
            ><v-icon large right @click="showimage_dialog_close" dark
              >mdi-close</v-icon
            ></v-col
          ></v-img
        ></v-dialog
      >
    </div>
    <div
      class="mt-10 mr-7"
      v-if="
        this.$store.state.imagestore.imagedetail[0].user_uid ===
          this.$store.state.loginstore.userstate[0].user_uid
      "
    >
      <apexcharts
        class="d-flex justify-center"
        height="350"
        type="bar"
        :options="chartOptions"
        :series="series"
      />
      <div>
        <v-row justify="center">
          총합계 평균점수 : {{ average_total }}&nbsp;({{ total_number }}명)
          <v-col  cols="1"></v-col> 남자 : {{ average_male }}&nbsp;({{
            male_number
          }}명) &nbsp;&nbsp;&nbsp; 여자 : {{ average_female }}&nbsp;({{
            female_number
          }}명)
        </v-row>
      </div>
    </div>
    <div v-else class="pt-10" align="center">
      <v-alert
        align="start"
        border="left"
        color="indigo"
        dark
        width="100%"
        max-width="780px"
      >
        총합계 평균점수 및 차트는 해당 게시물의 작성자에게만 표시 됩니다.
      </v-alert>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
import lodash from "lodash";
import http from "../http/http";
export default {
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      showimage_dialog: false,
      reportRules: [v => !!v || "신고사유가 선택되지 않았습니다."],
      report_reason: null,
      report_reason_list: [
        "너무 선정적 입니다.",
        "사진을 알아볼 수가 없어요.",
        "중복된 게시물 입니다.",
        "게시판 성격과 맞지 않아요.",
        "광고성 게시물 입니다.",
        "사진편집이 과해 보여요",
        "외모 사진이 아닙니다."
      ],
      reportdialog: false,
      scoredialog: false,
      deletedialog: false,
      rating: 1,
      chartOptions: {
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
          type: "bar",
          height: 350,
          background: "#121212"
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,
          textAnchor: "start",
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: undefined
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.45
            }
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45
          }
        },
        xaxis: { categories: ["평균점수"] },
        title: {
          text: "평균점수(7점만점)",
          align: "center",
          margin: 30,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "25px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#EEEEEE"
          }
        }
      },
      series: [
        { name: "전체평균", data: [] },
        { name: "남자가 준 평균점수", data: [] },
        { name: "여자가 준 평균점수", data: [] }
      ],
      total_number: 0,
      male_number: 0,
      female_number: 0
    };
  },
  methods: {
    newWindowImage() {
      window.open(
        `http://192.168.0.12:4000${this.$store.state.imagestore.imagedetail[0].image_path}`,
        "_blank"
      );
    },
    report() {
      this.reportdialog = true;
    },
    score() {
      this.scoredialog = true;
    },
    delete_dialog() {
      this.deletedialog = true;
    },

    score_send() {
      let scoredata = {
        content_uid: this.$store.state.imagestore.imagedetail[0].content_uid,
        to_uid: this.$store.state.imagestore.imagedetail[0].user_uid,
        from_uid: this.$store.state.loginstore.userstate[0].user_uid,
        content_score: this.rating,
        gender: this.$store.state.loginstore.userstate[0].gender
      };
      http
        .post("/contentscore", scoredata, {
          withCredentials: true
        })
        .then(e => {
          this.scoredialog = false;
        })
        .then(() => this.$router.go(0))
        .catch(err => {
          if (err.response.status == 403) {
            this.scoredialog = false;
            this.$alert(
              "권한이 없습니다. 로그인 페이지로 이동합니다."
            ).then(() => this.$router.push("/login"));
          } else if (err.response.status == 400) {
            this.$alert("이미 점수가 등록된 게시물 입니다.")
              .then(() => (this.scoredialog = false))
              .then(() => this.$router.go(0));
            // this.$router.go(0)
          } else {
            this.scoredialog = false;
          }
        });
    },
    report_cancel() {
      this.reportdialog = false;
    },
    score_cancel() {
      this.scoredialog = false;
    },
    delete_cancel() {
      this.deletedialog = false;
    },
    deleteimage() {
      let imagedataObj = {
        content_uid: this.$store.state.imagestore.imagedetail[0].content_uid,
        image_path: this.$store.state.imagestore.imagedetail[0].image_path
      };
      this.$store.dispatch("imagestore/deleteImage", imagedataObj);
      this.$router.go(-1);
    },
    report_content() {
      const validate = this.$refs.report_form.validate();
      if (validate) {
        let reportdataObj = {
          content_uid: this.$store.state.imagestore.imagedetail[0].content_uid,
          to_uid: this.$store.state.imagestore.imagedetail[0].user_uid,
          from_uid: this.$store.state.loginstore.userstate[0].user_uid,
          report_reason: this.report_reason
        };
        http
          .post("/report", reportdataObj, {
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
    showimage_dialog_open() {
      this.showimage_dialog = true;
    },
    showimage_dialog_close() {
      this.showimage_dialog = false;
    }
  },

  mounted() {
    this.$store.dispatch("imagestore/getimage", this.$route.params.content_uid);
    const obj = {
      content_uid: this.$route.params.content_uid,
      user_uid: this.$store.state.loginstore.userstate[0].user_uid
    };
    // if (
    //   this.$store.state.imagestore.imagedetail[0].user_uid ==
    //   this.$store.state.loginstore.userstate[0].user_uid
    // ) {
    //   this.$store.dispatch("scorestore/getscore", obj);
    // }
    this.$store.dispatch("scorestore/getscore", obj);
    // window.dispatchEvent(new Event("resize"));
  },

  computed: {
    imageDetail() {
      return this.$store.getters["imagestore/imageDetail"];
    },
    average_total() {
      const arrscoretotal = this.$store.state.scorestore.scorestate.map(
        item => item.content_score
      );
      // console.log("arrscoretotal      " + arrscoretotal);
      if (arrscoretotal.length > 0) {
        this.total_number = arrscoretotal.length;
        try {
          let contentscore = {
            content_uid: this.$store.state.imagestore.imagedetail[0]
              .content_uid,
            content_average_score: (this.series[0].data[0] = (
              lodash.sum(arrscoretotal) / arrscoretotal.length
            ).toFixed(1)),
            score_count: arrscoretotal.length
          };
          this.$store.dispatch("imagestore/contentscore", contentscore);
        } catch (err) {
          console.log("catch err" + err);
        }
        return (this.series[0].data[0] = (
          lodash.sum(arrscoretotal) / arrscoretotal.length
        ).toFixed(1));
      } else {
        this.series[0].data[0] = 0;
        this.total_number = 0;
      }
    },
    average_male() {
      const arrscoremale = this.$store.state.scorestore.scorestate
        .filter(item => item.gender == "male")
        .map(item => item.content_score);
      this.male_number = arrscoremale.length;
      return (this.series[1].data[0] = (
        lodash.sum(arrscoremale) / arrscoremale.length
      ).toFixed(1));
    },
    average_female() {
      const arrscorefemale = this.$store.state.scorestore.scorestate
        .filter(item => item.gender == "female")
        .map(item => item.content_score);
      this.female_number = arrscorefemale.length;
      return (this.series[2].data[0] = (
        lodash.sum(arrscorefemale) / arrscorefemale.length
      ).toFixed(1));
    }
  }
};
</script>

<style scoped>
.my-custom-dialog {
  align-self: flex-end;
}
</style>
