function initTeamPage() {
    const team = [
        { name: "Aniket Das", role: "Brand Strategist" },
        { name: "Pratik Prasad", role: "Creative Director" },
        { name: "Shubham Lal", role: "Tech Lead" }
    ];

    const cursor = document.querySelector(".cursor");
    const cursorLeftIcon = document.querySelector(".cursor i.arrow-left");
    const cursorRightIcon = document.querySelector(".cursor i.arrow-right");

    const cursorWidth = cursor.offsetWidth / 2;
    const cursorHeight = cursor.offsetHeight / 2;

    let currentSlide = 1;
    const totalSlides = team.length;

    const updateCursor = (xPosition) => {
        const halfPageWidth = window.innerWidth / 2;
        if (xPosition > halfPageWidth) {
            if (currentSlide < totalSlides) {
                cursorLeftIcon.style.display = "none";
                cursorRightIcon.style.display = "block";
                cursor.style.display = "block";
            } else {
                cursor.style.display = "none";
            }
        } else {
            if (currentSlide > 1) {
                cursorLeftIcon.style.display = "block";
                cursorRightIcon.style.display = "none";
                cursor.style.display = "block";
            } else {
                cursor.style.display = "none";
            }
        }
    };

    const leftButton = document.querySelector(".switch button:first-child");
    const rightButton = document.querySelector(".switch button:last-child");

    const updateButtons = () => {
        leftButton.style.visibility = currentSlide === 1 ? "hidden" : "visible";
        rightButton.style.visibility = currentSlide === totalSlides ? "hidden" : "visible";
    };

    const updateInfo = (slideNumber) => {
        const member = team[slideNumber - 1];
        document.querySelector(".info .name").textContent = member.name;
        document.querySelector(".info .role").textContent = member.role;
        updateButtons();
    };

    const animateSlide = (slideNumber, reveal) => {
        const marquee = document.querySelector(`.t-${slideNumber}.marquee-wrapper`);
        const img = document.getElementById(`t-${slideNumber}`);
        const clipPathValue = reveal ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

        gsap.to(marquee, {
            clipPath: clipPathValue,
            duration: 1,
            ease: "power4.out"
        });

        gsap.to(img, {
            clipPath: clipPathValue,
            duration: 1,
            ease: "power4.out",
            delay: 0.3
        });
    };

    const nextSlide = () => {
        if (currentSlide < totalSlides) {
            animateSlide(currentSlide + 1, true);
            currentSlide++;
            updateInfo(currentSlide);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 1) {
            animateSlide(currentSlide, false);
            currentSlide--;
            updateInfo(currentSlide);
        }
    };

    updateInfo(currentSlide);

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX - cursorWidth,
            y: e.clientY - cursorHeight,
            duration: 1,
            ease: "power3.out"
        });

        updateCursor(e.clientX);
    });

    leftButton.addEventListener("click", prevSlide);
    rightButton.addEventListener("click", nextSlide);

    document.addEventListener("click", (e) => {
        if (e.target.closest(".logo") || e.target.closest(".menu-open") || e.target.closest(".switch button")) return;

        const halfPageWidth = window.innerWidth / 2;
        if (e.clientX > halfPageWidth) {
            nextSlide();
        } else {
            prevSlide();
        }
    });
}

initTeamPage();