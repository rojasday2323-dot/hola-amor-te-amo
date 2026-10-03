const cinema = document.getElementById("cinema");
const start = document.getElementById("start");
const replay = document.getElementById("replay");
const replayWrap = document.getElementById("replayWrap");
const kissText = document.getElementById("kissText");
const alwaysText = document.getElementById("alwaysText");
const sceneImages = [
  document.querySelector(".base-scene"),
  document.querySelector(".scene-one-img"),
  document.querySelector(".scene-two-img"),
  document.querySelector(".scene-three-img")
];
let sceneTimerOne;
let sceneTimerTwo;
let sceneTimerThree;
let replayTimer;
let kissFirstTimer;
let kissSecondTimer;
let kissHideTimer;
let pathFirstTimer;
let pathSecondTimer;
let pathHideTimer;

function setReplayVisible(visible){
  replayWrap.style.opacity = visible ? "1" : "0";
  replayWrap.style.visibility = visible ? "visible" : "hidden";
  replayWrap.style.pointerEvents = visible ? "auto" : "none";
}

function setBlockVisibility(block, visible){
  if (!block) return;
  block.style.opacity = visible ? "1" : "0";
  block.style.visibility = visible ? "visible" : "hidden";
}

function setLineVisibility(block, selector, visible){
  if (!block) return;
  const line = block.querySelector(selector);
  if (!line) return;
  line.style.opacity = visible ? "1" : "0";
  line.style.visibility = visible ? "visible" : "hidden";
}

function showScene(index){
  sceneImages.forEach((img, i) => {
    if (!img) return;
    const visible = i === index;
    img.style.opacity = visible ? "1" : "0";
    img.style.visibility = visible ? "visible" : "hidden";
  });
}

function resetMoment(){
  cinema.classList.remove("playing", "scene-one", "scene-two", "scene-three", "replay-visible");
  showScene(0);
  setBlockVisibility(kissText, false);
  setBlockVisibility(alwaysText, false);
  setLineVisibility(kissText, "span", false);
  setLineVisibility(kissText, "strong", false);
  setLineVisibility(alwaysText, "span", false);
  setLineVisibility(alwaysText, "strong", false);
  setReplayVisible(false);
  clearTimeout(sceneTimerOne);
  clearTimeout(sceneTimerTwo);
  clearTimeout(sceneTimerThree);
  clearTimeout(replayTimer);
  clearTimeout(kissFirstTimer);
  clearTimeout(kissSecondTimer);
  clearTimeout(kissHideTimer);
  clearTimeout(pathFirstTimer);
  clearTimeout(pathSecondTimer);
  clearTimeout(pathHideTimer);
}

function playMoment(){
  resetMoment();
  void cinema.offsetWidth;
  cinema.classList.add("playing");

  setBlockVisibility(kissText, true);
  setLineVisibility(kissText, "span", true);
  setLineVisibility(kissText, "strong", false);

  kissSecondTimer = setTimeout(() => {
    setLineVisibility(kissText, "strong", true);
  }, 2200);

  kissHideTimer = setTimeout(() => {
    setBlockVisibility(kissText, false);
  }, 4800);

  pathFirstTimer = setTimeout(() => {
    setBlockVisibility(alwaysText, true);
    setLineVisibility(alwaysText, "span", true);
    setLineVisibility(alwaysText, "strong", false);
  }, 5200);

  pathSecondTimer = setTimeout(() => {
    setLineVisibility(alwaysText, "strong", true);
  }, 7600);

  pathHideTimer = setTimeout(() => {
    setBlockVisibility(alwaysText, false);
  }, 10400);

  sceneTimerOne = setTimeout(() => {
    cinema.classList.add("scene-one");
    showScene(1);
  }, 3000);

  sceneTimerTwo = setTimeout(() => {
    cinema.classList.remove("scene-one");
    cinema.classList.add("scene-two");
    showScene(2);
  }, 6000);

  sceneTimerThree = setTimeout(() => {
    cinema.classList.remove("scene-two");
    cinema.classList.add("scene-three");
    showScene(3);
  }, 9000);

  replayTimer = setTimeout(() => {
    cinema.classList.add("replay-visible");
    setReplayVisible(true);
  }, 12000);
}

start.addEventListener("click", playMoment);
replay.addEventListener("click", () => {
  resetMoment();
});
