barba.init({
    sync: true,
    transitions: [{
        enter(data) {
            gsap.from(data.next.container, {
                opacity: 0,
                duration: 1.7,
                onComplete: () => {
                    document.querySelector("main").style.opacity = 1;
                    document.querySelector("main").style.zIndex = 0;
                }
            });
        }
    }]
});