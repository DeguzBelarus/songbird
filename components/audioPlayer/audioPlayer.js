// component state
// main player state
const audioContext = [
  null,
  function setAudioContext(value) {
    audioContext[0] = value;
  },
];

const audioAnalyser = [
  null,
  function setAudioAnalyser(value) {
    audioAnalyser[0] = value;
  },
];

const mediaPlayer = [
  null,
  function setMediaPlayer(value) {
    mediaPlayer[0] = value;
  },
];

const mediaSource = [
  null,
  function setMediaSource(value) {
    mediaSource[0] = value;
  },
];

const mainPlayerVolume = [
  1,
  function setMainPlayerVolume(value) {
    mainPlayerVolume[0] = value;
  },
];
// main player state

// mini player state
const audioContextMini = [
  null,
  function setAudioContextMini(value) {
    audioContextMini[0] = value;
  },
];

const audioAnalyserMini = [
  null,
  function setAudioAnalyserMini(value) {
    audioAnalyserMini[0] = value;
  },
];

const mediaPlayerMini = [
  null,
  function setMediaPlayerMini(value) {
    mediaPlayerMini[0] = value;
  },
];

const mediaSourceMini = [
  null,
  function setMediaSourceMini(value) {
    mediaSourceMini[0] = value;
  },
];

const mainPlayerVolumeMini = [
  1,
  function setMainPlayerVolumeMini(value) {
    mainPlayerVolumeMini[0] = value;
  },
];
// mini player state
// component state

