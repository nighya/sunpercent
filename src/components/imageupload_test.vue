<template>
  <div>
    <h1>ImageUpload Page</h1>
    <h3>{{ memberdata }}</h3>
    <div>
      <input ref="preimage" type="file" @change="onFileSelected" name="image" />
      <button @click="onUpload">Upload</button>
      <img :src="image" width="300" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // content_uid: "",
      user_uid: null,
      image: null,
      selectedFile: null,
    };
  },
  computed: {
    memberdata() {
      return this.$store.state.loginstore.userstate[0].uid;
    },
  },
  methods: {
    //파일만
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      const image = this.$refs["preimage"].files[0];
      const url = URL.createObjectURL(image);
      this.image = url;
    },
    onUpload() {
      const fd = new FormData();
      fd.append("image", this.selectedFile);
      fd.append("user_uid",this.$store.state.loginstore.userstate[0].uid )
      axios
        .post("http://localhost:4000/api/test/imageupload", fd, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>
