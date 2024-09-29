function initTeamPage() {
    const team = [
        { name: "Aniket Das", role: "Brand Strategist" },
        { name: "Shubham Lal", role: "Lead Developer" },
        { name: "Pratik Prasad", role: "Lead Designer" }
    ];

    const cursor = document.querySelector(".cursor");
    const cursorIcon = document.querySelector(".cursor i");

    const cursorWidth = cursor.offsetWidth / 2;
    const cursorHeight = cursor.offsetHeight / 2;

    let currentSlide = 1;
    const totalSlides = team.length;

    const updateCursor = (xPosition) => {
        const halfPageWidth = window.innerWidth / 2;
        if (xPosition > halfPageWidth) {
            if (currentSlide < totalSlides) {
                cursorIcon.classList.remove("ph-arrow-left");
                cursorIcon.classList.add("ph-arrow-right");
                cursor.style.display = "block";
            } else {
                cursor.style.display = "none";
            }
        } else {
            if (currentSlide > 1) {
                cursorIcon.classList.remove("ph-arrow-right");
                cursorIcon.classList.add("ph-arrow-left");
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