// LOADING

function startLoader() {
    let counterElement = document.querySelector(".count p");
    let currentValue = 0;

    function updateCounter() {
        if (currentValue < 100) {
            let increment = Math.floor(Math.random() * 10) + 1;
            currentValue = Math.min(currentValue + increment, 100);
            counterElement.textContent = currentValue;

            let delay = Math.floor(Math.random() * 200) + 50;
            setTimeout(updateCounter, delay);
        }
    }

    updateCounter();
}
startLoader();

gsap.to(".count", { opacity: 0, delay: 3.5, duration: 0.5 });

let textWrapper = document.querySelector(".ml16");
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

let titles = document.querySelector(".titles");
titles.style.zIndex = '1'

TweenMax.staggerFrom(".titles > div", 0.8, {
    x: "-40",
    ease: Power3.easeInOut,
    opacity: "0"
}, 1.5);

TweenMax.staggerTo(".titles > div", 0.8, {
    x: "60",
    ease: Power3.easeInOut,
    delay: 1,
    opacity: "0"
}, 1.5);

TweenMax.staggerTo(".titles > div", 0.8, {
    display: "none",
    ease: Power3.easeInOut,
    delay: 1,
}, 1.5);

// HOME

anime.timeline({ loop: false })
    .add({
        targets: '.ml16 .letter',
        translateY: [-100, 0],
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el, i) => 30 * i
    })
    .add({
        targets: '.ml16 .letter',
        translateY: [0, 100],
        easing: "easeOutExpo",
        duration: 3000,
        delay: (el, i) => 2000 + 30 * i
    })

gsap.to(".pre-loader", {
    scale: 0.5,
    ease: "power4.inOut",
    duration: 2,
    delay: 6
})

gsap.to(".loader", {
    height: "0",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 6.75
})

gsap.to(".loader-bg", {
    height: "0",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 7
})

gsap.from(".header h1", {
    y: 200,
    ease: "power4.inOut",
    duration: 1.5,
    delay: 7,
    stagger: 0.05
})

gsap.to(".loader-bg", {
    height: "0",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 7
})

// NAVBAR

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

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("menu-open")) {
        tl.reversed(!tl.reversed());
        document.body.style.overflow = "hidden";
    }

    if (event.target.classList.contains("menu-close")) {
        tl.reversed(!tl.reversed());
        document.body.style.overflow = "auto";
    }
});