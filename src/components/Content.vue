<template>
  <v-card class="mx-auto" max-width="500">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="(data, index) in AllGetterslist" :key="index">
          <!-- :cols="card.flex" -->
          <v-card @click="ContentDetail(data)">
            <v-img
              :src="`http://192.168.0.12:4000/${data.image_path}`"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <!-- <v-card-title v-text="data.user_uid"></v-card-title> -->
                      <v-card-text
          v-text="data.nickname"
        ></v-card-text>
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
        </v-row>
      </template>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="contentupload">이미지 업로드</v-btn>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    // cards: [
    //   {
    //     title: "Pre-fab homes",
    //     src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
    //     flex: 12
    //   },
    //   {
    //     title: "Favorite road trips",
    //     src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
    //     flex: 6
    //   },
    //   {
    //     title: "Best airlines",
    //     src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
    //     flex: 6
    //   }
    // ]
  }),
  mounted() {
    this.$store.dispatch("imagestore/getallimages");
  },

  computed: {
    AllGetterslist() {
      return this.$store.getters["imagestore/allImagelist"];
    }
  },
  methods: {
    contentupload() {
      this.$router.push("/contentupload");
    },
    ContentDetail(data) {
      this.$router.push({
        name: "ContentDetail",
        params: {
          content_uid: data.content_uid,
          datas: data
        }
      });
    }
  }
};
</script>
