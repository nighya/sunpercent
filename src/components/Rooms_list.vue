<template>
  <div class="ma-3">
    <h2 class="text-start ml-3 mb-3">채팅</h2>
    <h5 class="text-end ml-3 mb-3">총 접속자 : {{ server_client_count }} 명</h5>
    <v-divider class="ml-3"></v-divider>
    <div>
      <v-dialog v-model="make_room_dialog" max-width="400">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mt-3 ml-3" dark v-bind="attrs" v-on="on">
            방만들기
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey darken-3">
            방만들기
          </v-card-title>

          <v-card-text>
            <v-text-field
              clearable
              placeholder="방이름"
              class="mt-10"
              v-model="room_name"
              outlined
              :rules="[rules.require1]"
            ></v-text-field>
            <toggle-button
              @change="onToggleChange(slider.id, $event)"
              :width="80"
              :value="Boolean(slider.status)"
              :labels="{ checked: '공개방', unchecked: '비공개방' }"
              :color="{
                checked: '#448AFF',
                unchecked: '#CCCCCC',
                disabled: '#CCCCCC'
              }"
            />
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text @click="make_room_dialog = !make_room_dialog">
              취소
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="create_room(room_name)">
              만들기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-divider class="mt-3 ml-3"></v-divider>
    <div class="mt-3 ml-3">
      <v-row>
        <v-col v-for="item in rooms_list" :key="item.id_num">
          <v-card height="100" max-width="500" @click="go_to_the_room(item)">
            <!-- <div class="mt-1 mr-2 text-start">
              {{
                item.room_client_count == undefined
                  ? 0
                  : item.room_client_count
              }}명
            </div> -->
            <v-card-title>
              <p
                class="d-inline-block text-truncate text-h6 text--primary"
                style="max-width: 500px;"
              >
                {{ item.room_name }}
              </p>
            </v-card-title>
          </v-card>
        </v-col></v-row
      >
    </div>
  </div>
</template>
<script>
import { v4 as uuid_v4 } from "uuid";
import http from "../http/http";
import io from "socket.io-client";
const socket_client = io("https://socket.sunpercent.com/", {
  withCredentials: true
});

export default {
  data() {
    return {
      rules: {
        require1: v =>
          !(v && v.length >= 70) || "방이름은 70자 이상 입력할 수 없습니다."
      },
      make_room_dialog: false,
      slider: {
        status: true
      },
      room_public: true,
      room_name: null,
      rooms_list: null,
      server_client_count: 0,
      server_rooms_list: null,
      server_rooms_list_total: null
    };
  },
  mounted() {
    //새로고침 한번만
    setTimeout(() => {
      if (localStorage.getItem("reloaded")) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem("reloaded");
      } else {
        // Set a flag so that we know not to reload the page twice.
        if (this.server_client_count == 0) {
          localStorage.setItem("reloaded", "1");
          location.reload();
        }
      }
    }, 5000);

    this.get_room_list;

    socket_client.on("room_list_total", (room_list_total, client_count) => {
      // console.log("test", client_count);
      this.server_client_count = parseInt(client_count / 2); //정수만 넣기
      // room_list_total.sort(this.compare_room_id);
      // this.server_rooms_list_total = room_list_total;
      // let add_count_rooms_list = [];
      // this.rooms_list.map(data_1 => {
      //   this.server_rooms_list_total.map(data_2 => {
      //     if (data_1.room_id == data_2.room_id) {
      //       const obj = {
      //         id_num: data_1.id_num,
      //         room_id: data_1.room_id,
      //         room_name: data_1.room_name,
      //         room_client_count: data_2.room_client_count
      //       };
      //       add_count_rooms_list.push(obj);
      //     }
      //   });
      // });
      // this.rooms_list = add_count_rooms_list;
      // console.log("server total", this.server_rooms_list_total);
      // console.log("this.rooms_list", this.rooms_list);
    });

    socket_client.on("room_list", room_list => {
      this.server_rooms_list = room_list;
      // this.delete_room;
    });
  },
  computed: {
    async get_room_list() {
      const response = await http.get("/sun/get_room_list", {
        withCredentials: true
      });
      response.data.sort(this.compare_room_id);
      this.rooms_list = response.data;
      console.log(this.rooms_list);
    }
    // async delete_room() {
    //   var arr_list = [];
    //   var empty_roomId_list = null;

    //   this.rooms_list.map(data => {
    //     arr_list.push(data.room_id);
    //   });
    //   empty_roomId_list = arr_list.filter(
    //     f_data => !this.server_rooms_list.includes(f_data)
    //   );
    //   empty_roomId_list.map(data => {
    //     const room_id = { room_id: data };
    //     const response = http.post("/sun/delete_room", room_id, {
    //       withCredentials: true
    //     });
    //   });
    // }
  },

  methods: {
    open_dialog() {
      this.make_room_dialog = true;
    },

    onToggleChange(id, event) {
      // added event as second arg
      this.room_public = event.value; // changed from event.target.value to event.value
      console.log(this.room_public);
    },
    //string 비교 정렬
    compare_room_id(a, b) {
      if (a.room_id.toLowerCase() < b.room_id.toLowerCase()) {
        return -1;
      }
      if (a.room_id.toLowerCase() > b.room_id.toLowerCase()) {
        return 1;
      }
      return 0;
    },
    create_room() {
      if (this.room_name == null || this.room_name == "") {
        alert("만드는 방이름이 비었습니다.");
      } else {
        const uid = uuid_v4();
        const arr_uid = uid.split("-");
        const room_id = arr_uid[0];
        const room_Object = {
          room_id: room_id,
          room_name: this.room_name
        };
        if (this.room_public == true) {
          http.post("/sun/create_room", room_Object, {
            withCredentials: true
          });
        }
        // socket_client.emit("create_room",room_Object)
        this.room_name = null;
        this.make_room_dialog = false;
        this.$router
          .push({
            name: "Rooms",
            params: {
              roomId: room_Object.room_id,
              room_name: room_Object.room_name
            }
          })
          .catch(() => {});
      }
    },
    go_to_the_room(data) {
      //   this.$router.push(`/Rooms_list/${room}`);
      this.$router
        .push({
          name: "Rooms",
          params: {
            roomId: data.room_id,
            room_name: data.room_name
          }
        })
        .catch(() => {});
    }
  }
};
</script>