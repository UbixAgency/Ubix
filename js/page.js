barba.init({
    sync: true,
    transitions: [{
        enter(data) {
            gsap.from(data.next.container, {
                opacity: 0,
                duration: 1.5,
                onComplete: () => {
                    document.querySelector("main").style.opacity = 1;
                    document.querySelector("main").style.zIndex = 0;
                }
            });

            const namespace = data.next.namespace;
            if (namespace === "home") {
                loadScript("js/home.js", function () {
                    initHomePage();
                });
            }
            else if (namespace === "team") {
                loadScript("js/team.js", function () {
                    initTeamPage();
                });
            }
        }
    }]
});

function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}