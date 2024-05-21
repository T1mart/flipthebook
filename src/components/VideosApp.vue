<script setup>
import { ref } from "vue";
import { bytesArray, getAllImages } from "./requests";
import {
  SUGAR_MILK,
  SWEET_BROWN,
  LAMA,
  FLINT_ROCK,
  BISCUIT,
  ENGLISH_VIOLET,
  SEA_GREEN,
  RED,
  width,
  height,
  size,
} from "./variables";

let imageId = 0;
let timeout = 0;

const speed = ref(300);
const imagesNumber = ref(size.value);
const videoDuration = ref(
  Math.round((speed.value / 1000) * imagesNumber.value)
);

let chunks = [];

function updateVideoDuration() {
  videoDuration.value = Math.round((speed.value / 1000) * imagesNumber.value);
  videoDuration.value = videoDuration.value < 1 ? 1 : videoDuration.value;
}

function launchAnimation() {
  document.querySelector("#voilePlay").style.zIndex = -1;
  getAllImages(animVideoCreation);
}

function cancelAnimation() {
  if (timeout != 0) {
    clearTimeout(timeout);
  }
  imageId = 0;
  document.querySelector("#voilePlay").style.zIndex = 1;
}

function animVideoCreation() {
  const canvas = document.getElementById("myFinalCanvas");
  const ctx = canvas.getContext("2d");
  if (imageId == imagesNumber.value) {
    imageId = 0;
  }
  //  Give the current image to the canvas
  var img = new Image();
  var src = "data:image/png;base64," + bytesArray.value[imageId];
  img.src = src;
  img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0);
    imageId++;
    timeout = setTimeout(animVideoCreation, speed.value);
  });
}

function launchDownload() {
  cancelAnimation();
  downloadAnimation();
}

function downloadAnimation() {
  console.log("Exportation started !");
  chunks = [];
  imageId = 0;
  launchAnimation();
  const canvas = document.getElementById("myFinalCanvas");
  let cStream = canvas.captureStream();
  let recorder = new MediaRecorder(cStream);
  recorder.start();
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = () => exportStream();
  setTimeout(() => {
    recorder.stop();
  }, videoDuration.value * 1000 + 600);
}

function exportStream() {
  // combine all our chunks in one blob
  var blob = new Blob(chunks, { type: "video/mp4" });
  // do something with this blob
  var vidURL = URL.createObjectURL(blob);
  var vid = document.createElement("video");
  vid.src = vidURL;
  let link = document.createElement("a");
  link.href = vid.src;
  link.download = "MyFlipTheBook";
  vid.addEventListener("loadeddata", () => {
    console.log("Exported !");
    link.click();
  });
}
</script>

<template>
  <div id="videoApp">
    <canvas
      id="myFinalCanvas"
      :width="width"
      :height="height"
      style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2)"
    ></canvas>
    <div id="voilePlay" :style="{ width: width + 'px', height: height + 'px' }">
      <div id="playButton" @click="launchAnimation">
        <img src="./icons/play.svg" alt="Play Icon" />
      </div>
    </div>
    <div id="parameter">
      <input type="range" v-model="speed" min="50" max="500" step="50" />
      <input type="number" v-model="videoDuration" min="1" max="60" />
      <input type="submit" value="AUTO" @click="updateVideoDuration" />
      <input
        type="range"
        v-model="imagesNumber"
        min="2"
        :max="size"
        step="1"
        @change="cancelAnimation"
      />
      <input value="TELECHARGER" type="submit" @click="launchDownload" />
    </div>
  </div>
</template>

<style scoped>
#videoApp {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
}

#voilePlay {
  z-index: 1;
  position: absolute;
  margin-top: -40px;
  background-color: rgba(153, 151, 145, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

#playButton {
  width: 15%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: v-bind(SUGAR_MILK);
  display: flex;
  align-items: center;
  justify-content: center;
}

#playButton > img {
  height: 50%;
  aspect-ratio: 1/1;
  transform: translateX(5px);
}
</style>
