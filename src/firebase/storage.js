import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "./config";

export function useUpLoadfile(setFormData, setProgess, file) {
  function upLoadfile() {
    const storageRef = ref(
      storage,
      `products/${Date.now()}${file?.imageUrl?.name}`
    );
    const uploadImageUrl = uploadBytesResumable(storageRef, file?.imageUrl);
    uploadImageUrl.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgess(progressPercent);
      },
      (err) => {
        if (err) {
          toast("Error adding image. Try Again", { type: "error" });
        }
      },
      () => {
        getDownloadURL(uploadImageUrl.snapshot.ref).then((url) => {
          setFormData((prev) => ({ ...prev, imageUrl: url }));
          toast("image added successfully", { type: "success" });
          setProgess(0);
        });
      }
    );
  }
  return upLoadfile;
}
