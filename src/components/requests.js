import axios from "axios";
import { ref } from "vue";
import {
  imageState,
  imageStateTotal,
  id,
  idCopy,
  emptyPoints,
} from "./variables";

export const bytes = ref("");
export const bytesArray = ref([""]);
export const prevImageBytes = ref("");

export function initializeFlipbook(size, width, height) {
  axios
    .get(
      "http://localhost:8080/initialize_flipbook?size=" +
        size +
        "&width=" +
        width +
        "&height=" +
        height
    )
    .then((response) => {})
    .catch((error) => {
      console.log("L'erreur est : " + error);
    });
}

export function getImage(callback) {
  axios
    .get("http://localhost:8080/get_image?id=" + id.value)
    .then((response) => {
      let datas = response.data.split(" ");
      imageState.value = datas[0];
      imageStateTotal.value = datas[1];
      bytes.value = datas[2];
      callback();
    })
    .catch((error) => {
      console.log("L'erreur est : " + error);
    });
}

export function getLastStateImage(callback) {
  axios
    .get("http://localhost:8080/get_last_state_image?id=" + (id.value - 1))
    .then((response) => {
      prevImageBytes.value = response.data;
      callback();
    })
    .catch((error) => {
      console.log("L'erreur est : " + error);
    });
}

export function copyLastImage(callback) {
  axios
    .get("http://localhost:8080/copy_last_image?id=" + id.value)
    .then((response) => {
      getImage(callback);
    })
    .catch((error) => {
      console.log("L'erreur est : " + error);
    });
}

export function copyOtherImage(callback) {
  axios
    .get(
      "http://localhost:8080/copy_other_image?id=" +
        id.value +
        "&idCopy=" +
        (idCopy.value - 1)
    )
    .then((response) => {
      getImage(callback);
    })
    .catch((error) => {
      console.log("L'erreur est : " + error);
    });
}

export function draw(callback) {
  axios
    .request({
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/draw?id=" + id.value,
      data: { encodedString: bytes.value },
    })
    .then((response) => {
      getImage(callback);
    })
    .catch((error) => {
      console.log("L'erreur est : " + error);
    });
}

export function changeImageState(side, callback) {
  axios
    .get("http://localhost:8080/change_state?id=" + id.value + "&side=" + side)
    .then((response) => {
      getImage(callback);
    })
    .catch((error) => {
      console.log("L'erreur est : " + error);
    });
}

export function getAllImages(callback) {
  axios
    .get("http://localhost:8080/get_all_images")
    .then((response) => {
      bytesArray.value = response.data.split(" ");
      callback();
    })
    .catch((error) => {
      console.log("L'erreur est : " + error);
    });
}
