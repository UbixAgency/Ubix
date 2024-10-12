function initAboutPage() {
    const wrapper = document.getElementById("tiles");

    let columns = 0, rows = 0;

    const createTile = index => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        return tile;
    }

    const createTiles = quantity => {
        Array.from(Array(quantity)).map((tile, index) => {
            wrapper.appendChild(createTile(index));
        });
    }

    const createGrid = () => {
        wrapper.innerHTML = "";
        const size = document.body.clientWidth > 800 ? 100 : 50;
        const viewportHeight = window.innerHeight;
        columns = Math.floor(document.body.clientWidth / size);
        rows = Math.floor(viewportHeight / size);
        wrapper.style.setProperty("--columns", columns);
        wrapper.style.setProperty("--rows", rows);
        createTiles(columns * rows);
    }

    createGrid();

    window.onresize = () => createGrid();
}

initAboutPage();