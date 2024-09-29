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
                document.querySelector(".logo").style.color = '#FFF';
                document.querySelector(".menu-open").style.color = '#FFF';
                loadScript("js/home.js", function () {
                    initHomePage();
                });
            }
            else if (namespace === "team") {
                document.querySelector(".logo").style.color = '#000';
                document.querySelector(".menu-open").style.color = '#000';
                loadScript("js/team.js", function () {
                    initTeamPage();
                });
            }
            else {
                document.querySelector(".logo").style.color = '#000';
                document.querySelector(".menu-open").style.color = '#000';
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