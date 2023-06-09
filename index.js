import guildPhotoParticipants from "./guild-photo-participants-2023.js";

const loadingIndicator = document.querySelector(".loading-indicator");
const root = document.querySelector("#root");
const playerButtonTemplate = document.querySelector("#player-button-template").children[0];
const playerButtonContainer = document.querySelector(".player-button-container");
const playerBossCard = document.querySelector(".player-boss-card");
const scrollUpButton = document.querySelector(".scroll-button.up");
const scrollDownButton = document.querySelector(".scroll-button.down");

const logoPieces = [
  ["b", document.querySelector("#b")],
  ["l", document.querySelector("#l")],
  ["a", document.querySelector("#a1")],
  ["c", document.querySelector("#c")],
  ["k", document.querySelector("#k")],
  ["g", document.querySelector("#g")],
  ["u", document.querySelector("#u")],
  ["a", document.querySelector("#a2")],
  ["r", document.querySelector("#r")],
  ["d", document.querySelector("#d")]
];

let logoProgress = "";

let easterEggTriggered = false;

const alphabetically = (name1, name2) => name1.localeCompare(name2);

const allPlayerNames = [...guildPhotoParticipants.sort(alphabetically)];

const playerButtons = new Map();

const getSelectedPlayerNameFromURL = () => {
  const searchParams = new URLSearchParams(location.search);

  if (searchParams.has("selected")) {
    const selectedPlayerName = searchParams.get("selected");

    if (allPlayerNames.includes(selectedPlayerName)) {
      return selectedPlayerName;
    }
  }

  return null;
};

const state = {
  selectedPlayerName: getSelectedPlayerNameFromURL() ?? allPlayerNames[0]
};

const setSelectedSearchParam = (playerName) => {
  const { origin, pathname, search } = location;
  const searchParams = new URLSearchParams(search);
  searchParams.set("selected", playerName);
  history.replaceState(null, "", `${origin}${pathname}?${searchParams}`);
};

const UltraButtonStyle = {
  SirUltra: "SirUltra",
  Ultra: "Ultra"
};

const setUltraButtonStyle = (style) => {
  const ultraButton = document.querySelector(".player-sirultra");

  switch (style) {
    case UltraButtonStyle.SirUltra: {
      ultraButton.style.setProperty("background-image", "url(assets/guild-photo-2023/sirultra_button.png)");
      ultraButton.dataset.playerName = "sirultra";
      break;
    }
    case UltraButtonStyle.Ultra: {
      ultraButton.style.setProperty("background-image", "url(assets/guild-photo-2023/ultra_button.png)");
      ultraButton.dataset.playerName = "ultra";
      break;
    }
  }
}

const getNextLetter = () => {
  return logoPieces[Math.min(logoProgress.length, logoPieces.length - 1)];
};

const getCurrentLetter = () => {
  return logoPieces[Math.max(logoProgress.length - 1, 0)];
};

const resetLetterElements = () => {
  logoPieces.forEach(([_, element]) => {
    element.classList.remove("active");
  });
};

const playParticles = () => {
  particlesJS.load("niolet-particles-container", "particles/niolet-particles.json");
  particlesJS.load("poglet-particles-container", "particles/poglet-particles.json");
  particlesJS.load("gunlet-particles-container", "particles/gunlet-particles.json");
  particlesJS.load("heartlet-particles-container", "particles/heartlet-particles.json");
  easterEggTriggered = true;
};

const processLetter = (letter) => {
  if (easterEggTriggered) {
    return;
  }

  const [nextLetter, letterElement] = getNextLetter();
  const [currentLetter] = getCurrentLetter()

  if (letter === nextLetter) {
    letterElement.classList.add("active");
    logoProgress += letter;

    const [newNextLetter] = getNextLetter();
    if (newNextLetter === "u") {
      setUltraButtonStyle(UltraButtonStyle.Ultra);
    } else {
      setUltraButtonStyle(UltraButtonStyle.SirUltra);
    }
  } else if (letter !== currentLetter) {
    resetLetterElements();
    logoProgress = "";
    setUltraButtonStyle(1);
  }

  if (logoProgress === "blackguard") {
    playParticles();
    resetLetterElements();
  }
};

const updateCurrentPlayerCard = (event) => {
  const { target } = event;
  const { playerName } = target.dataset;
  // const firstLetter = playerName.substring(0, 1);
  // processLetter(firstLetter);

  if (playerName === "ultra") {
    setSelectedPlayer("sirultra");
  } else {
    setSelectedPlayer(playerName);
  }
};

const setSelectedPlayer = (playerName) => {
  const previouslyActiveButton = playerButtons.get(state.selectedPlayerName);
  previouslyActiveButton.classList.remove("active");
  const currentActiveButton = playerButtons.get(playerName);
  currentActiveButton.classList.add("active");
  state.selectedPlayerName = playerName;
  playerBossCard.src = `assets/guild-photo-2023/${playerName}_card.png`;
  setSelectedSearchParam(playerName);
};

