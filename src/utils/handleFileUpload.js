import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function handleFileUpload (thumbnail,_callback) {
  const storage = getStorage();
  const storageRef = ref(storage, thumbnail.name + new Date());
  const uploadTask = uploadBytesResumable(storageRef, thumbnail);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      // eslint-disable-next-line default-case
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // eslint-disable-next-line default-case
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;
        case "storage/unknown":
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        _callback(downloadURL)
      });
    }
  );
  
};

export default handleFileUpload;
