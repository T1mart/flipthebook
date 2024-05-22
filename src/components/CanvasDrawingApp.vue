<script setup>
import { ref } from "vue";
import {
  getImage,
  getLastStateImage,
  copyLastImage,
  copyOtherImage,
  bytes,
  prevImageBytes,
  draw,
  changeImageState,
} from "./requests";
import Shapes from "./Shapes.vue";
import Parameters from "./Parameters.vue";
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
  id,
  idCopy,
  layerIsDisplayed,
  canvasState,
  isSelecting,
  isSelected,
  isPainting,
  isErasing,
  isLining,
  isRecting,
  isPolygoning,
  isCircling,
  imageState,
  imageStateTotal,
  SELECT,
  DRAW,
  ERASE,
  NORMAL_LINE,
  MULTIPLE_LINE,
  RECTANGLE,
  POLYOGON,
  CIRCLE,
  FILLING_POINT,
  points,
  emptyPoints,
  shapeMode,
  shapeStrokeColor,
  shapeFillColor,
  shapeStrokeSize,
  compareRGBA,
  drawingStateVariables,
  resetDrawVariables,
} from "./variables";

let canvas = 0;
let ctx = 0;
let extraCtx = 0;
let rect = 0;
let canvasOffsetLeft = 0;
let canvasOffsetTop = 0;

//  VOILE MANAGEMENT

function hideVoile(e) {
  e.target.parentNode.parentNode.style.zIndex = -1;
  resetDrawVariables();
  getImage(clearImage);
}

//  LOADING LAYER

function hideLoadingLayer() {
  document.querySelector("#loadingLayer").style.zIndex = -1;
}

//  COPY MANAGEMENT

function copyLast() {
  copyLastImage(clearImage);
}

function copyOther() {
  copyOtherImage(clearImage);
}

//  LAYER MANAGEMENT

function updateLayer() {
  layerIsDisplayed.value = !layerIsDisplayed.value;
  if (layerIsDisplayed.value) {
    getLastStateImage(displayLayer);
  }
}

function displayLayer() {
  var img = new Image();
  var src = "data:image/png;base64," + prevImageBytes.value;
  img.src = src;
  img.draggable = false;
  img.addEventListener("load", () => {
    document.querySelector("#canvandcounter > #layer").appendChild(img);
  });
}

//  SHOW THE IMAGE ON THE CANVAS

function displayImage() {
  //  Give the current image to the canvas
  var img = new Image();
  var src = "data:image/png;base64," + bytes.value;
  img.src = src;
  img.alt = "Image Layer";
  img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0);
  });
}

function clearImage() {
  initiliazeCanvas();
  ctx.reset();
  emptyPoints();
  hideLoadingLayer();
  displayImage();
}

//  CREATE SHAPES ON THE IMAGE

function initiliazeCanvas() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  rect = canvas.getBoundingClientRect();
  canvasOffsetLeft = rect.left;
  canvasOffsetTop = rect.top;
}

function createPoint(event) {
  if (event.type == "touchstart") event = event.touches[0];
  let x = parseInt(event.pageX - canvasOffsetLeft);
  let y = parseInt(event.pageY - canvasOffsetTop);
  points.push([x, y]);
  updateParam();
  if (shapeMode.value == SELECT) {
    isSelecting.value = true;
  } else if (shapeMode.value == DRAW) {
    emptyPoints();
    ctx.moveTo(x, y);
    isPainting.value = true;
  } else if (shapeMode.value == ERASE) {
    ctx.strokeStyle = "#FFFFFF";
    emptyPoints();
    ctx.moveTo(x, y);
    isErasing.value = true;
  } else if (shapeMode.value == NORMAL_LINE) {
    isLining.value = true;
  } else if (shapeMode.value == RECTANGLE) {
    isRecting.value = true;
  } else if (shapeMode.value == POLYOGON) {
    isPolygoning.value = true;
  } else if (shapeMode.value == CIRCLE) {
    isCircling.value = true;
  } else if (shapeMode.value == FILLING_POINT) {
    initializeFillingPoint();
  }
  updateCanvasState();
  return;
}

