import { toast } from "react-toastify";

export const checkFileType = (inputID: string) => {
  const fileInput = document.querySelector(`#${inputID}`) as HTMLInputElement
  const filePath = fileInput.value
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

  if (!allowedExtensions.exec(filePath)) {
    fileInput.value = '';
    return false;
  }
  else {
    return true
  }
}


export const uploadImage = async (image: any) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "utilities");
  try {
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/precieux/image/upload",
      {
        method: "post",
        body: data
      }
    );
    const urlData = await res.json();
    toast.dismiss();
    toast.success("Image uploaded successfully");
    return urlData.secure_url;
  } catch (error) {
    toast.error("Error uploading image");
    console.log(error);
  }
};
