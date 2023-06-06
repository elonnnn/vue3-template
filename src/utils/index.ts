import CryptoJS from "crypto-js";
import axios from "axios";
axios.defaults.timeout = 500000;

export const fetchBuffer = (url: string) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url, // 请求地址
      responseType: "arraybuffer",
    }).then(
      (response) => {
        // 处理返回的文件流
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

export const decryptImg = (url: string, method = "blob") => {
  return new Promise(function (resolve, reject) {
    // 也可以使用fetchBuffer(url)
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status == 200) {
        const urls = decryptImage(this.response, url, method);
        resolve(urls);
      } else {
        reject();
      }
    };
    xhr.onerror = () => {
      reject();
    };

    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.send();
  });
};

export const decryptImage = (encryptedImg, image: string, method = "blob") => {
  // Define the encrypted image data as a Base64 string
  let binary = "";
  const bytes = new Uint8Array(encryptedImg);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const encryptedImageBase64 = btoa(binary);

  // Define the key and IV used for encryption
  const key = "";
  const iv = "";

  // Convert the key and IV into WordArray format
  const keyWordArray = CryptoJS.enc.Utf8.parse(key);
  const ivWordArray = CryptoJS.enc.Utf8.parse(iv);

  // Decrypt the image data
  const decryptedData = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(encryptedImageBase64),
    },
    keyWordArray,
    {
      iv: ivWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const uint8Array = new Uint8Array(decryptedData.words.length * 4);
  for (let i = 0; i < decryptedData.words.length; i++) {
    uint8Array[i * 4] = (decryptedData.words[i] >> 24) & 0xff;
    uint8Array[i * 4 + 1] = (decryptedData.words[i] >> 16) & 0xff;
    uint8Array[i * 4 + 2] = (decryptedData.words[i] >> 8) & 0xff;
    uint8Array[i * 4 + 3] = decryptedData.words[i] & 0xff;
  }

  let type;
  if (image.endsWith(".png")) {
    type = "image/png";
  } else if (image.endsWith(".jpg") || image.endsWith(".jpeg")) {
    type = "image/jpeg";
  } else if (image.endsWith(".gif")) {
    type = "image/gif";
  } else if (image.endsWith(".webp")) {
    type = "image/webp";
  } else {
    type = "image";
  }

  if (method === "blob") {
    const blob = new Blob([uint8Array], { type });
    return URL.createObjectURL(blob);
  } else if (method === "base64") {
    const d64 = decryptedData.toString(CryptoJS.enc.Base64);
    const url = `data:${type};base64,` + d64;
    return url;
  }
};
