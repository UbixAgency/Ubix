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

            loadPageScript(data.next.namespace);
        }
    }]
});

function loadPageScript(namespace) {
    const scripts = {
        home: "js/home.js",
        team: "js/team.js"
    };

    const scriptSrc = scripts[namespace];
    if (scriptSrc) {
        loadScript(scriptSrc, () => {
            const initFunction = window[`init${namespace.charAt(0).toUpperCase() + namespace.slice(1)}Page`];
            if (typeof initFunction === "function") {
                initFunction();
            }
        });
    }
}

function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}