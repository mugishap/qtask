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