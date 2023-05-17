import main from "./components/main/main.js";
import header from "./components/header/header.js";
import birdsData from "./birds-data.js";
import birdGuessItem from "./components/birdGuessItem/birdGuessItem.js";
import audioPlayer from "./components/audioPlayer/audioPlayer.js";
import birdsDataEn from "./birds-data-en.js";

const store = {};

function mainComponentRefresh() {
  main(
    birdsData,
    birdGuessItem,
    store.currentPage[0],
    store.currentRound[0],
    store.currentRound[1],
    store.currentGuessBird[0],
    store.currentGuessBird[1],
    store.currentGuessBirdsArray[0],
    store.currentGuessBirdsArray[1],
    store.isGameWon[0],
    store.totalScore[0],
    store.isRoundWon[0],
    store.isRoundWon[1],
    store.isGameWon[1],
    store.currentWrongBirdsArray[0],
    store.currentWrongBirdsArray[1],
    store.totalScore[1],
    audioPlayer,
    birdsDataEn,
    store.currentAfterRoundBird[0],
    store.currentAfterRoundBird[1],
    store.currentAudioPositionIntervalSecond[0],
    store.currentAudioPositionIntervalSecond[1],
    store.isRoundStarted[0],
    store.isRoundStarted[1],
    store.currentAudioPositionIntervalMain[0],
    store.currentAudioPositionIntervalMain[1],
    store.currentLanguage[0],
    store.currentLanguage[1],
    store.currentPage[1]
  );
}

function headerRefresh() {
  header(store.currentPage[1], store.currentPage[0], store.currentLanguage[0]);
}

export const currentLanguage = [
  "ru",
  function setCurrentLanguage(value) {
    currentLanguage[0] = value;
    localStorage.setItem("songbird-save", JSON.stringify(value));
    headerRefresh();
    store.currentRound[1](0);
    store.isGameWon[1](false);
    store.currentWrongBirdsArray[1]([]);
    store.totalScore[1](0);
    store.isRoundStarted[1](false);
    store.currentGuessBird[1](null);
    store.isRoundWon[1](false);
  },
];

export const currentAudioPositionIntervalSecond = [
  null,
  function setCurrentAudioPositionIntervalSecond(value) {
    currentAudioPositionIntervalSecond[0] = value;
  },
];

export const currentAudioPositionIntervalMain = [
  null,
  function setCurrentAudioPositionIntervalMain(value) {
    currentAudioPositionIntervalMain[0] = value;
  },
];

export const currentGuessBird = [
  null,
  function setCurrentGuessBird(value) {
    currentGuessBird[0] = value;
  },
];

export const currentAfterRoundBird = [
  null,
  function setCurrentAfterRoundBird(value) {
    if (value === currentAfterRoundBird[0]) return;
    currentAfterRoundBird[0] = value;
    mainComponentRefresh();
  },
];

export const currentGuessBirdsArray = [
  [],
  function setCurrentGuessBirdsArray(value) {
    currentGuessBirdsArray[0] = value;
  },
];

export const isGameWon = [
  false,
  function setIsGameWon(value) {
    isGameWon[0] = value;
    mainComponentRefresh();
  },
];

export const isRoundWon = [
  false,
  function setIsRoundWon(value) {
    isRoundWon[0] = value;
    mainComponentRefresh();
  },
];

export const isRoundStarted = [
  false,
  function setIsRoundStarted(value) {
    isRoundStarted[0] = value;
    mainComponentRefresh();
  },
];

export const totalScore = [
  0,
  function setTotalScore(value) {
    totalScore[0] = value;
  },
];

export const currentWrongBirdsArray = [
  [],
  function setCurrentWrongBirdsArray(value) {
    currentWrongBirdsArray[0] = value;
    mainComponentRefresh();
  },
];

export const currentRound = [
  0,
  function setCurrentRound(value) {
    currentRound[0] = value;
    mainComponentRefresh();
  },
];

export const currentPage = [
  "default",
  function setCurrentPage(value) {
    currentPage[0] = value;
    headerRefresh();
    mainComponentRefresh();
  },
];

store.currentRound = currentRound;
store.currentPage = currentPage;
store.currentGuessBird = currentGuessBird;
store.currentGuessBirdsArray = currentGuessBirdsArray;
store.isGameWon = isGameWon;
store.totalScore = totalScore;
store.currentWrongBirdsArray = currentWrongBirdsArray;
store.isRoundWon = isRoundWon;
store.currentAfterRoundBird = currentAfterRoundBird;
store.currentAudioPositionIntervalSecond = currentAudioPositionIntervalSecond;
store.currentAudioPositionIntervalMain = currentAudioPositionIntervalMain;
store.isRoundStarted = isRoundStarted;
store.currentLanguage = currentLanguage;

// getting language settings from local storage
if (localStorage.getItem("songbird-save")) {
  if (store.currentLanguage[0] !== localStorage.getItem("songbird-save")) {
    store.currentLanguage[1](JSON.parse(localStorage.getItem("songbird-save")));
  }
} else {
  localStorage.setItem(
    "songbird-save",
    JSON.stringify(store.currentLanguage[0])
  );
}
// getting language settings from local storage
