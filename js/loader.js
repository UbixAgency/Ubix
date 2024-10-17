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

if (sessionStorage.getItem("loaderPlayed")) {
    document.querySelector("#loader-container").style.display = "none";
    document.querySelector("main").style.opacity = 1;
    document.querySelector(".navbar").style.zIndex = 2;
    document.querySelector(".navbar").style.opacity = 1;
}
else {
    document.querySelector("#loader-container").style.display = "block";

    startLoader();

    sessionStorage.setItem("loaderPlayed", "true");

    gsap.to(".count", { opacity: 0, delay: 3.5, duration: 0.5 });

    let textWrapper = document.querySelector(".ml16");
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    let titles = document.querySelector(".titles");
    titles.style.zIndex = "3";

    TweenMax.staggerFrom(".titles > div", 0.8, {
        x: "-40",
        ease: Power3.easeInOut,
        opacity: 0
    }, 1.5);

    let timeline = new TimelineMax({
        onComplete: () => {
            titles.style.zIndex = "-1";
        }
    });

    timeline.staggerTo(".titles > div", 0.8, {
        x: "60",
        ease: Power3.easeInOut,
        delay: 1,
        opacity: 0
    }, 1.5);

    anime.timeline({ loop: false })
        .add({
            targets: ".ml16 .letter",
            translateY: [-300, 0],
            easing: "easeOutExpo",
            duration: 1000,
            delay: (el, i) => 30 * i
        })
        .add({
            targets: ".ml16 .letter",
            translateY: [0, 100],
            easing: "easeOutExpo",
            duration: 3000,
            delay: (el, i) => 2000 + 30 * i
        });

    gsap.to(".pre-loader", {
        scale: 0.5,
        ease: "power4.inOut",
        duration: 2,
        delay: 6,
        onComplete: () => {
            document.querySelector(".pre-loader").style.zIndex = "-1";
            document.querySelector(".loader-content").style.zIndex = "-1";
        }
    });

    gsap.to(".loader", {
        height: "0",
        ease: "power4.inOut",
        duration: 1.5,
        delay: 6.75
    });

    gsap.to(".loader-bg", {
        height: "0",
        ease: "power4.inOut",
        duration: 1,
        delay: 7
    });

    gsap.from(".header span", {
        y: 200,
        ease: "power4.inOut",
        duration: 1,
        delay: 7,
        stagger: 0.05
    });

    gsap.to(".header span", {
        y: -150,
        ease: "power4.inOut",
        opacity: 0,
        duration: 1.5,
        delay: 8.5,
        stagger: 0.05,
        onComplete: () => {
            document.querySelector(".brand").style.zIndex = "-1";
            document.querySelector("#loader-container").style.display = "none";
            document.querySelector("main").style.opacity = 1;
            document.querySelector(".navbar").style.zIndex = 2;
            document.querySelector(".navbar").style.opacity = 1;
        }
    });
}