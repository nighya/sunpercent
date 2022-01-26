<template>
  <div class="pa-3">
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          chips
          prepend-icon="mdi-camera"
          counter
          show-size
          label="Select Image"
          accept="image/*"
          @change="selectImage"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-4">
        <v-btn color="success" dark small @click.once="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
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
        <img class="preview my-3" :src="previewImage" alt="" />
      </div>
    </div>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>

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
</template>

<script>
import axios from "axios";

export default {
  name: "ContentUpload",
  data() {
    return {
      currentImage: null,
      previewImage: null,
      progress: 0,
      message: "",
      imageInfos: []
    };
  },
  methods: {
    selectImage(image) {
      this.currentImage = image;
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
      this.message = "";
    },
    async upload() {
      if (!this.currentImage) {
        this.message = "Please select an Image!";
        return;
      }
      const fd = new FormData();
      fd.append("image", this.currentImage);
      fd.append("user_uid", this.$store.state.loginstore.userstate[0].user_uid);
      this.progress = 0;
      await axios
        .post("http://localhost:4000/imageupload", fd, {
          withCredentials: true
        })
        .then(e => {
          // this.$router.go(-1)
          this.modal_succeeded;
        })

        .catch(err => {
          this.progress = 0;
          this.message = "Could not upload the image! " + err;
          this.currentImage = null;
        });
    },
    modal_succeeded() {
      this.$dialog.confirm({
        text: "test",
        title: "확인"
      });
    }
  }
};
</script>

<style scoped>
.preview {
  max-width: 200px;
}
</style>