const scrollDown = () => {
  if (!scrollDownButton.disabled) {
    playerButtonContainer.scrollBy(0, 33);
    updateScrollButtonState();
  }
};

const scrollUp = () => {
  if (!scrollUpButton.disabled) {
    playerButtonContainer.scrollBy(0, -33);
    updateScrollButtonState();
  }
};

const scrollInWheelDirection = (wheelEvent) => {
  const { deltaY } = wheelEvent;

  if (deltaY > 0) {
    scrollDown();
  } else if (deltaY < 0) {
    scrollUp();
  }
};

const updateScrollButtonState = () => {
  const { clientHeight, scrollTop, scrollHeight } = playerButtonContainer;
  const bottomScrollAmount = Math.max(scrollHeight - clientHeight, 0);
  const atBottomOfContainer = scrollTop === bottomScrollAmount;
  const atTopOfContainer = playerButtonContainer.scrollTop === 0;
  scrollUpButton.disabled = atTopOfContainer;
  scrollDownButton.disabled = atBottomOfContainer;
};

const selectPlayerInDirection = (direction) => {
  const currentPlayerIndex = allPlayerNames.indexOf(state.selectedPlayerName);
  const nextIndex = Math.min(Math.max(currentPlayerIndex + direction, 0), allPlayerNames.length - 1);

  if (currentPlayerIndex !== nextIndex) {
    const nextPlayer = allPlayerNames[nextIndex];
    setSelectedPlayer(nextPlayer);
    playerButtons.get(nextPlayer).scrollIntoView({ block: "nearest" });
  }
};

const scrollWithArrowKeys = (keyboardEvent) => {
  const { key } = keyboardEvent;

  switch (key) {
    case "ArrowUp": {
      keyboardEvent.preventDefault();
      selectPlayerInDirection(-1);
      break;
    }
    case "ArrowDown": {
      keyboardEvent.preventDefault();
      selectPlayerInDirection(1);
      break;
    }
  }
};

class ImageLoadHandler {
  constructor(imageOwner, resolve, totalImages = 2) {
    this.imageOwner = imageOwner;
    this.resolve = resolve;
    this.totalImages = totalImages;
    this.loadedImagesCount = 0;

    this.load = () => {
      this.loadedImagesCount++;
      if (this.loadedImagesCount === this.totalImages) {
        this.resolve(this.imageOwner);
      }
    };
  }
}

const loadImages = (urls, ownerName, resolve) => {
  const loadHandler = new ImageLoadHandler(ownerName, resolve, urls.length);
  urls.forEach((url) => {
    const newImage = new Image();
    newImage.addEventListener("load", loadHandler.load);
    newImage.src = url;
  });
};

const startApp = () => {
  document.addEventListener("mousedown", () => {
    document.body.classList.remove("cursor-mouse-up");
    document.body.classList.add("cursor-mouse-down");
  });
  
  document.addEventListener("mouseup", () => {
    document.body.classList.add("cursor-mouse-up");
    document.body.classList.remove("cursor-mouse-down");
  });

  const imageRequests = Promise.all([
    new Promise((resolve) => (
      loadImages([
        "assets/guild-photo-2023/background.png",
        "assets/guild-photo-2023/gotofridge_button.png",
        "assets/guild-photo-2023/scrollup_button.png",
        "assets/guild-photo-2023/scrolldown_button.png",
        "assets/guild-photo-2023/cursor_down.png",
        "assets/guild-photo-2023/blackguard_logo.png",
        "assets/guild-photo-2023/cursor_hover.webp",
        "assets/guild-photo-2023/ultra_button.png"
      ], null, resolve)
    )),
    ...allPlayerNames.map((playerName) => (
      new Promise((resolve) => {
        loadImages([
          `assets/guild-photo-2023/${playerName}_card.png`,
          `assets/guild-photo-2023/${playerName}_button.png`,
        ], playerName, resolve);
      })
    ))
  ]);

  imageRequests
    .then(ownerNames => ownerNames.filter(name => name))
    .then((playerNames) => {
      playerNames.forEach((playerName) => {
        const newButton = playerButtonTemplate.cloneNode(true);
        newButton.style.setProperty("background-image", `url("assets/guild-photo-2023/${playerName}_button.png")`);
        newButton.classList.add(`player-${playerName}`);
        newButton.dataset.playerName = playerName;
        newButton.addEventListener("click", updateCurrentPlayerCard);
        playerButtonContainer.appendChild(newButton);
        playerButtons.set(playerName, newButton);
      });
    })
    .then(() => {
      loadingIndicator.classList.add("hide");
      root.classList.remove("hide");
      setSelectedPlayer(state.selectedPlayerName);
      playerButtons.get(state.selectedPlayerName).scrollIntoView();
      updateScrollButtonState();
    
      scrollDownButton.addEventListener("click", scrollDown);
      scrollUpButton.addEventListener("click", scrollUp);
      playerButtonContainer.addEventListener("wheel", scrollInWheelDirection);
      document.addEventListener("keydown", scrollWithArrowKeys);
    });
};

window.addEventListener("load", startApp);