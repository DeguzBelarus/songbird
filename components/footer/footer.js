// component state
let setAudioPositionIntervalSecondState;
let setAudioPositionIntervalMainState;

const currentAudioPositionInterval = [
  null,
  function setCurrentAudioPositionInterval(value) {
    currentAudioPositionInterval[0] = value;
    setAudioPositionIntervalMainState(value);
  },
];

const currentAudioPositionIntervalSecond = [
  null,
  function setCurrentAudioPositionIntervalSecond(value) {
    currentAudioPositionIntervalSecond[0] = value;
    setAudioPositionIntervalSecondState(value);
  },
];
// component state

export default function footer(
  setCurrentAudioPositionIntervalSecondState,
  setCurrentAudioPositionIntervalMain
) {
  // component styles
  if (!document.querySelector("footer")) {
    const footerCSSLink = document.createElement("link");
    footerCSSLink.rel = "stylesheet";
    footerCSSLink.href = "./components/footer/footer.css";
    document.head.append(footerCSSLink);
  }
  // component styles

  // component body
  let footer;
  if (!document.querySelector("footer")) {
    footer = document.createElement("footer");
  } else {
    footer = document.querySelector("footer");
    footer.innerHTML = "";
  }

  footer.classList.add("footer");

  // assign value to the upper variable to get access to it in the local state
  setAudioPositionIntervalSecondState =
    setCurrentAudioPositionIntervalSecondState;
  setAudioPositionIntervalMainState = setCurrentAudioPositionIntervalMain;
  // assign value to the upper variable to get access to it in the local state

  const copyrightSpan = document.createElement("span");
  copyrightSpan.classList.add("copyright-span");
  copyrightSpan.innerHTML = "© ";

  const githubLink = document.createElement("a");
  githubLink.classList.add("github-link");
  githubLink.href = "https://github.com/DeguzBelarus/";
  githubLink.innerText = "Deguz ";
  githubLink.target = "_blank";
  githubLink.rel = "noreferrer noopener";
  copyrightSpan.append(githubLink);

  const binderSpan = document.createElement("span");
  binderSpan.innerText = "& ";
  copyrightSpan.append(binderSpan);

  const rssLink = document.createElement("a");
  rssLink.classList.add("rss-link");
  rssLink.href = "https://rs.school/js/";
  rssLink.target = "_blank";
  rssLink.rel = "noreferrer noopener";
  const rssLogo = document.createElement("img");
  rssLogo.src = "https://rs.school/images/rs_school_js.svg";
  rssLogo.alt = "the rolling scopes school logo";
  rssLink.append(rssLogo);
  copyrightSpan.append(rssLink);

  const copyrightYearSpan = document.createElement("span");
  copyrightYearSpan.innerText = ", 2022";
  copyrightSpan.append(copyrightYearSpan);

  const playerElement = document.createElement("audio");
  playerElement.loop = "loop";
  playerElement.setAttribute("id", "main-player");
  playerElement.addEventListener("play", () => {
    const newAudioPositionInterval = setInterval(() => {
      const playingTrackMain = document.getElementById("main-playing-track");

      if (playingTrackMain) {
        playingTrackMain.value =
          (playerElement.currentTime / playerElement.duration) * 100;
      }
    }, 500);
    currentAudioPositionInterval[1](newAudioPositionInterval);

    const playPauseButton = document.querySelector(".play-pause-button");
    playPauseButton.classList.remove("passive");
    playPauseButton.classList.add("active");
    playPauseButton.innerText = "PAUSE";
  });
  playerElement.addEventListener("pause", () => {
    if (currentAudioPositionInterval[0]) {
      clearInterval(currentAudioPositionInterval[0]);
      currentAudioPositionInterval[1](null);
    }

    if (playerElement.currentTime === playerElement.duration) {
      const playingTrackMain = document.getElementById("main-playing-track");

      if (playingTrackMain.value !== 0) {
        const playAndPauseButton = document.querySelector(".play-pause-button");
        playAndPauseButton.classList.remove("active");
        playAndPauseButton.classList.add("passive");
        playAndPauseButton.innerText = "PLAY";
        playingTrackMain.value = 0;
      }
    }
  });

  const playerElementSecond = document.createElement("audio");
  playerElementSecond.loop = "loop";
  playerElementSecond.setAttribute("id", "second-player");
  playerElementSecond.addEventListener("play", () => {
    const newAudioPositionIntervalSecond = setInterval(() => {
      const playingTrackSecond = document.getElementById(
        "second-playing-track"
      );

      if (playingTrackSecond) {
        playingTrackSecond.value =
          (playerElementSecond.currentTime / playerElementSecond.duration) *
          100;
      }
    }, 500);
    currentAudioPositionIntervalSecond[1](newAudioPositionIntervalSecond);

    const playPauseButton = document.querySelector(".play-pause-button-second");
    playPauseButton.classList.remove("passive");
    playPauseButton.classList.add("active");
    playPauseButton.innerText = "PAUSE";
  });
  playerElementSecond.addEventListener("pause", () => {
    if (currentAudioPositionIntervalSecond[0]) {
      clearInterval(currentAudioPositionIntervalSecond[0]);
      currentAudioPositionIntervalSecond[1](null);
    }

    if (playerElementSecond.currentTime === playerElementSecond.duration) {
      const playingTrackSecond = document.getElementById(
        "second-playing-track"
      );

      if (playingTrackSecond.value !== 0) {
        const playAndPauseButtonSecond = document.querySelector(
          ".play-pause-button-second"
        );
        playAndPauseButtonSecond.classList.remove("active");
        playAndPauseButtonSecond.classList.add("passive");
        playAndPauseButtonSecond.innerText = "PLAY";
        playingTrackSecond.value = 0;
      }
    }
  });

  const playerElementSfx = document.createElement("audio");
  playerElementSfx.setAttribute("id", "sfx-player");
  // component body

  // component appending
  footer.append(copyrightSpan);
  footer.append(playerElement);
  footer.append(playerElementSecond);
  footer.append(playerElementSfx);
  // component appending

  document.body.append(footer);
}
