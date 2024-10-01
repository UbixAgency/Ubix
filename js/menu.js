const tl = gsap.timeline({ paused: true });

tl.to(".menu-left", 0.75, {
    left: 0,
    ease: Expo.easeInOut
});

tl.to(".menu-right", 0.75, {
    right: 0,
    ease: Expo.easeInOut
}, "-=0.75");

tl.staggerFrom(".menu-links > div", 0.5, {
    y: 100,
    opacity: 0,
    ease: Expo.easeOut
}, "0.1", "-=0.4");

tl.staggerFrom(".mail > div, .socials > div", 0.5, {
    y: 100,
    opacity: 0,
    ease: Expo.easeOut
}, "0.1", "-=1");

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("menu-open")) {
        tl.play();
    }

    if (event.target.classList.contains("menu-close")) {
        tl.reverse();
    }

    if (event.target.tagName === "A" && event.target.closest(".menu-link")) {
        event.preventDefault();

        const targetLink = event.target.getAttribute("href");
        const currentPage = window.location.pathname.split("/").pop();

        tl.reverse();

        if (targetLink !== currentPage) {
            barba.go(targetLink);
        }
    }
});