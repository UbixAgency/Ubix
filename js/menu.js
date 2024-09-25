gsap.registerPlugin(ScrollTrigger);

// MENU

tl = gsap.timeline()

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

let mm = gsap.matchMedia();

mm.add("(min-width: 901px)", () => {
    ScrollTrigger.create({
        animation: gsap.fromTo(".logo h1", {
            y: "40svh",
            scale: 6,
            left: "50%",
            xPercent: -50
        }, {
            y: 0,
            scale: 1,
            left: "2rem",
            xPercent: 0
        }),
        scrub: true,
        trigger: ".content",
        start: "top bottom",
        endTrigger: ".content",
        end: "top center"
    });

    ScrollTrigger.create({
        animation: gsap.fromTo(".logo p", {
            y: "50svh",
            scale: 2,
            left: "50%",
            xPercent: -50
        }, {
            y: 0,
            scale: 1,
            left: "2rem",
            xPercent: 0
        }),
        scrub: true,
        trigger: ".content",
        start: "top bottom",
        endTrigger: ".content",
        end: "top center"
    });
});

mm.add("(max-width: 900px)", () => {
    ScrollTrigger.create({
        animation: gsap.fromTo(".logo h1", {
            y: "40svh",
            scale: 6,
            left: "50%",
            xPercent: -50
        }, {
            y: 0,
            scale: 1,
            left: "1rem",
            xPercent: 0
        }),
        scrub: true,
        trigger: ".content",
        start: "top bottom",
        endTrigger: ".content",
        end: "top center"
    });

    ScrollTrigger.create({
        animation: gsap.fromTo(".logo p", {
            y: "50svh",
            scale: 2,
            left: "50%",
            xPercent: -50
        }, {
            y: 0,
            scale: 1,
            left: "1rem",
            xPercent: 0
        }),
        scrub: true,
        trigger: ".content",
        start: "top bottom",
        endTrigger: ".content",
        end: "top center"
    });
});

ScrollTrigger.create({
    animation: gsap.to(".logo p", {
        opacity: 0,
        duration: 0.4
    }),
    trigger: ".logo h1",
    start: "top 20%",
    end: "top 80%",
    scrub: true,
    markers: false
});