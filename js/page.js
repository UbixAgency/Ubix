document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".menu__itms a");
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const targetLink = event.target.getAttribute("href");
            const currentPage = window.location.pathname.split("/").pop();

            if (targetLink !== currentPage) {
                barba.go(targetLink);
            }
        });
    });

    barba.init({
        sync: true,
        prevent: ({ el }) => (el.href === window.location.href),
        transitions: [{
            enter(data) {
                window.scrollTo(0, 0);

                gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        document.querySelector("main").style.opacity = 1;
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
                else if (namespace === "contact") {
                    loadScript("js/contact.js", function () {
                        initContactPage();
                    });
                }

                removePageSpecificScripts();
            },
            leave() {
                return new Promise(resolve => {
                    removePageSpecificScripts();
                    resolve();
                });
            }
        }]
    });

    function removePageSpecificScripts() {
        ["js/home.js", "js/team.js", "js/contact.js"].forEach(removeScript);
    }

    function removeScript(src) {
        const scriptElement = document.querySelector(`script[src="${src}"]`);
        if (scriptElement) {
            document.body.removeChild(scriptElement);
        }
    }

    function loadScript(src, callback) {
        const script = document.createElement("script");
        script.src = src;
        script.onload = callback;
        document.body.appendChild(script);
    }
});