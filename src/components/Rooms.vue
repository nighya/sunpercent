<template>
  <div class="pa-2 ma-2" id="main_div">
    <div class="ma-5">
      <v-row>
        <h3>방이름:{{ this.$route.params.room_name }}</h3>
        <v-btn color="primary" text @click="getout_oftheroom"
          >나가기</v-btn
        ></v-row
      >
    </div>
    <v-divider></v-divider>
    <!-- <v-btn class="mt-5" @click="ten_sec_start_stream"
          >10초와꾸증명하기</v-btn
        >
        <v-btn class="mt-5" @click="ten_sec_stop_stream">스톱</v-btn> -->

    <div
      class="text-center ma-5"
      v-for="(data, index) in remote_peerId_list"
      :key="index"
    >
      <span
        >{{ data.peer_nickname }}
        <!-- <v-btn
          v-if="call_answer_button"
          class="mt-5"
          @click="get_call_answer(call_answer)"
          >영상 응답</v-btn
        > -->
        <v-btn icon @click="one_to_one_start_stream(data)"
          ><v-icon>mdi-video</v-icon></v-btn
        >
        <!--<v-btn class="mt-5" @click="one_to_one_stop_stream(data)"
          >1:1종료</v-btn>-->
      </span>
    </div>
    <!-- <div id="p_video">
      <div id="c_video_my">
        <div id="c_video_my_video">
          <video width="80" ref="my_ref"></video>
        </div>
        <div id="c_video_my_nickname">
          <h6>{{ my_nickname }}</h6>
        </div>
      </div>

      <div id="c_video_remote" v-for="data in remote_srcObject" :key="data.id">
        <div id="c_video_remote_video">
          <video
            width="300"
            ref="remote_ref"
            :srcObject.prop="data.obj_remote_srcObject"
            autoplay="autoplay"
          ></video>
        </div>
        <div id="c_video_remote_nickname">
          <h5>{{ data.obj_remote_nickname }}</h5>
        </div>
      </div>
    </div> -->

    <v-row justify="center">
      <!-- <v-btn color="primary" dark @click.stop="video_dialog = true">
        Open Dialog
      </v-btn> -->
      <!--dialog-->
      <v-dialog v-model="video_dialog" max-width="470" persistent>
        <v-card height="600" align="center">
          <div
            class="mt-5"
            align="center"
            justify="center"
            v-for="(data, index) in remote_peerId_list"
            :key="index"
          >
            <div class="mt-5">
              <div v-if="call_answer_msg == true">
                {{ data.peer_nickname }}님의 응답대기중 .....
              </div>
              <div v-if="call_request_msg == true">
                {{ data.peer_nickname }}님으로부터 통화요청 .....
              </div>
              <div v-if="call_ing_msg == true">
                {{ data.peer_nickname }}님과 통화중
              </div>
            </div>

            <v-btn
              icon
              v-if="call_answer_button == true"
              class="mt-5"
              @click="get_call_answer(call_answer)"
              ><v-icon color="blue" x-large>mdi-phone-forward</v-icon></v-btn
            >
            <v-btn icon class="mt-5" @click="one_to_one_stop_stream(data)"
              ><v-icon x-large>mdi-phone-remove</v-icon></v-btn
            >
          </div>
          <!--video -->
          <div class="mt-5" id="p_video">
            <div id="c_video_my">
              <div id="c_video_my_video">
                <video width="80" ref="my_ref"></video>
              </div>
              <!-- <div id="c_video_my_nickname">
                <h6>{{ my_nickname }}</h6>
              </div> -->
            </div>

            <div
              id="c_video_remote"
              v-for="data in remote_srcObject"
              :key="data.id"
            >
              <div id="c_video_remote_video">
                <video
                  controls
                  width="300"
                  ref="remote_ref"
                  :srcObject.prop="data.obj_remote_srcObject"
                  autoplay="autoplay"
                ></video>
              </div>
              <!-- <div id="c_video_remote_nickname">
                <h5>{{ data.obj_remote_nickname }}</h5>
              </div> -->
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>

    <v-divider class="mt-5"></v-divider>

    <v-row class="mt-5"
      ><v-col>
        <div v-for="(data, index) in chat_messages" :key="index">
          <v-row class="justify-center"
            ><h5>{{ data.notice_message }}</h5></v-row
          >
          <v-row class="justify-end" v-if="my_peerId == data.peerId">
            <v-col cols="auto">
              <div align="end">
                <h5>{{ my_nickname }}</h5>
                <v-img
                  class="mt-2 mb-2"
                  contain
                  max-height="200"
                  max-width="200"
                  :src="data.image_src"
                ></v-img>
                <v-card max-width="260" outlined color="grey darken-3">
                  <v-list-item>
                    <v-list-item-content>
                      <v-card-text>{{ data.message }}</v-card-text>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </div>
            </v-col></v-row
          >
          <v-row class="justify-start" v-else>
            <v-col cols="auto">
              <div align="start">
                <h5>{{ data.nickname }}</h5>
                <v-img
                  class="mt-2 mb-2"
                  contain
                  max-height="200"
                  max-width="200"
                  :src="data.image_src"
                ></v-img>
                <v-card max-width="260" outlined v-if="data.message != null">
                  <v-list-item>
                    <v-list-item-content>
                      <v-card-text>{{ data.message }}</v-card-text>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </div>
            </v-col></v-row
          >
        </div>
      </v-col>
    </v-row>

    <div class="mt-10" ref="textarea_ref">
      <div>
        <v-row no-gutters justify="center" align="center">
          <!-- <v-col cols="8">
            <v-file-input
              hide-input
              ref="imageRef"
              chips
              prepend-icon="mdi-camera"
              accept="image/*"
              @change="selectImage"
            ></v-file-input>
          </v-col> -->
          <!-- <v-col cols="4" class="pl-4">
              <v-btn
                color="success"
                dark
                small
                :loading="loading"
                :key="buttonKey"
              >
                Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-col> -->
        </v-row>

        <div v-if="progress">
          <div>
            <v-progress-linear
              v-model="progress"
              color="light-blue"
              height="25"
              reactive
            >
              <strong>{{ progress }} %</strong>
            </v-progress-linear>
          </div>
        </div>

        <div v-if="previewImage">
          <div>
            <v-subheader class="ml-4"
              >이미지 미리보기<v-icon class="ml-2" @click="imageRef_reset"
                >mdi-cancel</v-icon
              ></v-subheader
            >
            <img
              class="preview my-3 ml-8"
              :src="previewImage"
              alt=""
              width="100"
            />
          </div>
        </div>

        <v-card v-if="imageInfos.length > 0" class="mx-auto">
          <v-list>
            <v-subheader>List of Images</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(image, index) in imageInfos" :key="index">
                <a :href="image.url">{{ image.name }}</a>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
      <v-row class="pl-2 pr-1">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon class="mt-2">mdi-video</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in remote_peerId_list"
                :key="index"
              >
                <!--@click="one_to_one_start_stream(item)-->
                <v-card-text @click="one_to_one_start_stream(item)"
                  >{{ item.peer_nickname }}님에게 영상통화</v-card-text
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-textarea
          auto-grow
          dense
          rows="1"
          v-model="send_messages"
          outlined
          label="Message"
          filled
          append-outer-icon="mdi-send"
          clear-icon="mdi-close-circle"
          clearable
          @click:append-outer="send_message(send_messages)"
          @keydown.enter.prevent="send_message(send_messages)"
        >
        </v-textarea>
        <span class="mb-3">
          <v-file-input
            id="v_file_input"
            hide-input
            ref="imageRef"
            chips
            prepend-icon="mdi-camera"
            accept="image/*"
            @change="selectImage"
          ></v-file-input
        ></span>
      </v-row>
    </div>
  </div>
