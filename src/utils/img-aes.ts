/* eslint-disable prefer-const */
import CryptoJS from "crypto-js";

export const toggleClass = (el, className: string) => {
  [...el.parentElement.children].forEach((e) => e.classList.remove(className));
  el.classList.add(className);
};

export const removeClass = (el, className: string) => {
  [...el.parentElement.children].forEach((e) => e.classList.remove(className));
};

export const saveImg = (data) => {
  var base64 = data.toString();
  var byteCharacters = atob(
    base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
  );
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], {
    type: undefined,
  });
  var aLink = document.createElement("a");
  aLink.download = "qrcode-fanqie.png";
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
};

export const isPWA = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    // IOS桌面图标启动 navigator.standalone会等于true 安卓 通过桌面图标启动后，CSS的媒体查询是能够探测到的
    navigator?.standalone ||
    window.matchMedia("(display-mode: standalone)").matches
  );
};

export const decryptImg = (url, method = "blob") => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
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

export const encryptData = (data) => {
  //AES-128-CBC加密
  // Define the key and IV used for encryption
  const key = "saIZXc4yMvq0Iz56";
  const iv = "kbJYtBJUECT0oyjo";
  // Encrypt
  return CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(data),
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();
};

export const decryptImage = (encryptedImg, image, method = "blob") => {
  // Define the encrypted image data as a Base64 string
  let binary = "";
  let bytes = new Uint8Array(encryptedImg);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const encryptedImageBase64 = btoa(binary);

  // Define the key and IV used for encryption
  const key = "saIZXc4yMvq0Iz56";
  const iv = "kbJYtBJUECT0oyjo";

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

  let uint8Array = new Uint8Array(decryptedData.words.length * 4);
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