function updateCanvasState() {
  canvasState.value = drawingStateVariables();
}

function updateParam() {
  ctx.lineCap = "round";
  ctx.strokeStyle = shapeStrokeColor.value;
  ctx.fillStyle = shapeFillColor.value;
  ctx.lineWidth = shapeStrokeSize.value;
}

function finishStep() {
  bytes.value = canvas.toDataURL().split(",")[1];
  updateCanvasState();
  draw(clearImage);
}

//  DRAW

function drawCanvas(event) {
  if (event.type == "touchmove") event = event.touches[0];
  let x = parseInt(event.pageX - canvasOffsetLeft);
  let y = parseInt(event.pageY - canvasOffsetTop);
  if (isPainting.value) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (isErasing.value) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    let layerCanvas = document.querySelector("#myLayerCanvas");
    extraCtx = layerCanvas.getContext("2d");
    extraCtx.reset();
    extraCtx.strokeStyle = "rgba(109, 184, 255, 1)";
    extraCtx.lineCap = "round";
    if (isSelecting.value) {
      extraCtx.lineWidth = 2;
      const originX = points[0][0] < x ? points[0][0] : x;
      const originY = points[0][1] < y ? points[0][1] : y;
      const rectWidth = Math.abs(points[0][0] - x);
      const rectHeight = Math.abs(points[0][1] - y);
      extraCtx.strokeRect(originX, originY, rectWidth, rectHeight);
    } else {
      extraCtx.lineWidth = 3;
      if (isLining.value) {
        extraCtx.moveTo(points[0][0], points[0][1]);
        extraCtx.lineTo(x, y);
        extraCtx.stroke();
      } else if (isRecting.value) {
        const originX = points[0][0] < x ? points[0][0] : x;
        const originY = points[0][1] < y ? points[0][1] : y;
        const rectWidth = Math.abs(points[0][0] - x);
        const rectHeight = Math.abs(points[0][1] - y);
        extraCtx.strokeRect(originX, originY, rectWidth, rectHeight);
      } else if (isPolygoning.value) {
        let i = points.length;
        extraCtx.moveTo(points[i - 1][0], points[i - 1][1]);
        extraCtx.lineTo(x, y);
        extraCtx.stroke();
        if (points.length > 1) {
          extraCtx.moveTo(x, y);
          extraCtx.lineTo(points[0][0], points[0][1]);
          extraCtx.stroke();
        }
        for (i = 1; i < points.length; i++) {
          extraCtx.moveTo(points[i - 1][0], points[i - 1][1]);
          extraCtx.lineTo(points[i][0], points[i][1]);
          extraCtx.stroke();
        }
      } else if (isCircling.value) {
        console.log("oui");
        let radius = Math.sqrt(
          Math.pow(points[0][0] - x, 2) + Math.pow(points[0][1] - y, 2)
        );
        extraCtx.beginPath();
        extraCtx.arc(points[0][0], points[0][1], radius, 0, 2 * Math.PI);
        extraCtx.closePath();
        extraCtx.stroke();
      }
    }
  }
}

function finishDrawing(event) {
  if (event.type == "touchend") event = event.changedTouches[0];
  let x = parseInt(event.pageX - canvasOffsetLeft);
  if (x > width) x = width;
  let y = parseInt(event.pageY - canvasOffsetTop);
  if (y > height) y = height;
  if (isSelecting.value) {
    points.push([x, y]);
    isSelecting.value = false;
    isSelected.value = true;
    displaySelecting();
  } else if (isPainting.value) {
    isPainting.value = false;
    ctx.stroke();
    ctx.beginPath();
    finishStep();
  } else if (isErasing.value) {
    isErasing.value = false;
    ctx.stroke();
    ctx.beginPath();
    finishStep();
  } else if (isLining.value) {
    points.push([x, y]);
    isLining.value = false;
    createLine();
  } else if (isRecting.value) {
    points.push([x, y]);
    isRecting.value = false;
    createRectangle();
  } else if (isCircling.value) {
    points.push([x, y]);
    isCircling.value = false;
    createCircle();
  }
}