</template>
<script>
import Peer from "peerjs";
const peer = new Peer("", { host: "peerjs.sunpercent.com", secure: true });
import io from "socket.io-client";
const socket_client = io("https://socket.sunpercent.com/", {
  withCredentials: true
});
import http from "../http/http";

export default {
  beforeRouteLeave(to, from, next) {
    if (this.get_out_user == true) {
      next();
    } else {
      const answer = confirm("방에서 나가시겠습니까?");
      if (answer) {
        this.ten_sec_stop_stream;
        socket_client.emit("room_user_disconnected", this.my_peerId);
        if (
          this.remote_peerId_list == [] ||
          this.remote_peerId_list == null ||
          this.remote_peerId_list == ""
        ) {
          // this.delete_room;
        }
        next();
      } else {
        next(false);
      }
    }
  },

  data() {
    return {
      image_src: null,
      call_ing_msg: false,
      call_answer_msg: false,
      call_request_msg: false,
      video_dialog: false,
      call_answer_button: false,
      call_answer: null,
      get_out_user: false,
      room_name: null,
      my_nickname_list: [
        "석류",
        "감",
        "포도",
        "배",
        "레몬",
        "사과",
        "파인애플",
        "아로니아",
        "복숭아",
        "구아바",
        "코코넛",
        "칼라만시",
        "유자",
        "자몽",
        "수박",
        "멜론",
        "블루베리",
        "암바렐라",
        "무화과",
        "레드향",
        "한라봉",
        "귤",
        "천혜향",
        "토마토",
        "딸기",
        "체리",
        "타마릴로",
        "복분자",
        "아보카도",
        "두리안",
        "설향멜론",
        "올리브",
        "백도",
        "키위",
        "바나나",
        "천도복숭아",
        "살구",
        "매실",
        "라임",
        "람부탄",
        "망고스틴",
        "크랜베리",
        "골드키위",
        "청포도",
        "으름",
        "금귤",
        "다래",
        "머루",
        "산딸기",
        "방울토마토",
        "패션프루트",
        "감귤",
        "샤인머스켓",
        "용과",
        "만다린",
        "스타프루트",
        "포멜로",
        "시라",
        "아사이베리",
        "꽃사과",
        "망고",
        "플럼코트",
        "몽키바나나",
        "판타오",
        "핑거라임",
        "오디",
        "참외",
        "건포도",
        "자바애플",
        "쿠푸아수",
        "두쿠",
        "구기자",
        "구즈베리",
        "대추야자",
        "오렌지",
        "두꾸",
        "마르멜로",
        "스타애플",
        "스위티",
        "페피노",
        "리슬링",
        "샤르도네",
        "살라크",
        "머스크멜론",
        "모과",
        "그린망고",
        "파파야",
        "홍옥",
        "델라웨어",
        "앵두"
      ],
      my_nickname: null,
      send_messages: null,
      chat_messages: [],
      remote_srcObject: [],
      remote_peerId_list: [],
      my_peerId: null,
      peerInstance: null,
      room_list: [],
      remote_socket_userId: null,

      currentImage: null,
      previewImage: null,
      progress: 0,
      message: null,
      imageInfos: [],
      loading: false,
      buttonKey: 1,
      file: null
    };
  },
  methods: {
    selectImage(image) {
      if (image) {
        this.currentImage = image;
        this.previewImage = URL.createObjectURL(this.currentImage);
        this.progress = 0;
        this.message = "";
      } else {
        this.currentImage = null;
        this.previewImage = null;
      }
    },
    get_call_answer(get_calldata) {
      //상대가 콜한데이터 받기

      const calldata = get_calldata;
      //console.log("get_call_answer 응답하기작동");
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: false }, mediaStream => {
        //내 화면 응답하기
        this.$refs.my_ref.srcObject = mediaStream;
        this.$refs.my_ref.play();
        calldata.answer(mediaStream); //내화면보내면서 응답하기
        calldata.on("stream", remoteStream => {
          //닉네임 매칭
          const filter_nickname = this.remote_peerId_list.filter(
            data => data.peerId === calldata.peer
          );
          let object = {
            obj_remote_nickname: filter_nickname[0].peer_nickname,
            obj_remote_peerid: calldata.peer,
            obj_remote_srcObject: remoteStream
          };
          // this.remote_peerId_list.push(calldata.peer);
          // this.remote_peerId = [...new Set(this.remote_peerId)]; //중복제거
          this.remote_srcObject.push(object);
          //중복제거
          this.remote_srcObject = this.remote_srcObject.filter(
            (arr, index, callback) =>
              index ===
              callback.findIndex(
                t => t.obj_remote_peerid === arr.obj_remote_peerid
              )
          );
        });
        this.call_answer_button = false;
        this.call_answer_msg = false;
        this.call_request_msg = false;
        let object = {
          peer_nickname: this.my_nickname,
          peerId: this.my_peerId
        };
        socket_client.emit("user_answer", object);
        this.call_ing_msg = true;
      });
    },
    one_to_one_start_stream(data) {
      //1:1영상
      const id_Object = {
        peerId: this.my_peerId,
        peer_nickname: this.my_nickname
      };
      this.video_dialog = true;
      socket_client.emit("one_to_one_start_stream", id_Object);
      // this.remote_peerId = [...new Set(this.remote_peerId)]; //중복제거
      //중복제거
      this.remote_peerId_list = this.remote_peerId_list.filter(
        (arr, index, callback) =>
          index === callback.findIndex(t => t.peerId === arr.peerId)
      );
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: false }, mediaStream => {
        this.$refs.my_ref.srcObject = mediaStream;
        this.$refs.my_ref.play();
        const call = this.peerInstance.call(data.peerId, mediaStream);
        call.on("stream", remoteStream => {
          let object = {
            obj_remote_nickname: data.peer_nickname,
            obj_remote_peerid: data.peerId,
            obj_remote_srcObject: remoteStream
          };
          this.remote_srcObject.push(object);
        });
      });
      this.call_answer_msg = true;
      this.call_request_msg = false;
    },
    getout_oftheroom() {
      this.$router.push("/Rooms_list");
    },
    ten_sec_start_stream() {
      //10초 내영상 보내기
      const id_Object = {
        peerId: this.my_peerId,
        peer_nickname: this.my_nickname
      };
      socket_client.emit("ten_sec_start_stream", id_Object);
      // this.remote_peerId = [...new Set(this.remote_peerId)]; //중복제거
      //중복제거
      this.remote_peerId_list = this.remote_peerId_list.filter(
        (arr, index, callback) =>
          index === callback.findIndex(t => t.peerId === arr.peerId)
      );
      let ten_sec_start_stream_remote_peerId = this.remote_peerId_list;
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: false }, mediaStream => {
        this.$refs.my_ref.srcObject = mediaStream;
        this.$refs.my_ref.play();

        ten_sec_start_stream_remote_peerId.map(data => {
          const call = this.peerInstance.call(data.peerId, mediaStream);
          //   const filter_nickname = this.remote_peerId_list.filter(
          //     f_data => data.peerId == f_data.peerId
          //   );
          //   call.on("stream", remoteStream => {
          //     console.log("콜 함수 데이터" + data);
          //     // console.log(remote_userId);
          //     let object = {
          //       obj_remote_nickname: filter_nickname[0].peer_nickname,
          //       obj_remote_peerid: data.peerId,
          //       obj_remote_srcObject: remoteStream
          //     };
          //     this.remote_srcObject.push(object);
          //   });
        });
      });
      setTimeout(this.ten_sec_stop_stream, 10000);
    },
    ten_sec_stop_stream() {
      const id_Object = {
        peerId: this.my_peerId,
        peer_nickname: this.my_nickname
      };
      socket_client.emit("ten_sec_stop_stream", id_Object);
      // console.log(this.$refs.my_ref.srcObject);
      const my_srcObject = this.$refs.my_ref.srcObject;
      if (my_srcObject !== null) {
        my_srcObject.getTracks().map(data => {
          data.stop();
        });
      }

      this.$refs.my_ref.srcObject = null;
    },
    one_to_one_stop_stream(data) {
      if (this.$refs.my_ref.srcObject == null) {
        this.remote_srcObject = this.remote_srcObject.filter(
          f_data => data.peerId !== f_data.obj_remote_peerid
        );
      }
      const id_Object = {
        peerId: this.my_peerId,
        peer_nickname: this.my_nickname
      };
      socket_client.emit("one_to_one_stop_stream", id_Object);
      if (this.$refs.my_ref.srcObject != null) {
        this.$refs.my_ref.srcObject.getTracks().map(m_data => {
          m_data.stop();
        });
      }
      this.$refs.my_ref.srcObject = null;
      this.remote_srcObject = this.remote_srcObject.filter(
        f_data => data.peerId !== f_data.obj_remote_peerid
      );
      this.call_answer = null;
      this.call_answer_button = false;
      this.video_dialog = false;
      this.call_ing_msg = false;
      this.call_request_msg = false;
      this.call_answer_msg = false;
    },
    send_message(msg_data) {
      if (this.currentImage != null) {
        const blob = new Blob([this.currentImage], {
          type: this.currentImage.type
        });

        const msg_object = {
          message: msg_data,
          nickname: this.my_nickname,
          peerId: this.my_peerId,
          file: blob,
          filename: this.currentImage.name,
          filetype: this.currentImage.type
        };
        msg_object.image_src = URL.createObjectURL(this.currentImage);
        this.chat_messages.push(msg_object);
        this.remote_peerId_list.map(remote_peerId => {
          var conn = peer.connect(remote_peerId.peerId);
          conn.on("open", () => {
            conn.send(msg_object);
          });
        });
      } else {
        const msg_object = {
          message: msg_data,
          nickname: this.my_nickname,
          peerId: this.my_peerId
        };
        this.chat_messages.push(msg_object);
        this.remote_peerId_list.map(remote_peerId => {
          var conn = peer.connect(remote_peerId.peerId);
          conn.on("open", () => {
            conn.send(msg_object);
          });
        });
      }
      this.$refs.imageRef.reset();
      this.currentImage = null;
      this.send_messages = "";
      this.previewImage = null;
      //스크롤 ref로 이동
      this.$nextTick(() => {
        this.$refs.textarea_ref.scrollIntoView({
          block: "end",
          scrollBehavior: "smooth"
        });
      });
    },
    encode(input) {
      const keyStr =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let output = "";
      let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      let i = 0;

      while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output +=
          keyStr.charAt(enc1) +
          keyStr.charAt(enc2) +
          keyStr.charAt(enc3) +
          keyStr.charAt(enc4);
      }
      return output;
    },
    imageRef_reset() {
      this.$refs.imageRef.reset();
    }
  },
  computed: {
    // async delete_room() {
    //   const room_id = { room_id: this.$route.params.roomId };
    //   const response = await http.post("/sun/delete_room", room_id, {
    //     withCredentials: true
    //   });
    // }
  },
  mounted() {
    //새로고침 한번만
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      if (this.my_peerId == null) {
        localStorage.setItem("reloaded", "1");
        location.reload();
      }
    }

    socket_client.on("user-connected", remote_userId => {
      // console.log("user-connected 작동");
      this.remote_peerId_list.push(remote_userId);
      // this.remote_peerId = [...new Set(this.remote_peerId)]; //중복제거
      //중복제거
      this.remote_peerId_list = this.remote_peerId_list.filter(
        (arr, index, callback) =>
          index === callback.findIndex(t => t.peerId === arr.peerId)
      );

      const id_Object = {
        peerId: this.my_peerId,
        peer_nickname: this.my_nickname
      };
      socket_client.emit("member_peerid", id_Object);
      const get_nickname = {
        notice_message: `${JSON.stringify(
          remote_userId.peer_nickname
        )}님이 입장하였습니다.`
      };
      this.chat_messages.push(get_nickname);
      // var getUserMedia =
      //   navigator.getUserMedia ||
      //   navigator.webkitGetUserMedia ||
      //   navigator.mozGetUserMedia;
      // getUserMedia({ video: true, audio: false }, mediaStream => {
      //   // this.$refs.my_ref.srcObject = mediaStream;
      //   // this.$refs.my_ref.play();
      //   const call = this.peerInstance.call(remote_userId, mediaStream);
      //   call.on("stream", remoteStream => {
      //     let object = {
      //       obj_remote_peerid: remote_userId,
      //       obj_remote_srcObject: remoteStream
      //     };

      //     this.remote_srcObject.push(object);
      //   });
      // });
    });
    //방에 있는 peerid 가져오기
    socket_client.on("member_peerid", member_peerid => {
      // console.log("member_peerid 작동  : ", member_peerid);

      //닉네임 중복되는거 있으면 새로고침
      if (
        member_peerid.peerId !== this.my_peerId &&
        member_peerid.peer_nickname !== this.my_nickname
      ) {
        this.remote_peerId_list.push(member_peerid);
        //중복제거
        this.remote_peerId_list = this.remote_peerId_list.filter(
          (arr, index, callback) =>
            index === callback.findIndex(t => t.peerId === arr.peerId)
        );
      } else {
        location.reload();
      }
    });
    // socket_client.on("ten_sec_start_stream", remote_peerId => {
    //   //상대가 콜한데이터 받기
    //   peer.on("call", calldata => {
    //     // console.log("ten_sec_start_stream call 작동");
    //     // console.log(calldata);
    //     var getUserMedia =
    //       navigator.getUserMedia ||
    //       navigator.webkitGetUserMedia ||
    //       navigator.mozGetUserMedia;
    //     getUserMedia({ video: true, audio: false }, mediaStream => {
    //       //내 화면 응답하기
    //       this.$refs.my_ref.srcObject = null;
    //       // this.$refs.my_ref.play();
    //       // calldata.answer(mediaStream); //내화면보내면서 응답하기
    //       calldata.answer(); //내화면은 안보내고 응답하기
    //       // console.log(calldata);
    //       calldata.on("stream", remoteStream => {
    //         //닉네임 매칭
    //         const filter_nickname = this.remote_peerId_list.filter(
    //           data => data.peerId === calldata.peer
    //         );
    //         let object = {
    //           obj_remote_nickname: filter_nickname[0].peer_nickname,
    //           obj_remote_peerid: calldata.peer,
    //           obj_remote_srcObject: remoteStream
    //         };
    //         // this.remote_peerId_list.push(calldata.peer);
    //         // this.remote_peerId = [...new Set(this.remote_peerId)]; //중복제거
    //         this.remote_srcObject.push(object);
    //         //중복제거
    //         this.remote_srcObject = this.remote_srcObject.filter(
    //           (arr, index, callback) =>
    //             index ===
    //             callback.findIndex(
    //               t => t.obj_remote_peerid === arr.obj_remote_peerid
    //             )
    //         );
    //       });
    //     });
    //   });
    // });
    socket_client.on("one_to_one_start_stream", remote_peerId => {
      // console.log("one_to_one_start_stream 옴");
      this.video_dialog = true;

      this.call_answer_button = true;
      this.call_answer_msg = false;
      this.call_request_msg = true;
      //상대가 콜한데이터 받기
      peer.on("call", calldata => {
        // console.log("one_to_one_start_stream call 응답하기작동");
        this.call_answer = calldata;
        //   var getUserMedia =
        //     navigator.getUserMedia ||
        //     navigator.webkitGetUserMedia ||
        //     navigator.mozGetUserMedia;
        //   getUserMedia({ video: true, audio: false }, mediaStream => {
        //     //내 화면 응답하기
        //     this.$refs.my_ref.srcObject = mediaStream;
        //     this.$refs.my_ref.play();
        //     calldata.answer(mediaStream); //내화면보내면서 응답하기
        //     calldata.on("stream", remoteStream => {
        //       //닉네임 매칭
        //       const filter_nickname = this.remote_peerId_list.filter(
        //         data => data.peerId === calldata.peer
        //       );
        //       let object = {
        //         obj_remote_nickname: filter_nickname[0].peer_nickname,
        //         obj_remote_peerid: calldata.peer,
        //         obj_remote_srcObject: remoteStream
        //       };
        //       // this.remote_peerId_list.push(calldata.peer);
        //       // this.remote_peerId = [...new Set(this.remote_peerId)]; //중복제거
        //       this.remote_srcObject.push(object);
        //       //중복제거
        //       this.remote_srcObject = this.remote_srcObject.filter(
        //         (arr, index, callback) =>
        //           index ===
        //           callback.findIndex(
        //             t => t.obj_remote_peerid === arr.obj_remote_peerid
        //           )
        //       );
        //     });
        //   });
      });
    });
    socket_client.on("user-disconnected", remote_userId => {
      this.remote_srcObject = this.remote_srcObject.filter(
        data => remote_userId.peerId !== data.obj_remote_peerid
      );
      this.remote_peerId_list = this.remote_peerId_list.filter(
        data => remote_userId.peerId !== data.peerId
      );
      const get_nickname = {
        notice_message: `${JSON.stringify(
          remote_userId.peer_nickname
        )}님의 접속이 끊겼습니다.`
      };
      // console.log(this.remote_peerId_list);
      this.chat_messages.push(get_nickname);
      this.call_ing_msg = false;

      if (
        this.remote_peerId_list == null ||
        this.remote_peerId_list == [] ||
        this.remote_peerId_list.length == 0
      ) {
        this.$refs.my_ref.srcObject.getTracks().map(data => {
          data.stop();
        });
        this.$refs.my_ref.srcObject = null;
        this.call_answer = null;
        this.call_answer_button = false;
        this.video_dialog = false;
        this.call_ing_msg = false;
        this.call_request_msg = false;
        this.call_answer_msg = false;
      }
      //console.log("user - disconnected 작동");
      // this.remote_peerId.slice(remote_userId);
    });
    socket_client.on("room_user_disconnected", remote_userId => {
      this.remote_srcObject = this.remote_srcObject.filter(
        data => remote_userId.peerId !== data.obj_remote_peerid
      );
      this.remote_peerId_list = this.remote_peerId_list.filter(
        data => remote_userId.peerId !== data.peerId
      );
      const get_nickname = {
        notice_message: `${JSON.stringify(
          remote_userId.peer_nickname
        )}님이 방에서 나갔습니다.`
      };
      this.chat_messages.push(get_nickname);
      // console.log("room_user_disconnected 작동");
      // this.remote_peerId.slice(remote_userId);
    });
    // socket_client.on("ten_sec_stop_stream", remote_userId => {
    //   // console.log(" on ten_sec_stop_stream 작동시작");
    //   // console.log(this.remote_srcObject);
    //   // remote_userId.obj_remote_srcObject.getTracks().map(m_data => {
    //   //   m_data.stop();
    //   // });
    //   this.remote_srcObject = this.remote_srcObject.filter(
    //     data => remote_userId.peerId !== data.obj_remote_peerid
    //   );
    //   //  console.log(" on ten_sec_stop_stream 작동 끝");
    // });
    socket_client.on("one_to_one_stop_stream", remote_userId => {
      if (
        remote_userId.peerId != this.my_peerId &&
        this.$refs.my_ref.srcObject != null
      ) {
        this.$refs.my_ref.srcObject.getTracks().map(m_data => {
          m_data.stop();
        });
        this.$refs.my_ref.srcObject = null;
        this.remote_srcObject = this.remote_srcObject.filter(
          data => remote_userId.peerId !== data.obj_remote_peerid
        );
        // console.log(" on one_to_one_stop_stream 작동");
      }
      const get_nickname = {
        notice_message: `${JSON.stringify(
          remote_userId.peer_nickname
        )}님이 통화를 종료하였습니다.`
      };
      this.chat_messages.push(get_nickname);
      this.call_answer = null;
      this.call_answer_button = false;
      this.video_dialog = false;
      this.call_ing_msg = false;
      this.call_request_msg = false;
      this.call_answer_msg = false;
    });
    socket_client.on("user_answer", remote_userId => {
      if (this.video_dialog == true && remote_userId.peerId != this.my_peerId) {
        this.call_answer_msg = false;
        this.call_ing_msg = true;
      }
    });

    peer.on("open", id => {
      this.my_peerId = id;
      //랜덤 닉네임
      this.my_nickname = this.my_nickname_list[
        Math.floor(Math.random() * this.my_nickname_list.length)
      ];
      const id_Object = { peerId: id, peer_nickname: this.my_nickname };
      socket_client.emit(
        "join-room",
        `${this.$route.params.roomId}`,
        id_Object
      );

      // var getUserMedia =
      //   navigator.getUserMedia ||
      //   navigator.webkitGetUserMedia ||
      //   navigator.mozGetUserMedia;
      // getUserMedia({ video: true, audio: false }, mediaStream => {
      //   this.$refs.my_ref.srcObject = mediaStream;
      //   this.$refs.my_ref.play();
      // });
    });
    socket_client.on("room_full", userId => {
      if (this.my_peerId == userId.peerId) {
        alert("방인원이 모두 찼습니다.");
        this.get_out_user = true;
        this.$router.push("/Rooms_list");
      }
    });
    //응답
    // peer.on("call", calldata => {
    //   console.log("call 작동" + calldata);
    //   // console.log(calldata);
    //   var getUserMedia =
    //     navigator.getUserMedia ||
    //     navigator.webkitGetUserMedia ||
    //     navigator.mozGetUserMedia;
    //   getUserMedia({ video: true, audio: false }, mediaStream => {
    //     //내 화면 응답하기
    //     // this.$refs.my_ref.srcObject = mediaStream;
    //     // this.$refs.my_ref.play();
    //     // calldata.answer(mediaStream);
    //     calldata.on("stream", remoteStream => {
    //       let object = {
    //         obj_remote_peerid: calldata.peer,
    //         obj_remote_srcObject: remoteStream
    //       };
    //       this.remote_peerId.push(calldata.peer);
    //       this.remote_peerId = [...new Set(this.remote_peerId)]; //중복제거
    //       this.remote_srcObject.push(object);
    //     });
    //   });
    // });

    //메시지 받기
    peer.on("connection", conn => {
      conn.on("data", data => {
        if (data.file == undefined) {
          this.chat_messages.push(data);
          //스크롤 ref로 이동
          this.$nextTick(() => {
            this.$refs.textarea_ref.scrollIntoView({
              block: "end",
              scrollBehavior: "smooth"
            });
          });
        } else {
          if (data.filetype.includes("image")) {
            const bytes = new Uint8Array(data.file);
            data.image_src = "data:image/png;base64," + this.encode(bytes);
          }
          this.chat_messages.push(data);
          //스크롤 ref로 이동
          this.$nextTick(() => {
            this.$refs.textarea_ref.scrollIntoView({
              block: "end",
              scrollBehavior: "smooth"
            });
          });
        }

        //encode;

        // window.scrollTo(0, document.body.scrollHeight);

        // console.log(data);
      });
    });
    this.peerInstance = peer;
  }
};
</script>
<style>
.v-card__text {
  padding: 0px;
}
/* #main_div {
  width: 700px;
} */
#p_video {
  top: 30px;
  height: 250px;
  width: 300px;
  z-index: 1;
  position: relative;
}
#c_video_my {
  z-index: 3;
  position: absolute;
}
#c_video_my_video {
  z-index: 6;
  position: absolute;
}
#c_video_my_nickname {
  white-space: nowrap;
  z-index: 7;
  position: absolute;
  left: 42px;
}
#c_video_remote {
  z-index: 2;
  position: absolute;
}
#c_video_remote_video {
  z-index: 4;
  position: absolute;
}
#c_video_remote_nickname {
  justify-items: end;
  white-space: nowrap;
  z-index: 5;
  position: absolute;
  left: 230px;
}
.v-text-field {
  padding-top: 0px;
  margin-top: 4px;
  margin-left: 10px;
}
/* .v-textarea textarea {
  line-height: 40px;
} */
</style>