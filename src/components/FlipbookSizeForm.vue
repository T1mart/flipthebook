<script setup>
import { initializeFlipbook } from "./requests.js";
import {
  DRAWING_STATE,
  appState,
  MIN_SIZE,
  MAX_SIZE,
  width,
  height,
  size,
} from "./variables";

function initiliaze() {
  if (size.value >= MIN_SIZE.value && size.value <= MAX_SIZE.value) {
    appState.value = DRAWING_STATE;
    initializeFlipbook(size.value, width.value, height.value);
  } else {
    alert(
      "Le taille entrée n'est pas correct, elle doit être située entre " +
        MIN_SIZE.value +
        " et " +
        MAX_SIZE.value
    );
  }
}
</script>

<template>
  <div id="FBSizeFormApp">
    <h2>Entrez le nombre de pages que vous souhaitez faire :</h2>
    <input
      type="number"
      id="size"
      name="id"
      :min="MIN_SIZE"
      :max="MAX_SIZE"
      v-model="size"
      placeholder="Nombre de pages"
    />
    <input type="submit" @click="initiliaze" />
  </div>
</template>

<style scoped>
#FBSizeFormApp {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5%;
}
</style>
