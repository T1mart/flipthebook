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
  canvasState,
  SELECT,
  DRAW,
  ERASE,
  NORMAL_LINE,
  MULTIPLE_LINE,
  RECTANGLE,
  POLYOGON,
  CIRCLE,
  FILLING_POINT,
  shapeMode,
  resetDrawVariables,
} from "./variables";

function updateBar() {
  let nav = document.querySelector("#navShapes");
  if (nav.classList.value == "") {
    nav.classList.add("activated");
  } else {
    nav.classList.remove("activated");
  }
}

function updateShape(event) {
  if (canvasState.value) {
    alert("Veuillez annuler votre(vos) premier(s) mouvement(s)");
    return;
  }
  resetDrawVariables();
  var id =
    typeof event.target.className === "object"
      ? event.target.className[0]
      : event.target.className;
  switch (id) {
    case "select":
      shapeMode.value = SELECT;
      break;
    case "draw":
      shapeMode.value = DRAW;
      break;
    case "erase":
      shapeMode.value = ERASE;
      break;
    case "line":
      shapeMode.value = NORMAL_LINE;
      break;
    case "rectangle":
      shapeMode.value = RECTANGLE;
      break;
    case "polygon":
      shapeMode.value = POLYOGON;
      break;
    case "circle":
      shapeMode.value = CIRCLE;
      break;
    case "fillingPoint":
      shapeMode.value = FILLING_POINT;
      break;
  }
}
</script>

<template>
  <nav id="navShapes" class="activated">
    <div class="openButton" @click="updateBar" @touch="updateBar">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        :stroke="SUGAR_MILK"
        stroke-width="4"
      >
        <line x1="10" y1="25" x2="90" y2="25" />
        <line x1="10" y1="50" x2="90" y2="50" />
        <line x1="10" y1="75" x2="90" y2="75" />
      </svg>
    </div>
    <nav>
      <div v-if="shapeMode == SELECT" class="shapesIcons activated">
        <img src="./icons/select.svg" alt="Select Icon" />
      </div>
      <div v-else class="select shapesIcons" @click="updateShape">
        <img class="select" src="./icons/select.svg" alt="Select Icon" />
      </div>

      <div v-if="shapeMode == DRAW" class="shapesIcons activated">
        <img src="./icons/pencil.svg" alt="Pencil Icon" />
      </div>
      <div v-else class="draw shapesIcons" @click="updateShape">
        <img class="draw" src="./icons/pencil.svg" alt="Pencil Icon" />
      </div>

      <div v-if="shapeMode == ERASE" class="shapesIcons activated">
        <img src="./icons/eraser.svg" alt="Eraser Icon" />
      </div>
      <div v-else class="erase shapesIcons" @click="updateShape">
        <img class="erase" src="./icons/eraser.svg" alt="Eraser Icon" />
      </div>

      <div v-if="shapeMode == NORMAL_LINE" class="shapesIcons activated">
        <img src="./icons/normalLine.svg" alt="Normal Line Icon" />
      </div>
      <div v-else-if="shapeMode == MULTIPLE_LINE" class="shapesIcons activated">
        <img src="./icons/multipleLine.svg" alt="Multiple Line Icon" />
      </div>
      <div v-else class="line shapesIcons" @click="updateShape">
        <img class="line" src="./icons/normalLine.svg" alt="Normal Line Icon" />
      </div>

      <div v-if="shapeMode == RECTANGLE" class="shapesIcons activated">
        <img src="./icons/rectangle.svg" alt="Rectangle Icon" />
      </div>
      <div v-else class="rectangle shapesIcons" @click="updateShape">
        <img
          class="rectangle"
          src="./icons/rectangle.svg"
          alt="Rectangle Icon"
        />
      </div>

      <div v-if="shapeMode == POLYOGON" class="shapesIcons activated">
        <img src="./icons/polygon.svg" alt="Polygon Icon" />
      </div>
      <div v-else class="polygon shapesIcons" @click="updateShape">
        <img class="polygon" src="./icons/polygon.svg" alt="Polygon Icon" />
      </div>

      <div v-if="shapeMode == CIRCLE" class="shapesIcons activated">
        <img src="./icons/circle.svg" alt="Circle Icon" />
      </div>
      <div v-else class="circle shapesIcons" @click="updateShape">
        <img class="circle" src="./icons/circle.svg" alt="Circle Icon" />
      </div>

      <div v-if="shapeMode == FILLING_POINT" class="shapesIcons activated">
        <img src="./icons/fillerBucket.svg" alt="Filler Bucket Icon" />
      </div>
      <div v-else class="fillingPoint shapesIcons" @click="updateShape">
        <img
          class="fillingPoint"
          src="./icons/fillerBucket.svg"
          alt="Filler Bucket Icon"
        />
      </div>
    </nav>
  </nav>
</template>

<style>
#navShapes {
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: v-bind(LAMA);
  transition: all 0.7s ease-out;
}

#navShapes > nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  overflow: hidden;
}

#navShapes.activated {
  width: clamp(150px, 15%, 300px);
}

#navShapes .openButton {
  position: absolute;
  height: 50px;
  width: 50px;
  right: -50px;
  top: 0;
  background-color: v-bind(LAMA);
  display: flex;
  align-items: center;
  justify-content: center;
}

#navShapes .openButton svg line {
  transition: all 0.7s ease-out;
}

#navShapes.activated .openButton svg line:nth-child(1) {
  transform: translateX(35%) rotate(45deg);
}

#navShapes.activated .openButton svg line:nth-child(2) {
  transform: scaleX(0);
}

#navShapes.activated .openButton svg line:nth-child(3) {
  transform: translateY(35%) translateX(-35%) rotate(-45deg);
}

#navShapes .shapesIcons {
  opacity: 0;
  width: 54px;
  max-height: 54px;
  border-radius: 10px;
  margin: 5px;
  flex: 1 1 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind(SWEET_BROWN);
  box-shadow: 2px 2px 5px #d09667, -2px -2px 5px #ffe9ca;
  transition: all 0.5s ease-out;
}

#navShapes.activated .shapesIcons {
  opacity: 1;
}

#navShapes .shapesIcons.activated {
  box-shadow: inset -2px -2px 10px #a2623c, inset 2px 2px 10px #633c24;
}

#navShapes .shapesIcons > img {
  width: 45px;
  height: 45px;
}
</style>