function cancelDrawing() {
  resetDrawVariables();
  updateCanvasState();
  extraCtx.reset();
}

//  SELECTING

function displaySelecting() {
  if (isSelected.value && points.length > 1) {
    const originX = points[0][0] < points[1][0] ? points[0][0] : points[1][0];
    const originY = points[0][1] < points[1][1] ? points[0][1] : points[1][1];
    const rectWidth = Math.abs(points[0][0] - points[1][0]);
    const rectHeight = Math.abs(points[0][1] - points[1][1]);
    let layerCanvas = document.querySelector("#myLayerCanvas");
    extraCtx = layerCanvas.getContext("2d");
    extraCtx.reset();
    extraCtx.strokeStyle = "rgba(109, 184, 255, 1)";
    extraCtx.lineCap = "round";
    extraCtx.lineWidth = 2;
    extraCtx.strokeRect(originX, originY, rectWidth, rectHeight);
    setTimeout(hideSelecting, 400);
  } else {
    emptyPoints();
  }
}
function hideSelecting() {
  extraCtx.reset();
  setTimeout(displaySelecting, 400);
}

function eraseArea() {
  const originX = points[0][0] < points[1][0] ? points[0][0] : points[1][0];
  const originY = points[0][1] < points[1][1] ? points[0][1] : points[1][1];
  const rectWidth = Math.abs(points[0][0] - points[1][0]);
  const rectHeight = Math.abs(points[0][1] - points[1][1]);
  extraCtx.reset();
  isSelected.value = false;
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.fillRect(originX, originY, rectWidth, rectHeight);
  finishStep();
}

//  NORMAL_LINE

function createLine() {
  isLining.value = false;
  extraCtx.reset();
  ctx.moveTo(points[0][0], points[0][1]);
  ctx.lineTo(points[1][0], points[1][1]);
  ctx.stroke();
  finishStep();
}

//  MULTIPLE_LINE

//  RECTANGLE

function createRectangle() {
  const originX = points[0][0] < points[1][0] ? points[0][0] : points[1][0];
  const originY = points[0][1] < points[1][1] ? points[0][1] : points[1][1];
  const rectWidth = Math.abs(points[0][0] - points[1][0]);
  const rectHeight = Math.abs(points[0][1] - points[1][1]);
  isRecting.value = false;
  extraCtx.reset();
  ctx.beginPath();
  ctx.rect(originX, originY, rectWidth, rectHeight);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  finishStep();
}

//  POLYGON

