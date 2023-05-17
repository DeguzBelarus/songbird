export default function birdGuessItem(
  data,
  currentGuessBird,
  isRoundWon,
  setIsRoundWon,
  currentWrongBirdsArray,
  setCurrentWrongBirdsArray,
  totalScore,
  birdsData,
  setTotalScore,
  setCurrentAfterRoundBird,
  isRoundStarted
) {
  // component styles
  const birdGuessItemCSSLink = document.createElement("link");
  birdGuessItemCSSLink.rel = "stylesheet";
  birdGuessItemCSSLink.href = "./components/birdGuessItem/birdGuessItem.css";
  document.head.append(birdGuessItemCSSLink);
  // component styles

  // component body
  const birdGuessItemWrapper = document.createElement("div");
  birdGuessItemWrapper.classList.add("bird-guess-item-wrapper");
  birdGuessItemWrapper.draggable = false;
  if (isRoundWon) {
    birdGuessItemWrapper.addEventListener("click", guessAttempt);
    if (
      currentWrongBirdsArray.some((wrongBirdName) => wrongBirdName == data.name)
    ) {
      birdGuessItemWrapper.classList.add("wrong");
    }

    if (currentGuessBird.name === data.name) {
      birdGuessItemWrapper.classList.add("right");
    }
  } else {
    if (!isRoundStarted) {
      birdGuessItemWrapper.classList.add("completed");
      birdGuessItemWrapper.classList.add("not-started");
    } else {
      if (
        currentWrongBirdsArray.some(
          (wrongBirdName) => wrongBirdName === data.name
        )
      ) {
        birdGuessItemWrapper.classList.add("wrong");
        birdGuessItemWrapper.classList.add("completed");
      } else {
        birdGuessItemWrapper.addEventListener("click", guessAttempt);
      }
    }
  }

  function guessAttempt() {
    if (!isRoundWon) {
      if (data.name !== currentGuessBird.name) {
        const sfxPlayer = document.getElementById("sfx-player");
        sfxPlayer.src = "./assets/sounds/general/wrong-answer.mp3";
        sfxPlayer.play();
        setCurrentWrongBirdsArray([...currentWrongBirdsArray, data.name]);
      } else {
        setTotalScore(
          birdsData?.length - 1 - currentWrongBirdsArray?.length + totalScore
        );
        const sfxPlayer = document.getElementById("sfx-player");
        sfxPlayer.src = "./assets/sounds/general/right-answer.mp3";
        sfxPlayer.play();
        const mainPlayer = document.getElementById("main-player");
        mainPlayer.pause();
        mainPlayer.currentTime = 0;
        const playAndPauseButton = document.querySelector(".play-pause-button");
        playAndPauseButton.classList.remove("active");
        playAndPauseButton.classList.add("passive");
        playAndPauseButton.innerText = "PLAY";
        const playingTrackMain = document.getElementById("main-playing-track");
        playingTrackMain.value = 0;
        setCurrentAfterRoundBird(data);
        setIsRoundWon(true);
      }
    } else {
      setCurrentAfterRoundBird(data);
    }
  }

  const birdNameSpan = document.createElement("span");
  birdNameSpan.classList.add("bird-name-span");
  birdNameSpan.innerText = data.name;
  // component body

  // component appending
  birdGuessItemWrapper.append(birdNameSpan);
  // component appending

  return birdGuessItemWrapper;
}
