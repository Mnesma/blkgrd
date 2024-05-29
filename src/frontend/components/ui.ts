import { manifest } from "../manifest";
import { Guild } from "./guild";

export class Ui {
    static init() {
        const title = this.createTitle();
        const previousYearButton = this.createPreviousYearButton();

        document.addEventListener("mousedown", () => {
            document.body.classList.remove("cursor-mouse-up");
            document.body.classList.add("cursor-mouse-down");
        });

        document.addEventListener("mouseup", () => {
            document.body.classList.add("cursor-mouse-up");
            document.body.classList.remove("cursor-mouse-down");
        });

        document.body.appendChild(title);
        document.body.appendChild(previousYearButton);
    }

    static createTitle(): HTMLElement {
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title-container");

        const title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = "Blackguard";

        const subtitle = document.createElement("h3");
        subtitle.classList.add("subtitle");
        subtitle.textContent = "2024";

        titleContainer.appendChild(title);
        titleContainer.appendChild(subtitle);

        titleContainer.addEventListener("click", console.log);

        return titleContainer;
    }

    static createPreviousYearButton(): HTMLElement {
        const previousYearButtonContainer = document.createElement("div");
        previousYearButtonContainer.classList.add(
            "previous-year-button-container"
        );

        return previousYearButtonContainer;
    }
}
