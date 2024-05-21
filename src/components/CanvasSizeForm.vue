<script setup>
import {
  LAMA,
  MIN_WIDTH,
  MIN_HEIGHT,
  MAX_WIDTH,
  MAX_HEIGHT,
  width,
  height,
} from "./variables";

function adjustWidth(event) {
  const c = document.getElementById("canva");
  const x = event.pageX - c.offsetLeft;
  const newWidth = parseInt(width.value - x / 10);
  if (newWidth > MIN_WIDTH.value && newWidth < MAX_WIDTH.value && x > -150) {
    width.value = newWidth;
  }
}

function adjustHeight(event) {
  const c = document.getElementById("canva");
  const y = event.pageY - c.offsetTop;
  const newHeight = parseInt(height.value - y / 10);
  if (
    newHeight > MIN_HEIGHT.value &&
    newHeight < MAX_HEIGHT.value &&
    y > -150
  ) {
    height.value = newHeight;
  }
}
</script>
<template>
  <div id="CSizeFormApp">
    <h2>Adjust your canvas dimensions :</h2>
    <div id="canva" :style="{ width: width + 'px', height: height + 'px' }">
      <div class="borders" id="left" draggable="true" @drag="adjustWidth">
        <svg height="50" width="15" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="0,0 15,10 15,40 0,50"
            style="stroke: black; fill: white"
          />
          <polygon points="5,10 5,40" style="stroke: grey; fill: none" />
          <polygon points="10,15 10,35" style="stroke: grey; fill: none" />
        </svg>
      </div>

      <div
        class="borders"
        id="top"
        draggable="true"
        @drag="adjustHeight"
        @dragend=""
      >
        <svg height="15" width="50" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="0,0 10,15 40,15 50,0"
            style="stroke: black; fill: white"
          />
          <polygon points="10,5 40,5" style="stroke: grey; fill: none" />
          <polygon points="15,10 35,10" style="stroke: grey; fill: none" />
        </svg>
      </div>
    </div>
    <div id="dimensions">
      <input
        type="number"
        v-model="width"
        :max="MAX_WIDTH"
        :min="MIN_WIDTH"
        name="width"
        id="width"
      />
      <input
        type="number"
        v-model="height"
        :max="MAX_HEIGHT"
        :min="MIN_HEIGHT"
        name="height"
        id="height"
      />
    </div>
  </div>
</template>

<style scoped>
#CSizeFormApp {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5%;
}
#canva {
  position: relative;
  background-color: v-bind(LAMA);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

.borders {
  position: absolute;
  width: auto;
  height: auto;
}

#left {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

#top {
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