function createPolygon() {
  extraCtx.reset();
  isPolygoning.value = false;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  if (points.length > 1) {
    ctx.lineTo(points[0][0], points[0][1]);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  finishStep();
}

//  CIRCLE

function createCircle() {
  let radius = Math.sqrt(
    Math.pow(points[0][0] - points[1][0], 2) +
      Math.pow(points[0][1] - points[1][1], 2)
  );
  isCircling.value = false;
  extraCtx.reset();
  ctx.beginPath();
  ctx.arc(points[0][0], points[0][1], radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  finishStep();
}

//  FILLING_POINT

function createFillingPoint() {
  if (points.length == 0) return;
  let colorToChange = ctx.getImageData(points[0][0], points[0][1], 1, 1).data;
  let x = points[0][0],
    y = points[0][1];
  let pixelStart = [x, y];
  let pixelStack = [pixelStart];
  while (pixelStack.length) {
    const pixel = pixelStack.pop();
    x = pixel[0];
    y = pixel[1];
    let color = ctx.getImageData(x, y, 1, 1).data;
    if (!compareRGBA(color, colorToChange)) continue;
    ctx.fillRect(x, y, 1, 1);
    if (x > 0) pixelStack.push([x - 1, y]);
    if (x < width.value - 1) pixelStack.push([x + 1, y]);
    if (y > 0) pixelStack.push([x, y - 1]);
    if (y < height.value - 1) pixelStack.push([x, y + 1]);
  }
  hideLoadingLayer();
  finishStep();
}

function initializeFillingPoint() {
  if (ctx.fillStyle == "rgba(0, 0, 0, 0)") {
    emptyPoints();
    return;
  }
  document.querySelector("#loadingLayer").style.zIndex = 2;
  setTimeout(createFillingPoint, 100);
}

//  CHANGE THE IMAGE STATE

function prevStateImage() {
  imageState.value--;
  resetDrawVariables();
  changeImageState(-1, clearImage);
}

function nextStateImage() {
  imageState.value++;
  resetDrawVariables();
  changeImageState(1, clearImage);
}

//  CHANGE THE IMAGE IN THE FLIPBOOK
function prevImage() {
  id.value--;
  layerIsDisplayed.value = false;
  resetDrawVariables();
  getImage(clearImage);
}

function nextImage() {
  id.value++;
  layerIsDisplayed.value = false;
  resetDrawVariables();
  getImage(clearImage);
}
</script>

<template>
  <div id="voile" ref="voile">
    <div id="continueWindow" ref="window">
      <h1>Bienvenue sur ton Flip Book</h1>
      <input type="submit" @click="hideVoile" value="Continuer" />
    </div>
  </div>

  <div id="drawingApp" @mouseup="finishDrawing" @touchend="finishDrawing">
    <Shapes />
    <div id="canvandcounter">
      <div id="aboveCanvas" :style="{ width: width + 'px' }">
        <div id="buttons">
          <div v-if="id > 0" class="copyButton">
            <div id="copyLast" @click="copyLast">
              <img src="./icons/copy.svg" alt="Copy Icon" />
            </div>
            <div id="copyOther">
              <input type="number" v-model="idCopy" min="1" :max="size" />
              <input type="submit" value="OK" @click="copyOther" />
            </div>
          </div>
          <div v-else class="copyButton desactivated">
            <img src="./icons/copy.svg" alt="Copy Icon" />
          </div>

          <div v-if="id > 0" class="displayLayer" @click="updateLayer">
            <img
              v-if="layerIsDisplayed"
              src="./icons/minusLayer.svg"
              alt="Minus Layer Icon"
            />
            <img v-else src="./icons/plusLayer.svg" alt="Plus Layer Icon" />
          </div>
          <div v-else class="displayLayer desactivated">
            <img src="./icons/plusLayer.svg" alt="Plus Layer Icon" />
          </div>

          <div v-if="isSelected" @click="eraseArea">
            <img src="./icons/trash.svg" alt="Trash Icon" />
          </div>
          <div v-if="isPolygoning" @click="createPolygon">
            <img src="./icons/correct.svg" alt="Correct Icon" />
          </div>
        </div>

        <h2>{{ id + 1 }} / {{ size }}</h2>
      </div>
      <canvas
        id="myCanvas"
        :width="width"
        :height="height"
        style="box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2)"
      ></canvas>
      <canvas
        id="myLayerCanvas"
        :width="width"
        :height="height"
        @mousedown="createPoint"
        @touchstart="createPoint"
        @mousemove="drawCanvas"
        @touchmove="drawCanvas"
      ></canvas>
      <div
        id="loadingLayer"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <img src="./icons/spinner.svg" alt="Spinner Icon" />
      </div>
      <div
        v-if="layerIsDisplayed"
        @mousedown="createPoint"
        @touchstart="createPoint"
        @mousemove="drawCanvas"
        @touchmove="drawCanvas"
        id="layer"
        :style="{ width: width + 'px', height: height + 'px' }"
      ></div>
      <div id="navig">
        <div class="flipbooknavig prev" v-if="id > 0" @click="prevImage">
          <img src="./icons/prev.svg" alt="Previous" />
          <h3>IMAGE</h3>
        </div>
        <div v-else class="flipbooknavig prev desactivated">
          <img src="./icons/prev.svg" alt="Previous" />
          <h3>IMAGE</h3>
        </div>
        <div id="imagenavig">
          <div class="prev" v-if="imageState > 0" @click="prevStateImage">
            <img src="./icons/undo.svg" alt="Undo" />
          </div>
          <div class="prev desactivated" v-else>
            <img src="./icons/undo.svg" alt="Undo" />
          </div>
          <div
            class="next"
            v-if="imageState < imageStateTotal - 1"
            @click="nextStateImage"
          >
            <img src="./icons/redo.svg" alt="Redo" />
          </div>
          <div class="next desactivated" v-else>
            <img src="./icons/redo.svg" alt="Redo" />
          </div>
        </div>
        <div class="flipbooknavig next" v-if="id + 1 < size" @click="nextImage">
          <h3>IMAGE</h3>
          <img src="./icons/next.svg" alt="Next" />
        </div>
        <div v-else class="flipbooknavig next desactivated">
          <h3>IMAGE</h3>
          <img src="./icons/next.svg" alt="Next" />
        </div>
      </div>
    </div>
    <Parameters />
  </div>
</template>

<style scoped>
#voile {
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

#continueWindow {
  width: 30vmax;
  height: 10vmax;
  background-color: v-bind(LAMA);
  color: v-bind(SUGAR_MILK);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10%;
  border-radius: 25px;
}

#continueWindow input {
  width: 25%;
  height: 20%;
  font-size: 1.1em;
  border-radius: 5px;
  border: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25),
    -2px -2px 5px rgba(255, 255, 255, 0.25);
}

