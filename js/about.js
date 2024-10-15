function initAboutPage() {
    const container = document.querySelector("#tiles"),
        tile = document.querySelector(".tile");

    for (let i = 0; i < 1599; i++) {
        container.appendChild(tile.cloneNode());
    }
}

initAboutPage();