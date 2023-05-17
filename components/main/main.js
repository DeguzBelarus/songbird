// component state
const birdsGroupsNames = [
  "Разминка",
  "Воробьиные",
  "Лесные птицы",
  "Певчие птицы",
  "Хищные птицы",
  "Морские птицы",
];

const birdsGroupsNamesEn = [
  "Warm-up",
  "Sparrows",
  "Forest birds",
  "Songbirds",
  "Birds of prey",
  "Seabirds",
];
// component state

export default function main(
  birdsData,
  birdGuessItem,
  currentPage,
  currentRound,
  setCurrentRound,
  currentGuessBird,
  setCurrentGuessBird,
  currentGuessBirdsArray,
  setCurrentGuessBirdsArray,
  isGameWon,
  totalScore,
  isRoundWon,
  setIsRoundWon,
  setIsGameWon,
  currentWrongBirdsArray,
  setCurrentWrongBirdsArray,
  setTotalScore,
  audioPlayer,
  birdsDataEn,
  currentAfterRoundBird,
  setCurrentAfterRoundBird,
  currentAudioPositionIntervalSecond,
  setCurrentAudioPositionIntervalSecond,
  isRoundStarted,
  setIsRoundStarted,
  currentAudioPositionIntervalMain,
  setCurrentAudioPositionIntervalMain,
  currentLanguage,
  setCurrentLanguage,
  setCurrentPage
) {
  // component styles
  if (!document.querySelector("main")) {
    const mainCSSLink = document.createElement("link");
    mainCSSLink.rel = "stylesheet";
    mainCSSLink.href = "./components/main/main.css";
    document.head.append(mainCSSLink);
  }
  // component styles

  // component body
  let main;
  if (!document.querySelector("main")) {
    main = document.createElement("main");
  } else {
    main = document.querySelector("main");
    if (main.innerHTML !== "") {
      main.innerHTML = "";
    }
  }

  // getting players elements
  const mainPlayer = document.getElementById("main-player");
  const miniPlayer = document.getElementById("second-player");
  // getting players elements

  // clearing all player timeouts if round is not started
  if (!isRoundStarted) {
    if (currentAudioPositionIntervalMain) {
      clearInterval(currentAudioPositionIntervalMain);
      setCurrentAudioPositionIntervalMain(null);
    }
    if (currentAudioPositionIntervalSecond) {
      clearInterval(currentAudioPositionIntervalSecond);
      setCurrentAudioPositionIntervalSecond(null);
    }
  }
  if (currentAudioPositionIntervalSecond) {
    clearInterval(currentAudioPositionIntervalSecond);
    setCurrentAudioPositionIntervalSecond(null);
  }
  // clearing all player timeouts if round is not started

  // game restart method
  function restartGame() {
    if (mainPlayer && !mainPlayer.paused) {
      mainPlayer.pause();
      mainPlayer.currentTime = 0;
    }
    if (miniPlayer && !miniPlayer.paused) {
      miniPlayer.pause();
      miniPlayer.currentTime = 0;
    }

    if (currentAudioPositionIntervalMain) {
      clearInterval(currentAudioPositionIntervalMain);
    }
    if (currentAudioPositionIntervalSecond) {
      clearInterval(currentAudioPositionIntervalSecond);
    }

    setCurrentRound(0);
    setIsGameWon(false);
    setCurrentWrongBirdsArray([]);
    setTotalScore(0);
    setIsRoundStarted(false);
    setCurrentGuessBird(null);
    setIsRoundWon(false);
  }
  // game restart method

  // language switch method
  function languageSwitch() {
    if (currentLanguage === "ru") {
      setCurrentLanguage("en");
    } else {
      setCurrentLanguage("ru");
    }
  }
  // language switch method

  // hide/show header and footer
  if (currentPage === "default") {
    const header = document.querySelector(".header");
    if (header) {
      header.classList.add("hidden");
    }
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.classList.add("hidden");

      const githubLink = document.querySelector(".github-link");
      githubLink.style.display = "none";
      const rssLink = document.querySelector(".rss-link");
      rssLink.style.display = "none";
    }
  } else {
    const header = document.querySelector(".header");
    if (header) {
      header.style.display = "flex";
      header.classList.remove("hidden");
    }
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.style.display = "flex";
      footer.classList.remove("hidden");
    }
  }
  // hide/show header and footer

  // default page
  if (currentPage === "default") {
    const presentationContainer = document.createElement("div");
    presentationContainer.classList.add("presentation-container");

    const deguzParagraph = document.createElement("h2");
    deguzParagraph.classList.add("my-nickname-paragraph");
    deguzParagraph.innerText = "Deguz";
    presentationContainer.append(deguzParagraph);

    setTimeout(() => {
      deguzParagraph.style.display = "none";
    }, 7000);

    setTimeout(() => {
      const rsschoolParagraph = document.createElement("h2");
      rsschoolParagraph.classList.add("rsschool-paragraph");
      rsschoolParagraph.innerText = "and RS School";
      presentationContainer.append(rsschoolParagraph);

      setTimeout(() => {
        rsschoolParagraph.style.display = "none";
      }, 7001);
    }, 7001);

    setTimeout(() => {
      const presentsParagraph = document.createElement("h2");
      presentsParagraph.classList.add("presents-paragraph");
      presentsParagraph.innerText = "PRESENT";
      presentationContainer.append(presentsParagraph);

      setTimeout(() => {
        presentsParagraph.style.display = "none";
      }, 7001);
    }, 14002);

    setTimeout(() => {
      const songbirdParagraph = document.createElement("h1");
      songbirdParagraph.classList.add("game-name-paragraph");
      songbirdParagraph.innerText = "SongBird";
      presentationContainer.append(songbirdParagraph);
    }, 21003);

    setTimeout(() => {
      const gameEnterButton = document.createElement("button");
      gameEnterButton.classList.add("game-enter-button");
      gameEnterButton.innerText = `${
        currentLanguage === "ru" ? "ВОЙТИ" : "ENTER"
      }`;

      function gameEntering() {
        // gameEnterButton.classList.add("hidden");

        const header = document.querySelector(".header");
        if (header) {
          header.style.display = "flex";
          header.classList.remove("hidden");
        }
        const footer = document.querySelector(".footer");
        if (footer) {
          footer.style.display = "flex";
          footer.classList.remove("hidden");

          const githubLink = document.querySelector(".github-link");
          githubLink.style.display = "inline";
          const rssLink = document.querySelector(".rss-link");
          rssLink.style.display = "inline";
        }

        setTimeout(() => {
          setCurrentPage("quiz");
        }, 1001);
      }

      gameEnterButton.addEventListener("click", gameEntering);
      presentationContainer.append(gameEnterButton);

      const languageSwitchButton = document.createElement("button");
      languageSwitchButton.classList.add("language-switch-button");
      languageSwitchButton.innerHTML = `${
        currentLanguage === "ru"
          ? '<span class="current-language">RU</span>/<span>EN</span>'
          : '<span>RU</span>/<span class="current-language">EN</span>'
      }`;
      languageSwitchButton.addEventListener("click", languageSwitch);
      main.append(languageSwitchButton);
    }, 23000);

    main.append(presentationContainer);

    if (mainPlayer && !mainPlayer.paused) {
      mainPlayer.pause();
      mainPlayer.currentTime = 0;
    }
    if (miniPlayer && !miniPlayer.paused) {
      miniPlayer.pause();
      miniPlayer.currentTime = 0;
    }

    if (currentAudioPositionIntervalMain) {
      clearInterval(currentAudioPositionIntervalMain);
    }
    if (currentAudioPositionIntervalSecond) {
      clearInterval(currentAudioPositionIntervalSecond);
    }
  }
  // default page

  // result page
  if (currentPage === "quiz" && isGameWon) {
    const resultWrapper = document.createElement("div");
    resultWrapper.classList.add("result-wrapper");

    const greetingsParagraph = document.createElement("p");
    greetingsParagraph.classList.add("greetings-paragraph");
    if (totalScore === birdsData.length * 5) {
      greetingsParagraph.innerText = `${
        currentLanguage === "ru"
          ? `Поздравляем, Вы завершили игру с максимальным результатом - ${totalScore} очков!`
          : `Congratulations, you have completed the game with the maximum score - ${totalScore} points!`
      }`;
    } else {
      greetingsParagraph.innerText = `${
        currentLanguage === "ru"
          ? `Вы завершили игру с результатом ${totalScore} очков, допустив ${
              birdsData.length * 5 - totalScore
            } ошибок, попробуйте еще раз!`
          : `You have completed the game with the result of ${totalScore} points, allowing ${
              birdsData.length * 5 - totalScore
            } errors, try again!`
      }`;
    }
    resultWrapper.append(greetingsParagraph);

    const newGameButton = document.createElement("button");
    newGameButton.type = "button";
    newGameButton.classList.add("new-game-button");
    newGameButton.innerText = `${
      currentLanguage === "ru" ? "Начать заново" : "Start again"
    }`;
    newGameButton.addEventListener("click", restartGame);
    resultWrapper.append(newGameButton);

    main.append(resultWrapper);

    if (mainPlayer && !mainPlayer.paused) {
      mainPlayer.pause();
      mainPlayer.currentTime = 0;
    }
    if (miniPlayer && !miniPlayer.paused) {
      miniPlayer.pause();
      miniPlayer.currentTime = 0;
    }

    if (currentAudioPositionIntervalMain) {
      clearInterval(currentAudioPositionIntervalMain);
    }
    if (currentAudioPositionIntervalSecond) {
      clearInterval(currentAudioPositionIntervalSecond);
    }
  }
  // result page

  // gallery page
  if (currentPage === "gallery") {
    const galleryWrapper = document.createElement("div");
    galleryWrapper.classList.add("gallery-wrapper");
    main.append(galleryWrapper);

    let currentLanguageBirdsData;
    if (currentLanguage === "ru") {
      currentLanguageBirdsData = birdsData;
    } else {
      currentLanguageBirdsData = birdsDataEn;
    }

    if (currentLanguageBirdsData && currentLanguageBirdsData?.length) {
      currentLanguageBirdsData.forEach((birdsGroup, groupIndex) => {
        const birdsGroupBlock = document.createElement("div");
        birdsGroupBlock.classList.add("birds-group-block");
        galleryWrapper.append(birdsGroupBlock);

        const groupHeader = document.createElement("h3");
        groupHeader.classList.add("group-header");
        groupHeader.innerText = `${
          currentLanguage === "ru"
            ? birdsGroupsNames[groupIndex]
            : birdsGroupsNamesEn[groupIndex]
        }`;
        birdsGroupBlock.append(groupHeader);

        const birdItemsWrapper = document.createElement("div");
        birdItemsWrapper.classList.add("birds-wrapper");
        birdsGroupBlock.append(birdItemsWrapper);

        if (Array.isArray(birdsGroup)) {
          birdsGroup.forEach((birdItem) => {
            const birdItemElement = document.createElement("div");
            birdItemElement.classList.add("bird-item");

            const birdPoster = document.createElement("img");
            birdPoster.draggable = false;
            birdPoster.classList.add("poster-image");
            birdPoster.alt = "a bird";
            birdPoster.src = birdItem.image;
            birdItemElement.append(birdPoster);

            const nameDescriptionWrapper = document.createElement("div");
            nameDescriptionWrapper.classList.add("name-description");
            birdItemElement.append(nameDescriptionWrapper);

            const birdNameHeader = document.createElement("h4");
            birdNameHeader.classList.add("bird-item-name");
            birdNameHeader.innerText = `${birdItem.name} (${birdItem.species})`;
            nameDescriptionWrapper.append(birdNameHeader);

            const birdDescriptionParagraph = document.createElement("p");
            birdDescriptionParagraph.classList.add(
              "bird-description-paragraph"
            );
            birdDescriptionParagraph.innerText = birdItem.description;
            nameDescriptionWrapper.append(birdDescriptionParagraph);

            const birdItemVoice = document.createElement("audio");
            birdItemVoice.controls = true;
            birdItemVoice.loop = "loop";
            birdItemVoice.src = birdItem.audio;
            birdItemElement.append(birdItemVoice);

            const playPauseButton = document.createElement("img");
            playPauseButton.draggable = false;
            playPauseButton.classList.add("play-pause-icon");
            playPauseButton.src = "assets/images/play-icon.svg";
            playPauseButton.alt = "a play icon";
            playPauseButton.addEventListener("click", () => {
              if (birdItemVoice.paused) {
                birdItemVoice.play();
                playPauseButton.src = "assets/images/pause-icon.svg";
                playPauseButton.alt = "a pause icon";
              } else {
                birdItemVoice.pause();
                playPauseButton.src = "assets/images/play-icon.svg";
                playPauseButton.alt = "a play icon";
              }
            });
            birdItemElement.append(playPauseButton);

            birdItemsWrapper.append(birdItemElement);
          });
        }
      });
    }
  }
  // gallery page

  // quiz page
  if (currentPage === "quiz" && !isGameWon) {
    const quizWrapper = document.createElement("div");
    quizWrapper.classList.add("quiz-wrapper");

    const categoriesContainer = document.createElement("div");
    categoriesContainer.classList.add("categories-container");

    const upperQuizContainer = document.createElement("div");
    upperQuizContainer.classList.add("upper-container");

    const guessBirdPosterContainer = document.createElement("div");
    guessBirdPosterContainer.classList.add("guess-bird-poster-container");

    const playerBigContainer = document.createElement("div");
    playerBigContainer.classList.add("player-big-container");

    const lowerQuizContainer = document.createElement("div");
    lowerQuizContainer.classList.add("lower-container");

    const guessItemsContainer = document.createElement("div");
    guessItemsContainer.classList.add("guess-items-container");

    const guessPreviewContainer = document.createElement("div");
    guessPreviewContainer.classList.add("guess-preview-container");

    if (currentLanguage === "ru") {
      birdsData.forEach((birdsGroup, index) => {
        const currentCategoryBlock = document.createElement("div");
        currentCategoryBlock.classList.add("category-block");
        if (index === currentRound) {
          currentCategoryBlock.classList.add("current-category");
        }
        currentCategoryBlock.innerText = `${birdsGroupsNames[index]}`;
        categoriesContainer.append(currentCategoryBlock);
      });
    } else {
      birdsDataEn.forEach((birdsGroup, index) => {
        const currentCategoryBlock = document.createElement("div");
        currentCategoryBlock.classList.add("category-block");
        if (index === currentRound) {
          currentCategoryBlock.classList.add("current-category");
        }
        currentCategoryBlock.innerText = `${birdsGroupsNamesEn[index]}`;
        categoriesContainer.append(currentCategoryBlock);
      });
    }

    const scoreSpan = document.createElement("span");
    scoreSpan.classList.add("score-span");
    scoreSpan.innerText = `${
      currentLanguage === "ru" ? `Счёт: ${totalScore}` : `Score: ${totalScore}`
    }`;
    playerBigContainer.append(scoreSpan);

    const hiddenGuessBirdSpan = document.createElement("p");
    hiddenGuessBirdSpan.classList.add("hidden-name-paragraph");
    if (currentLanguage === "ru") {
      hiddenGuessBirdSpan.innerText = `${
        isRoundWon ? `Это - ${currentGuessBird.name}!` : "Это - ***"
      }`;
    } else {
      hiddenGuessBirdSpan.innerText = `${
        isRoundWon ? `This - ${currentGuessBird.name}!` : "This - ***"
      }`;
    }
    playerBigContainer.append(hiddenGuessBirdSpan);

    quizWrapper.append(categoriesContainer);
    quizWrapper.append(upperQuizContainer);
    upperQuizContainer.append(guessBirdPosterContainer);
    upperQuizContainer.append(playerBigContainer);
    lowerQuizContainer.append(guessItemsContainer);
    lowerQuizContainer.append(guessPreviewContainer);
    quizWrapper.append(lowerQuizContainer);
    main.append(quizWrapper);

    const guessBirdPoster = document.createElement("img");
    if (currentLanguage === "ru") {
      guessBirdPoster.alt = "загаданная птица";
    } else {
      guessBirdPoster.alt = "the secret bird";
    }
    guessBirdPoster.src = `${
      isRoundWon
        ? `${currentGuessBird.image}`
        : "./assets/images/bird-default-logo.png"
    }`;
    guessBirdPoster.classList.add("bird-poster-default");
    guessBirdPoster.draggable = false;
    guessBirdPosterContainer.append(guessBirdPoster);

    let currentGuessBirdData;
    if (!currentGuessBird?.name) {
      if (currentLanguage === "ru") {
        const currentGuessBirdIndex = Math.floor(
          Math.random() * birdsData[currentRound]?.length
        );
        currentGuessBirdData = birdsData[currentRound][currentGuessBirdIndex];
        setCurrentGuessBird(birdsData[currentRound][currentGuessBirdIndex]);
        playerBigContainer.append(
          audioPlayer(
            "default",
            birdsData[currentRound][currentGuessBirdIndex].audio,
            isRoundStarted,
            setIsRoundStarted
          )
        );
      } else {
        const currentGuessBirdIndex = Math.floor(
          Math.random() * birdsDataEn[currentRound]?.length
        );
        currentGuessBirdData = birdsDataEn[currentRound][currentGuessBirdIndex];
        setCurrentGuessBird(birdsDataEn[currentRound][currentGuessBirdIndex]);
        playerBigContainer.append(
          audioPlayer(
            "default",
            birdsDataEn[currentRound][currentGuessBirdIndex].audio,
            isRoundStarted,
            setIsRoundStarted
          )
        );
      }
    } else {
      playerBigContainer.append(
        audioPlayer(
          "default",
          currentGuessBird?.audio,
          isRoundStarted,
          setIsRoundStarted
        )
      );
    }

    if (currentLanguage === "ru") {
      birdsData[currentRound].forEach((birdData) => {
        const birdGuess = birdGuessItem(
          birdData,
          currentGuessBird ? currentGuessBird : currentGuessBirdData,
          isRoundWon,
          setIsRoundWon,
          currentWrongBirdsArray,
          setCurrentWrongBirdsArray,
          totalScore,
          birdsData,
          setTotalScore,
          setCurrentAfterRoundBird,
          isRoundStarted
        );
        guessItemsContainer.append(birdGuess);
      });
    } else {
      birdsDataEn[currentRound].forEach((birdData) => {
        const birdGuess = birdGuessItem(
          birdData,
          currentGuessBird ? currentGuessBird : currentGuessBirdData,
          isRoundWon,
          setIsRoundWon,
          currentWrongBirdsArray,
          setCurrentWrongBirdsArray,
          totalScore,
          birdsData,
          setTotalScore,
          setCurrentAfterRoundBird,
          isRoundStarted
        );
        guessItemsContainer.append(birdGuess);
      });
    }

    if (isRoundWon) {
      guessPreviewContainer.classList.add("game-in-progress");

      const posterAndDescriptionWrapper = document.createElement("div");
      posterAndDescriptionWrapper.classList.add("poster-description-wrapper");

      const previewBirdImage = document.createElement("img");
      previewBirdImage.classList.add("bird-preview-poster");
      previewBirdImage.alt = `${currentAfterRoundBird.name}`;
      previewBirdImage.src = `${currentAfterRoundBird.image}`;
      previewBirdImage.draggable = false;
      posterAndDescriptionWrapper.append(previewBirdImage);

      const previewBirdTextWrapper = document.createElement("div");
      previewBirdTextWrapper.classList.add("name-description-wrapper");

      const previewBirdName = document.createElement("h4");
      previewBirdName.classList.add("bird-preview-name");
      previewBirdName.innerText = `${currentAfterRoundBird.name} (${currentAfterRoundBird.species})`;
      previewBirdTextWrapper.append(previewBirdName);

      const previewBirdDescription = document.createElement("h5");
      previewBirdDescription.classList.add("bird-preview-description");
      previewBirdDescription.innerText = `${currentAfterRoundBird.description}`;
      previewBirdTextWrapper.append(previewBirdDescription);

      const miniPlayerWrapper = document.createElement("div");
      miniPlayerWrapper.classList.add("mini-player-wrapper");
      miniPlayerWrapper.append(
        audioPlayer(
          "mini",
          currentAfterRoundBird?.audio,
          isRoundStarted,
          setIsRoundStarted
        )
      );

      posterAndDescriptionWrapper.append(previewBirdTextWrapper);
      guessPreviewContainer.append(posterAndDescriptionWrapper);
      guessPreviewContainer.append(miniPlayerWrapper);
    } else if (currentWrongBirdsArray?.length) {
      let currentWrongBird;
      if (currentLanguage === "ru") {
        currentWrongBird = birdsData[currentRound]?.find(
          (foundBirdData) =>
            foundBirdData.name ===
            currentWrongBirdsArray[currentWrongBirdsArray?.length - 1]
        );
      } else {
        currentWrongBird = birdsDataEn[currentRound]?.find(
          (foundBirdData) =>
            foundBirdData.name ===
            currentWrongBirdsArray[currentWrongBirdsArray?.length - 1]
        );
      }

      guessPreviewContainer.classList.add("game-in-progress");

      const posterAndDescriptionWrapper = document.createElement("div");
      posterAndDescriptionWrapper.classList.add("poster-description-wrapper");

      const previewBirdImage = document.createElement("img");
      previewBirdImage.classList.add("bird-preview-poster");
      previewBirdImage.alt = `${currentWrongBird.name}`;
      previewBirdImage.src = `${currentWrongBird.image}`;
      previewBirdImage.draggable = false;
      posterAndDescriptionWrapper.append(previewBirdImage);

      const previewBirdTextWrapper = document.createElement("div");
      previewBirdTextWrapper.classList.add("name-description-wrapper");

      const previewBirdName = document.createElement("h4");
      previewBirdName.classList.add("bird-preview-name");
      previewBirdName.innerText = `${currentWrongBird.name} (${currentWrongBird.species})`;
      previewBirdTextWrapper.append(previewBirdName);

      const previewBirdDescription = document.createElement("h5");
      previewBirdDescription.classList.add("bird-preview-description");
      previewBirdDescription.innerText = `${currentWrongBird.description}`;
      previewBirdTextWrapper.append(previewBirdDescription);

      const miniPlayerWrapper = document.createElement("div");
      miniPlayerWrapper.classList.add("mini-player-wrapper");
      miniPlayerWrapper.append(
        audioPlayer(
          "mini",
          currentWrongBird?.audio,
          isRoundStarted,
          setIsRoundStarted
        )
      );

      posterAndDescriptionWrapper.append(previewBirdTextWrapper);
      guessPreviewContainer.append(posterAndDescriptionWrapper);
      guessPreviewContainer.append(miniPlayerWrapper);
    } else {
      const previewContainerProposeText = document.createElement("h3");
      previewContainerProposeText.classList.add("propose-header");
      previewContainerProposeText.innerText = `${
        currentLanguage === "ru"
          ? "Пожалуйста, включите воспроизведение звука, затем выберите птицу, чей голос прозвучит"
          : "Please turn on the sound playback, then select the bird whose voice will sound"
      }`;
      guessPreviewContainer.append(previewContainerProposeText);
    }

    const nextRestartButtonsWrapper = document.createElement("div");
    nextRestartButtonsWrapper.classList.add("next-restart-wrapper");

    if (isRoundStarted || currentRound !== 0) {
      const newGameButton = document.createElement("button");
      newGameButton.type = "button";
      newGameButton.classList.add("new-game-button");
      newGameButton.innerText = `${
        currentLanguage === "ru" ? "Начать заново" : "Start again"
      }`;
      newGameButton.addEventListener("click", restartGame);
      nextRestartButtonsWrapper.append(newGameButton);
    }

    const nextButton = document.createElement("button");
    nextButton.addEventListener("click", () => {
      if (mainPlayer && !mainPlayer.paused) {
        mainPlayer.pause();
        mainPlayer.currentTime = 0;
      }
      if (miniPlayer && !miniPlayer.paused) {
        miniPlayer.pause();
        miniPlayer.currentTime = 0;
      }

      if (currentLanguage === "ru") {
        if (currentRound + 1 === birdsData?.length) {
          setIsGameWon(true);
        }
      } else {
        if (currentRound + 1 === birdsDataEn?.length) {
          setIsGameWon(true);
        }
      }

      setCurrentWrongBirdsArray([]);
      setCurrentRound(++currentRound);
      setIsRoundStarted(false);
      setCurrentGuessBird(null);
      setIsRoundWon(false);
    });
    nextButton.innerText = `${currentLanguage === "ru" ? "Далее" : "Next"}`;
    nextButton.classList.add("next-round-button");
    nextButton.disabled = isRoundWon ? false : true;
    nextRestartButtonsWrapper.append(nextButton);

    main.append(nextRestartButtonsWrapper);
  }
  // quiz page
  // component body

  document.body.append(main);
}
