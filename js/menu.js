// menu.js
const tl = gsap.timeline({ paused: true });

tl.to(".menu-left", 1, {
    left: 0,
    ease: Expo.easeInOut
});

tl.to(".menu-right", 1, {
    right: 0,
    ease: Expo.easeInOut
}, "-=1");

tl.staggerFrom(".menu-links > div", 0.8, {
    y: 100,
    opacity: 0,
    ease: Expo.easeOut
}, "0.1", "-=0.4");

tl.staggerFrom(".mail > div, .socials > div", 0.8, {
    y: 100,
    opacity: 0,
    ease: Expo.easeOut
}, "0.1", "-=1");

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("menu-open")) {
        tl.play();
        document.body.style.overflow = "hidden";
    }

    if (event.target.classList.contains("menu-close")) {
        tl.reverse();
        document.body.style.overflow = "auto";
    }

    if (event.target.tagName === "A" && event.target.closest(".menu-link")) {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        tl.reverse();
        setTimeout(() => {
            window.location.href = href;
        }, 1800);
    }
});