#drawingApp {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#canvandcounter {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#aboveCanvas {
  -webkit-user-select: none;
  user-select: none;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
  color: v-bind(SWEET_BROWN);
}

#aboveCanvas > #buttons {
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
}

#buttons > div {
  height: 50px;
  background-color: v-bind(LAMA);
  border-radius: 50px;
  display: flex;
  align-items: center;
  color: v-bind(SUGAR_MILK);
}

#buttons > div:not(.copyButton:not(.copyButton.desactivated)) {
  width: 50px;
  justify-content: center;
}

#buttons > div:not(.copyButton),
#buttons > div:not(#buttons > div.desactivated) {
  cursor: pointer;
}

#buttons > div > img,
#buttons > div > div > img {
  height: 30px;
  width: 30px;
}

#buttons > div.desactivated {
  opacity: 0.25;
  cursor: default;
}

.copyButton:not(.copyButton.desactivated) {
  width: 50px;
  justify-content: space-between;
  overflow: hidden;
  transition: all 0.5s ease-out;
}

#buttons > .copyButton:hover {
  width: 150px;
}

.copyButton > #copyLast {
  min-width: 50px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 2px 2px 5px #d09667;
  cursor: pointer;
}

.copyButton > #copyOther {
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copyButton > #copyOther > input:nth-child(2) {
  cursor: pointer;
}

#myCanvas {
  position: relative;
}

#myLayerCanvas {
  z-index: 1;
  position: absolute;
  margin-top: -15px;
}

#canvandcounter > #loadingLayer {
  z-index: -1;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#canvandcounter > #loadingLayer > img {
  height: 30%;
  aspect-ratio: 1/1;
  animation: spinSpinner 1.5s infinite forwards linear;
  -webkit-user-select: none;
  user-select: none;
}

@keyframes spinSpinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#canvandcounter > #layer {
  position: absolute;
  opacity: 0.25;
  margin-top: -15px;
}
#canvandcounter > #layer > img {
  width: 100%;
  height: 100%;
}

#navig {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  -webkit-user-select: none;
  user-select: none;
}

.flipbooknavig {
  width: 160px;
  height: 50px;
  border-radius: 25px;
  background: v-bind(LAMA);
  color: v-bind(SUGAR_MILK);
  font-size: 1.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13%;
}

.flipbooknavig.desactivated {
  opacity: 0.25;
}

.flipbooknavig.prev {
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);
}
.flipbooknavig.next {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

#imagenavig {
  width: 160px;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#imagenavig div {
  width: 70px;
  height: 70px;
  border-radius: 30px;
  background: v-bind(LAMA);
  display: flex;
  align-items: center;
  justify-content: center;
}

#imagenavig div.desactivated {
  opacity: 0.25;
}

#imagenavig div.prev {
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);
}

#imagenavig div.next {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}
</style>
