const revealerNav = window.revealer({
    revealElementSelector: ".nav-js",
    options: {
        anchorSelector: ".nav-btn-js",
    }
});

document.addEventListener("click", function (event) {
    const actionBtn = document.querySelector(".nav-btn-js");

    if (event.target.classList.contains("nav-btn-js")) {
        if (!revealerNav.isRevealed()) {
            revealerNav.reveal();
            actionBtn.setAttribute("data-open", true);
        } else {
            revealerNav.hide();
            actionBtn.setAttribute("data-open", false);
        }
    }
    else if (event.target.tagName === "A" && event.target.closest(".header__menu-item")) {
        event.preventDefault();

        revealerNav.hide();
        actionBtn.setAttribute("data-open", false);

        const targetLink = event.target.getAttribute("href");
        const currentPage = window.location.pathname.split("/").pop();

        if (targetLink !== currentPage) {
            barba.go(targetLink);
        }
    }
});