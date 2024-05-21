<script setup>
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
  shapeStrokeColor,
  shapeFillColor,
  shapeStrokeSize,
  hexToRgb,
} from "./variables";

function displayPalette(e) {
  let palette = document.querySelector(".paletteScreen");
  document.querySelector(".voilePalette").style.zIndex = 3;
  let button = e.target;
  while (button.nodeName != "DIV") button = button.parentNode;
  if (button.id == "stroke_color_group") {
    palette.id = "stroke";
  } else {
    palette.id = "fill";
  }
}

function changeColor(e) {
  let color = hexToRgb(document.querySelector(".paletteColor").value);
  let transparency = document.querySelector(".paletteTransparency").value;
  let value =
    "rgba(" +
    color[0] +
    "," +
    color[1] +
    "," +
    color[2] +
    "," +
    transparency +
    ")";
  if (e.target.parentNode.parentNode.id == "stroke") {
    shapeStrokeColor.value = value;
  } else {
    shapeFillColor.value = value;
  }
  document.querySelector(".voilePalette").style.zIndex = -1;
}
</script>

<template>
  <nav>
    <div
      class="parametersIcons"
      id="stroke_color_group"
      @click="displayPalette"
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M36.9811 12.566L29.4339 5.01888L7.54714 26.9057L15.0943 34.4528L36.9811 12.566Z"
          :style="{ fill: shapeStrokeColor }"
        />
        <path
          d="M29.4339 5.01888L36.9811 12.566L40 9.54718L32.4528 2.00001L29.4339 5.01888Z"
        />
        <path
          d="M36.9811 12.566L29.4339 5.01888M36.9811 12.566L40 9.54718L32.4528 2.00001L29.4339 5.01888M36.9811 12.566L15.0943 34.4528M29.4339 5.01888L7.54714 26.9057M15.0943 34.4528L7.54714 26.9057M15.0943 34.4528L7.4528 37M7.54714 26.9057C6.53194 29.9513 5.82399 32.0751 4.99997 34.5472M3.77355 38.2264L7.4528 37M3.77355 38.2264C4.23203 36.851 4.62783 35.6636 4.99997 34.5472M3.77355 38.2264L4.99997 34.5472M7.4528 37L4.99997 34.5472"
          :style="{ stroke: SUGAR_MILK }"
          stroke-width="1.5"
        />
      </svg>
    </div>
    <div class="parametersIcons" id="fill_color_group" @click="displayPalette">
      <svg
        width="36"
        height="42"
        viewBox="0 0 36 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.54473 36.4217C6.54473 42.5261 29.4553 42.5261 29.4553 36.4217L34.3158 6.10321C34.1018 6.75695 33.488 7.33161 32.5711 7.82719C26.8249 10.933 9.17535 10.933 3.42903 7.82719C2.51206 7.33159 1.89818 6.75694 1.68416 6.10318L6.54473 36.4217Z"
        />
        <path
          d="M34.4 5.57828C34.4 -0.526089 1.60001 -0.526097 1.60001 5.57828L1.68416 6.10318C1.89818 6.75694 2.51206 7.33159 3.42903 7.82719C3.42903 2.68662 32.5711 2.68662 32.5711 7.82719C33.488 7.33161 34.1018 6.75695 34.3158 6.10321L34.4 5.57828Z"
        />
        <path
          d="M3.42903 7.82719C9.17535 10.933 26.8249 10.933 32.5711 7.82719C32.5711 2.68662 3.42903 2.68662 3.42903 7.82719Z"
          :style="{ fill: shapeFillColor }"
        />
        <path
          d="M1.60001 5.57828C1.60001 -0.526097 34.4 -0.526089 34.4 5.57828M1.60001 5.57828L1.68416 6.10318M1.60001 5.57828C1.60001 5.75857 1.62862 5.93354 1.68416 6.10318M34.4 5.57828L34.3158 6.10321M34.4 5.57828C34.4 5.75858 34.3714 5.93356 34.3158 6.10321M3.42903 7.82719C9.17535 10.933 26.8249 10.933 32.5711 7.82719M3.42903 7.82719C3.42903 2.68662 32.5711 2.68662 32.5711 7.82719M3.42903 7.82719C2.51206 7.33159 1.89818 6.75694 1.68416 6.10318M32.5711 7.82719C33.488 7.33161 34.1018 6.75695 34.3158 6.10321M34.3158 6.10321L29.4553 36.4217C29.4553 42.5261 6.54473 42.5261 6.54473 36.4217L1.68416 6.10318"
          :style="{ stroke: SUGAR_MILK }"
          stroke-width="1.5"
        />
      </svg>
    </div>
    <div class="parametersIcons" id="stroke_size_group">
      <div
        id="strokeSizeDiv"
        :style="{
          width: shapeStrokeSize * 1.3 + 'px',
          height: shapeStrokeSize * 1.3 + 'px',
        }"
      ></div>
    </div>
  </nav>
  <div class="voilePalette">
    <div
      class="paletteScreen"
      :style="{ width: width * 0.4 + 'px', height: height * 0.4 + 'px' }"
    >
      <div class="colors">
        <input type="color" name="color" class="paletteColor" />
        <input
          type="range"
          name="transparency"
          class="paletteTransparency"
          min="0"
          step="0.05"
          max="1"
        />
      </div>
      <div class="buttons">
        <input
          type="submit"
          value="RETOUR"
          @click="
            (e) => {
              e.target.parentNode.parentNode.parentNode.style.zIndex = -1;
            }
          "
        />
        <input type="submit" value="VALIDER" @click="changeColor" />
      </div>
    </div>
  </div>
</template>

<style scoped>
nav {
  max-width: 70px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: v-bind(LAMA);
  padding: 8px;
  gap: 10px;
  border-radius: 10px;
}

.parametersIcons {
  width: 54px;
  height: 54px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind(SWEET_BROWN);
}

#strokeSizeDiv {
  border-radius: 50%;
  background-color: black;
}

.voilePalette {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.paletteScreen {
  background-color: v-bind(LAMA);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
}

.paletteScreen .buttons {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
