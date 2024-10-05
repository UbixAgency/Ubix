document.addEventListener('DOMContentLoaded', function () {
    const pages = ['/', '/about.html', '/services.html', '/team.html', '/contact.html'];
    let currentPageIndex = 0;
    let isNavigating = false;

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

            window.history.pushState({}, '', pages[index]);

            barba.go(pages[index], {
                namespace: pages[index].split('/').pop().replace('.html', ''),
                transition: ['fade', 'slide']
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

    document.addEventListener('wheel', function (event) {
        if (document.querySelector("main").contains(event.target)) {
            // event.preventDefault();
            const deltaY = event.deltaY;

            if ((currentPageIndex === 0 && deltaY < 0) ||
                (currentPageIndex === pages.length - 1 && deltaY > 0)) {
                return;
            }

            debounceNavigate(deltaY);
        }
    });

    window.addEventListener('popstate', () => {
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
                    duration: 1,
                    onComplete: () => {
                        document.querySelector("main").style.opacity = 1;
                        document.querySelector("main").style.zIndex = 0;

                        isNavigating = false;
                        currentPageIndex = pages.findIndex(url => url === window.location.pathname);
                    }
                });

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
            }
        }]
    });

    function loadScript(src, callback) {
        const script = document.createElement("script");
        script.src = src;
        script.onload = callback;
        document.body.appendChild(script);
    }
});