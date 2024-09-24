tl = new TimelineMax({ paused: true });

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

tl.reverse();

$(document).on("click", ".menu-open", function () {
    tl.reversed(!tl.reversed());
});

$(document).on("click", ".menu-close", function () {
    tl.reversed(!tl.reversed());
});