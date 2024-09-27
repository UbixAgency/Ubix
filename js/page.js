function pageTransition() {
    let tl = gsap.timeline();

    tl.to(".transition", {
        duration: 0.5,
        bottom: 0,
        display: "grid",
        ease: "power4.inOut"
    });

    tl.to(".transition", {
        duration: 1,
        bottom: '100%',
        display: "none",
        ease: "power4.inOut",
        delay: 1
    });
}

function delay(n) {
    n = n || 0;
    return new Promise((done) => {
        setTimeout(() => {
            done()
        }, n);
    })
}

barba.init({
    sync: true,
    transitions: [
        {
            async leave(data) {
                const done = this.async();

                pageTransition();
                await delay(1000);
                done();
            }
        }
    ]
})