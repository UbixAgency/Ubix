// MENU

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
    $("body").css("overflow", "hidden");
});

$(document).on("click", ".menu-close", function () {
    tl.reversed(!tl.reversed());
    $("body").css("overflow", "auto");
});

// LOGO

ScrollTrigger.create({
    animation: gsap.from(".logo h1", {
        y: "40dvh",
        scale: 6,
        yPercent: -40,
    }),
    scrub: true,
    trigger: ".content",
    start: "top bottom",
    endTrigger: ".content",
    end: "top center"
});

ScrollTrigger.create({
    animation: gsap.from(".logo p", {
        y: "50dvh",
        scale: 2,
        yPercent: -50,
    }),
    scrub: true,
    trigger: ".content",
    start: "top bottom",
    endTrigger: ".content",
    end: "top center"
});

ScrollTrigger.create({
    animation: gsap.to(".logo p", {
        opacity: 0,
        duration: 0.4
    }),
    trigger: ".logo h1",
    start: "top 20%",
    end: "bottom 80%",
    scrub: true,
    markers: false
});