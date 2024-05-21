<script setup>
import CanvasDrawingApp from "./components/CanvasDrawingApp.vue";
import CanvasSizeForm from "./components/CanvasSizeForm.vue";
import FlipbookSizeForm from "./components/FlipbookSizeForm.vue";
import VideoApp from "./components/VideosApp.vue";
import {
  CANVAS_SIZE_FORM_STATE,
  FLIPBOOK_SIZE_FORM_STATE,
  DRAWING_STATE,
  VIDEO_STATE,
  appState,
  SUGAR_MILK,
  SWEET_BROWN,
  LAMA,
  FLINT_ROCK,
  BISCUIT,
  ENGLISH_VIOLET,
  SEA_GREEN,
  RED,
  resetTotalVariables,
  size,
} from "./components/variables";

function prevState() {
  if (appState.value == DRAWING_STATE) {
    resetTotalVariables();
    appState.value = CANVAS_SIZE_FORM_STATE;
  } else {
    appState.value--;
  }
}

function nextState() {
  appState.value++;
}
</script>

<template>
  <div id="flipbookPage">
    <header>
      <div
        class="navig_button"
        v-if="appState != CANVAS_SIZE_FORM_STATE"
        id="back"
        @click="prevState"
      >
        <svg
          :stroke="SUGAR_MILK"
          stroke-width="10"
          stroke-linecap="round"
          viewBox="0 0 100 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="35" y1="10" x2="10" y2="40" />
          <line x1="10" y1="40" x2="90" y2="40" />
          <line x1="35" y1="70" x2="10" y2="40" />
        </svg>
      </div>
      <img src="./components/logo/Text2.png" alt="Logo Text" />
      <div
        class="navig_button"
        v-if="appState != VIDEO_STATE && appState != FLIPBOOK_SIZE_FORM_STATE"
        id="next"
        @click="nextState"
      >
        <svg
          :stroke="SUGAR_MILK"
          stroke-width="10"
          stroke-linecap="round"
          viewBox="0 0 100 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="65" y1="10" x2="90" y2="40" />
          <line x1="10" y1="40" x2="90" y2="40" />
          <line x1="65" y1="70" x2="90" y2="40" />
        </svg>
      </div>
    </header>
    <div v-if="appState == DRAWING_STATE" class="form">
      <CanvasDrawingApp />
    </div>
    <div v-else-if="appState == CANVAS_SIZE_FORM_STATE" class="form">
      <CanvasSizeForm />
    </div>
    <div v-else-if="appState == FLIPBOOK_SIZE_FORM_STATE" class="form">
      <FlipbookSizeForm />
    </div>
    <div v-else-if="appState == VIDEO_STATE" class="form">
      <VideoApp />
    </div>
  </div>
</template>

<style scoped>
#flipbookPage {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: v-bind(SUGAR_MILK);
}

header {
  height: 20%;
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns:
    clamp(20%, 20vmax, 10%)
    clamp(60%, 60vmax, 80%)
    clamp(20%, 20vmax, 10%);
  background-color: v-bind(SUGAR_MILK);
  box-shadow: 0px -20px 40px v-bind(FLINT_ROCK);
}

#back {
  grid-column: 1;
}

header img {
  width: clamp(60%, 60vmax, 80%);
  grid-column: 2;
}

.navig_button {
  width: clamp(50px, 40%, 180px);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: v-bind(SWEET_BROWN);
  border-radius: 25px;
  color: v-bind(SUGAR_MILK);
  -webkit-user-select: none;
  user-select: none;
}

#next {
  grid-column: 3;
}

.navig_button > svg {
  height: 80%;
}

@media screen and (max-width: 800px) {
  header {
    grid-template-columns: 50% 50%;
    grid-template-rows: 60% 40%;
  }

  header img {
    grid-column: 1 / 3;
    grid-row: 1;
  }

  #back {
    grid-column: 1;
    grid-row: 2;
  }

  #next {
    grid-column: 2;
    grid-row: 2;
  }
}

.form {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