export default function audioPlayer(
  type = "default",
  audioSrc,
  isRoundStarted,
  setIsRoundStarted
) {
  // component styles
  const audioPlayerCSSLink = document.createElement("link");
  audioPlayerCSSLink.rel = "stylesheet";
  audioPlayerCSSLink.href = "./components/audioPlayer/audioPlayer.css";
  document.head.append(audioPlayerCSSLink);
  // component styles

  // component body
  const audioPlayerWrapper = document.createElement("div");
  audioPlayerWrapper.classList.add("audio-player-wrapper");
  if (type === "mini") {
    audioPlayerWrapper.classList.add("mini-player");
  }

  const playerWrapper = document.createElement("div");
  playerWrapper.classList.add("player-wrapper");

  let mainPlayer;
  if (type === "default") {
    if (!mediaPlayer[0]) {
      mainPlayer = document.getElementById("main-player");
      mainPlayer.addEventListener("play", resumeAudioContext);
      mediaPlayer[1](mainPlayer);
    } else {
      mainPlayer = mediaPlayer[0];
      mainPlayer.addEventListener("play", resumeAudioContext);
    }
  } else {
    if (!mediaPlayerMini[0]) {
      mainPlayer = document.getElementById("second-player");
      mainPlayer.addEventListener("play", resumeAudioContext);
      mediaPlayerMini[1](mainPlayer);
    } else {
      mainPlayer = mediaPlayerMini[0];
      mainPlayer.addEventListener("play", resumeAudioContext);
    }
  }

  if (mainPlayer.src !== location.origin + audioSrc.slice(1)) {
    mainPlayer.src = audioSrc;
  }

  if (type === "default") {
    if (mainPlayerVolume[0] !== 1) {
      mainPlayer.volume = mainPlayerVolume[0];
    }
  } else {
    if (mainPlayerVolumeMini[0] !== 1) {
      mainPlayer.volume = mainPlayerVolumeMini[0];
    }
  }

  const visualizer = document.createElement("canvas");
  if (type === "default") {
    visualizer.setAttribute("id", "visualizer");
  } else {
    visualizer.setAttribute("id", "visualizer-mini");
  }

  // visualizer configuration
  let objectAudioContext;
  if (type === "default") {
    if (!audioContext[0]) {
      objectAudioContext = new AudioContext();
      audioContext[1](objectAudioContext);
    } else {
      objectAudioContext = audioContext[0];
    }
  } else {
    if (!audioContextMini[0]) {
      objectAudioContext = new AudioContext();
      audioContextMini[1](objectAudioContext);
    } else {
      objectAudioContext = audioContextMini[0];
    }
  }

  let objectAudioAnalyser;
  if (type === "default") {
    if (!audioAnalyser[0]) {
      objectAudioAnalyser = new AnalyserNode(objectAudioContext, {
        fftSize: 32,
      });
      objectAudioAnalyser.connect(objectAudioContext.destination);
      audioAnalyser[1](objectAudioAnalyser);
    } else {
      objectAudioAnalyser = audioAnalyser[0];
    }
  } else {
    if (!audioAnalyserMini[0]) {
      objectAudioAnalyser = new AnalyserNode(objectAudioContext, {
        fftSize: 32,
      });
      objectAudioAnalyser.connect(objectAudioContext.destination);
      audioAnalyserMini[1](objectAudioAnalyser);
    } else {
      objectAudioAnalyser = audioAnalyserMini[0];
    }
  }

  let objectMediaElementSource;
  if (type === "default") {
    if (!mediaSource[0]) {
      objectMediaElementSource =
        objectAudioContext.createMediaElementSource(mainPlayer);
      objectMediaElementSource.connect(objectAudioAnalyser);
      mediaSource[1](objectMediaElementSource);
    } else {
      objectMediaElementSource = mediaSource[0];
    }
  } else {
    if (!mediaSourceMini[0]) {
      objectMediaElementSource =
        objectAudioContext.createMediaElementSource(mainPlayer);
      objectMediaElementSource.connect(objectAudioAnalyser);
      mediaSourceMini[1](objectMediaElementSource);
    } else {
      objectMediaElementSource = mediaSourceMini[0];
    }
  }

  const arrayLength = objectAudioAnalyser.frequencyBinCount * 0.4;
  const frameArray = new Uint8Array(arrayLength);
  const audioCanvasContext = visualizer.getContext("2d");
  const barWidth = visualizer.width / arrayLength;

  function drawGraph() {
    objectAudioAnalyser.getByteFrequencyData(frameArray);
    audioCanvasContext.fillStyle = "#fff";
    audioCanvasContext.fillRect(0, 0, visualizer.width, visualizer.height);
    let barHeight;
    let x = 0;

    for (let i = 0; i < arrayLength; i++) {
      barHeight = (frameArray[i] / 256) * visualizer.height;

      audioCanvasContext.fillStyle =
        "rgb(" + (frameArray[i] + 120) + ", 50, 180";
      audioCanvasContext.fillRect(
        x,
        visualizer.height - barHeight,
        barWidth - 1,
        barHeight
      );

      x += barWidth;
    }

    if (!mainPlayer.ended) {
      requestAnimationFrame(drawGraph);
    }
  }

  function resumeAudioContext() {
    if (objectAudioContext.state == "suspended") {
      objectAudioContext.resume();
    }
    drawGraph();
  }
  // visualizer configuration

  if (!mainPlayer.paused) {
    resumeAudioContext();
  }

  // play/pause method
  function playAndPauseHandler(event) {
    if (type === "default") {
      if (!isRoundStarted) {
        setIsRoundStarted(true);
      }
    }

    if (mainPlayer.paused) {
      mainPlayer.play().catch((error) => console.log(error));
      event.target.innerText = "PAUSE";
      event.target.classList.remove("passive");
      event.target.classList.add("active");
    } else {
      mainPlayer.pause();
      event.target.classList.remove("active");
      event.target.classList.add("passive");
      event.target.innerText = "PLAY";
    }
  }
  // play/pause method

  const playAndPauseButtonWrapper = document.createElement("div");
  playAndPauseButtonWrapper.classList.add("player-controls-wrapper");

  const playAndPauseButton = document.createElement("button");
  playAndPauseButton.classList.add(
    type !== "mini" ? "play-pause-button" : "play-pause-button-second"
  );
  if (mainPlayer.paused) {
    playAndPauseButton.classList.remove("active");
    playAndPauseButton.classList.add("passive");
    playAndPauseButton.innerText = "PLAY";
  } else {
    playAndPauseButton.classList.remove("passive");
    playAndPauseButton.classList.add("active");
    playAndPauseButton.innerText = "PAUSE";
  }
  playAndPauseButton.addEventListener("click", (event) =>
    playAndPauseHandler(event)
  );
  playAndPauseButtonWrapper.append(playAndPauseButton);

  const mainPlayerVolumeRange = document.createElement("input");
  mainPlayerVolumeRange.type = "range";
  mainPlayerVolumeRange.setAttribute(
    "id",
    type !== "mini" ? "main-player-volume-range" : "mini-player-volume-range"
  );
  mainPlayerVolumeRange.min = "0";
  mainPlayerVolumeRange.max = "1";
  mainPlayerVolumeRange.step = "0.01";

  if (type === "default") {
    mainPlayerVolumeRange.value = mainPlayerVolume[0];
  } else {
    mainPlayerVolumeRange.value = mainPlayerVolumeMini[0];
  }

  mainPlayerVolumeRange.addEventListener("change", (event) => {
    if (type === "default") {
      mainPlayerVolume[1](event.target.value);
    } else {
      mainPlayerVolumeMini[1](event.target.value);
    }
    mainPlayer.volume = event.target.value;
  });
  playAndPauseButtonWrapper.append(mainPlayerVolumeRange);

  const stopPlayingButton = document.createElement("button");
  stopPlayingButton.type = "button";
  stopPlayingButton.innerText = "STOP";
  stopPlayingButton.classList.add("stop-playing-button");

  // stop playing method
  function stopPlaying() {
    if (mainPlayer.paused && mainPlayer.currentTime === 0) return;

    mainPlayer.pause();
    mainPlayer.currentTime = 0;
    playingTrack.value = 0;
    playAndPauseButton.classList.remove("active");
    playAndPauseButton.classList.add("passive");
    playAndPauseButton.innerText = "PLAY";
  }
  // stop playing method

  stopPlayingButton.addEventListener("click", stopPlaying);
  playAndPauseButtonWrapper.append(stopPlayingButton);
  playAndPauseButtonWrapper.append(visualizer);

  playerWrapper.append(playAndPauseButtonWrapper);

  const playingTrack = document.createElement("input");
  playingTrack.type = "range";
  playingTrack.setAttribute(
    "id",
    type !== "mini" ? "main-playing-track" : "second-playing-track"
  );
  playingTrack.min = "0";
  playingTrack.max = "100";
  playingTrack.step = "1";

  playingTrack.value =
    !mainPlayer.currentTime && !mainPlayer.duration
      ? 0
      : (mainPlayer.currentTime / mainPlayer.duration) * 100;

  if (navigator.maxTouchPoints < 1) {
    function playPositionChangeStart() {
      const playerStatePaused = mainPlayer.paused;
      mainPlayer.pause();

      if (!playerStatePaused) {
        playAndPauseButton.innerText = "~";
      }

      function playPositionChangeEnd() {
        mainPlayer.currentTime =
          (mainPlayer.duration * playingTrack.value) / 100;

        if (!playerStatePaused) {
          mainPlayer.play();
          playAndPauseButton.classList.remove("passive");
          playAndPauseButton.classList.add("active");
          playAndPauseButton.innerText = "PAUSE";
        }

        document.removeEventListener("mouseup", playPositionChangeEnd);
      }

      document.addEventListener("mouseup", playPositionChangeEnd);
    }
    playingTrack.addEventListener("mousedown", playPositionChangeStart);
  } else {
    function playPositionChangeStart() {
      const playerStatePaused = mainPlayer.paused;
      mainPlayer.pause();

      if (!playerStatePaused) {
        playAndPauseButton.innerText = "~";
      }

      function playPositionChangeEnd() {
        mainPlayer.currentTime =
          (mainPlayer.duration * playingTrack.value) / 100;

        if (!playerStatePaused) {
          mainPlayer.play();
          playAndPauseButton.classList.remove("passive");
          playAndPauseButton.classList.add("active");
          playAndPauseButton.innerText = "PAUSE";
        }

        document.removeEventListener("touchend", playPositionChangeEnd);
      }

      document.addEventListener("touchend", playPositionChangeEnd);
    }
    playingTrack.addEventListener("touchstart", playPositionChangeStart);
  }

  playerWrapper.append(playingTrack);
  // component body

  // component appending
  audioPlayerWrapper.append(playerWrapper);
  // component appending

  return audioPlayerWrapper;
}
