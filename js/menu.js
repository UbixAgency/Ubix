const revealerNav = window.revealer({
    revealElementSelector: ".header__nav",
    options: {
        anchorSelector: ".menu__btn",
    }
});

const actionBtn = document.querySelector(".menu__btn");
actionBtn.addEventListener("click", () => {
    if (!revealerNav.isRevealed()) {
        document.body.style.overflow = "hidden";
        revealerNav.reveal();
        actionBtn.setAttribute("data-open", true);
    } else {
        document.body.style.overflow = "auto";
        revealerNav.hide();
        actionBtn.setAttribute("data-open", false);
    }
});

const navLinks = document.querySelectorAll(".header__menu-item");
navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        document.body.style.overflow = "auto";
        revealerNav.hide();
        actionBtn.setAttribute("data-open", false);

        const targetLink = event.target.getAttribute("href");
        const currentPage = window.location.pathname.split("/").pop();

        if (targetLink !== currentPage) {
            barba.go(targetLink);
        }
    });
});