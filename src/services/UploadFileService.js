import http from "../http-common";

class UploadFilesService {
  upload(image, onUploadProgress) {
    // let formData = new FormData();

    // formData.append("image", image);
    // formData.append("user_uid",this.$store.state.loginstore.userstate[0].user_uid )

    return http.post("/imageupload", image, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true,
      onUploadProgress
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();