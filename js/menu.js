const revealerNav = window.revealer({
    revealElementSelector: ".nav-js",
    options: {
        anchorSelector: ".nav-btn-js",
    }
});

const actionBtn = document.querySelector(".nav-btn-js");
actionBtn.addEventListener("click", () => {
    if (!revealerNav.isRevealed()) {
        revealerNav.reveal();
        actionBtn.setAttribute("data-open", true);
    } else {
        revealerNav.hide();
        actionBtn.setAttribute("data-open", false);
    }
});

const navLinks = document.querySelectorAll(".header__menu-item");
navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        revealerNav.hide();
        actionBtn.setAttribute("data-open", false);

        const targetLink = event.target.getAttribute("href");
        const currentPage = window.location.pathname.split("/").pop();

        if (targetLink !== currentPage) {
            barba.go(targetLink);
        }
    });
});