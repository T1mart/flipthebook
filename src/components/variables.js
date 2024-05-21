import { ref } from "vue";

//  STATE NUMBER
export const CANVAS_SIZE_FORM_STATE = 1;
export const FLIPBOOK_SIZE_FORM_STATE = 2;
export const DRAWING_STATE = 3;
export const VIDEO_STATE = 4;
export const appState = ref(CANVAS_SIZE_FORM_STATE);

//  APP COLORS
export const SUGAR_MILK = ref("#FBF9F3");
export const SWEET_BROWN = ref("#C68964");
export const LAMA = ref("#E0B99A");
export const FLINT_ROCK = ref("#999791");
export const BISCUIT = ref("#FFE9CA");
export const ENGLISH_VIOLET = ref("#564256");
export const SEA_GREEN = ref("#519872");
export const RED = ref("#880D1E");

//  CANVAS INFOS
export const MIN_WIDTH = ref(parseInt(window.innerWidth * 0.2));
export const MIN_HEIGHT = ref(parseInt(window.innerHeight * 0.1));
export const MAX_WIDTH = ref(parseInt(window.innerWidth * 0.6));
export const MAX_HEIGHT = ref(parseInt(window.innerHeight * 0.5));

export const MIN_SIZE = ref(10);
export const MAX_SIZE = ref(1000);

export const width = ref(parseInt(window.innerWidth * 0.5));
export const height = ref(parseInt(window.innerHeight * 0.4));
export const size = ref(20);
export const id = ref(0);
export const idCopy = ref(1);
export const layerIsDisplayed = ref(false);

//  CANVAS DRAW STATE
export const canvasState = ref(false);
export const isSelecting = ref(false);
export const isSelected = ref(false);
export const isPainting = ref(false);
export const isErasing = ref(false);
export const isLining = ref(false);
export const isRecting = ref(false);
export const isPolygoning = ref(false);
export const isCircling = ref(false);

//  IMAGE INFOS
export const imageState = ref(0);
export const imageStateTotal = ref(1);

//  SHAPES ID
export const SELECT = 0;
export const DRAW = 1;
export const ERASE = 2;
export const NORMAL_LINE = 3;
export const MULTIPLE_LINE = 4;
export const RECTANGLE = 5;
export const POLYOGON = 6;
export const CIRCLE = 8;
export const FILLING_POINT = 9;

//  SHAPE INFOS
export const shapeMode = ref(NORMAL_LINE);
export const shapeStrokeColor = ref("rgba(0, 0, 0, 1)");
export const shapeFillColor = ref("rgba(0, 0, 0, 0)");
export const shapeStrokeSize = ref(5);

//  POINTS
export let points = [];

export function emptyPoints() {
  points = [];
}

//  COLOR FUNCTIONS

export function compareRGBA(colorPattern1, colorPattern2) {
  return (
    colorPattern1[0] == colorPattern2[0] &&
    colorPattern1[1] == colorPattern2[1] &&
    colorPattern1[2] == colorPattern2[2] &&
    colorPattern1[3] == colorPattern2[3]
  );
}

export function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

//  DRAW STATE VARIABLES

export function drawingStateVariables() {
  return (
    isSelecting.value ||
    isSelected.value ||
    isPainting.value ||
    isErasing.value ||
    isLining.value ||
    isRecting.value ||
    isPolygoning.value ||
    isCircling.value
  );
}

//  RESET FUNCTION

export function resetTotalVariables() {
  appState.value = CANVAS_SIZE_FORM_STATE;
  width.value = parseInt(window.innerWidth * 0.5);
  height.value = parseInt(window.innerHeight * 0.4);
  size.value = 20;
  id.value = 0;
  layerIsDisplayed.value = false;
  isSelecting.value = false;
  isSelected.value = false;
  isLining.value = false;
  isRecting.value = false;
  isPainting.value = false;
  isPolygoning.value = false;
  imageState.value = 0;
  imageStateTotal.value = 1;
  shapeMode.value = NORMAL_LINE;
  shapeStrokeColor.value = "rgba(0, 0, 0, 1)";
  shapeFillColor.value = "rgba(0, 0, 0, 0)";
  shapeStrokeSize.value = 5;
  emptyPoints();
}

export function resetDrawVariables() {
  isSelecting.value = false;
  isSelected.value = false;
  isLining.value = false;
  isRecting.value = false;
  isPainting.value = false;
  isPolygoning.value = false;
  emptyPoints();
}
