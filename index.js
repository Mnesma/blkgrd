import guildPhotoParticipants from "./guild-photo-participants-2023.js";

const playerButtonTemplate = document.querySelector("#player-button-template").children[0];
const playerButtonContainer = document.querySelector(".player-button-container");
const playerBossCard = document.querySelector(".player-boss-card");
const scrollUpButton = document.querySelector(".scroll-button.up");
const scrollDownButton = document.querySelector(".scroll-button.down");

const alphabetically = (name1, name2) => name1.localeCompare(name2);

const allPlayerNames = new Set(guildPhotoParticipants.sort(alphabetically));

const playerButtons = new Map();

const getSelectedPlayerNameFromURL = () => {
  const searchParams = new URLSearchParams(location.search);

  if (searchParams.has("selected")) {
    const selectedPlayerName = searchParams.get("selected");

    if (allPlayerNames.has(selectedPlayerName)) {
      return selectedPlayerName;
    }
  }

  return null;
}

const firstPlayerName = allPlayerNames.values().next().value;

const state = {
  selectedPlayerName: getSelectedPlayerNameFromURL() ?? firstPlayerName
};

const setSelectedSearchParam = (playerName) => {
  const { origin, pathname, search } = location;
  const searchParams = new URLSearchParams(search);
  searchParams.set("selected", playerName);
  history.replaceState(null, "", `${origin}${pathname}?${searchParams}`);
};

const updateCurrentPlayerCard = (event) => {
  const { target } = event;
  const { playerName } = target.dataset;
  setSelectedPlayer(playerName);
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

const startApp = () => {
  allPlayerNames.forEach((playerName) => {
    const newButton = playerButtonTemplate.cloneNode(true);
    newButton.style.setProperty("background-image", `url("assets/guild-photo-2023/${playerName}_button.png")`);
    newButton.dataset.playerName = playerName;
    newButton.addEventListener("click", updateCurrentPlayerCard);
    playerButtonContainer.appendChild(newButton);
    playerButtons.set(playerName, newButton);
  });

  setSelectedPlayer(state.selectedPlayerName);
  playerButtons.get(state.selectedPlayerName).scrollIntoView();
  updateScrollButtonState();

  scrollDownButton.addEventListener("click", scrollDown);
  scrollUpButton.addEventListener("click", scrollUp);
  playerButtonContainer.addEventListener("wheel", scrollInWheelDirection);
};

window.addEventListener("load", startApp);
