document.addEventListener("DOMContentLoaded", function () {
    const pages = ["/index.html", "/about.html", "/services.html", "/team.html", "/contact.html"];
    let currentPageIndex = 0;
    let isNavigating = false;
    let startTouchY = 0;

    function navigateToNextPage() {
        if (!isNavigating && currentPageIndex < pages.length - 1) {
            isNavigating = true;
            navigateToPage(currentPageIndex + 1);
        }
    }

    function navigateToPrevPage() {
        if (!isNavigating && currentPageIndex > 0) {
            isNavigating = true;
            navigateToPage(currentPageIndex - 1);
        }
    }

    function navigateToPage(index) {
        if (index >= 0 && index < pages.length) {
            currentPageIndex = index;

            window.history.pushState({}, "", pages[index]);

            barba.go(pages[index], {
                namespace: pages[index].split("/").pop().replace(".html", ""),
                transition: ["fade", "slide"]
            });
        }
    }

    const debounceNavigate = _.debounce(function (deltaY) {
        if (deltaY > 0) {
            navigateToNextPage();
        } else {
            navigateToPrevPage();
        }
    }, 200);

    function handleScroll(event) {
        if (!document.querySelector("main").contains(event.target)) return;

        let deltaY = 0;
        if (event.type === "wheel") {
            deltaY = event.deltaY;
        } else if (event.type === "touchmove") {
            const touchY = event.touches[0].clientY;
            deltaY = startTouchY - touchY;
        }

        if (deltaY !== 0) {
            if ((currentPageIndex === 0 && deltaY < 0) ||
                (currentPageIndex === pages.length - 1 && deltaY > 0)) {
                return;
            }
            debounceNavigate(deltaY);
        }
    }

    function handleTouchStart(event) {
        if (!document.querySelector("main").contains(event.target)) return;
        startTouchY = event.touches[0].clientY;
    }

    document.addEventListener("wheel", handleScroll);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleScroll);

    window.addEventListener("popstate", () => {
        const pageIndex = pages.findIndex(url => url === window.location.pathname);
        if (pageIndex !== -1) {
            currentPageIndex = pageIndex;
        }
    });

    const initialPageIndex = pages.findIndex(url => url === window.location.pathname);
    if (initialPageIndex !== -1) {
        currentPageIndex = initialPageIndex;
    }

    barba.init({
        sync: true,
        transitions: [{
            enter(data) {
                gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.25,
                    onComplete: () => {
                        document.querySelector("main").style.opacity = 1;
                        document.querySelector("main").style.zIndex = 0;

                        isNavigating = false;
                        currentPageIndex = pages.findIndex(url => url === window.location.pathname);
                    }
                });

                document.querySelector(".logo").style.cursor = 'url("/assets/cursor/pointer-dark.png"), default';
                document.querySelector(".menu-open").style.cursor = 'url("/assets/cursor/pointer-dark.png"), default';

                const namespace = data.next.namespace;
                if (namespace === "home") {
                    document.querySelector(".logo").style.color = "#000";
                    document.querySelector(".menu-open").style.color = "#000";
                    loadScript("js/home.js", function () {
                        initHomePage();
                    });
                }
                else if (namespace === "team") {
                    document.querySelector(".logo").style.color = "#000";
                    document.querySelector(".menu-open").style.color = "#000";
                    loadScript("js/team.js", function () {
                        initTeamPage();
                    });
                }
                else if (namespace === "contact") {
                    document.querySelector(".logo").style.color = "#FFF";
                    document.querySelector(".menu-open").style.color = "#FFF";
                    loadScript("js/contact.js", function () {
                        initContactPage();
                    });
                }
                else {
                    document.querySelector(".logo").style.color = "#000";
                    document.querySelector(".menu-open").style.color = "#000";
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
        ['js/home.js', 'js/team.js', 'js/contact.js'].forEach(removeScript);
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