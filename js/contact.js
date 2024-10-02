function initContactPage() {
    const tl = gsap.timeline();
    
    const section1 = document.getElementById("section1");
    const section2 = document.getElementById("section2");
    const section3 = document.getElementById("section3");
    const section4 = document.getElementById("section4");
    const section5 = document.getElementById("section5");

    const next0 = document.getElementById("next0");
    const next1 = document.getElementById("next1");
    const next2 = document.getElementById("next2");
    const next3 = document.getElementById("next3");
    const next4 = document.getElementById("next4");

    const back1 = document.getElementById("back1");
    const back2 = document.getElementById("back2");
    const back3 = document.getElementById("back3");

    const headerAnimation = () => {
        tl.from("#video", {
            delay: 0.2,
            duration: 0.8,
            y: 100,
            opacity: 0,
        });

        tl.from("#content", {
            delay: 0.2,
            duration: 0.8,
            opacity: 0,
        });
    };

    window.addEventListener("load", () => {
        headerAnimation();
    });

    next0.onclick = () => {
        section1.style.top = "-100%";
        section2.style.top = "0";
    };

    next1.onclick = () => {
        const firstNameInput = document.getElementById("firstNameInput");
        const lastNameInput = document.getElementById("lastNameInput");
        const firstNameValue = firstNameInput.value.trim();
        const lastNameValue = lastNameInput.value.trim() || "";

        if (firstNameValue === "") {
            firstNameInput.placeholder = "First name is required";
            firstNameInput.classList.add("placeholder-red-500");

            gsap.to(firstNameInput, {
                duration: 0.5,
                borderColor: "red",
                ease: "power2.out",
            });
            return;
        }

        let contactData = JSON.parse(sessionStorage.getItem("contactData")) || {};

        contactData.first_name = firstNameValue;
        contactData.last_name = lastNameValue;

        sessionStorage.setItem("contactData", JSON.stringify(contactData));

        firstNameInput.placeholder = "Type your first name";
        firstNameInput.classList.remove("placeholder-red-500");

        section2.style.top = "-100%";
        section3.style.top = "0";

        const userElement = document.getElementById("user");
        userElement.innerHTML = `Nice to meet you, ${contactData.first_name}!`;
    };

    next2.onclick = () => {
        section3.style.top = "-100%";
        section4.style.top = "0";
    };

    next3.onclick = () => {
        section4.style.top = "-100%";
        section5.style.top = "0";
    };

    next4.onclick = () => {
        section5.style.top = "100%";
        section1.style.top = "0";
    };

    back1.onclick = () => {
        section2.style.top = "100%";
        section1.style.top = "0";
    };

    back2.onclick = () => {
        section2.style.top = "0";
        section3.style.top = "100%";
    };

    back3.onclick = () => {
        section3.style.top = "0";
        section4.style.top = "100%";
    };

    var values = [];

    const inputs = document.querySelectorAll("input[type='text']");
    const btn = document.getElementsByClassName("btn");

    const buttons = [...btn];

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (values.includes(button.value)) {
                values = values.filter((value) => value !== button.value);

                button.style.background = "#e5e7eb";
                button.style.color = "#000";
            } else {
                values.push(button.value);
                button.style.background = "#000";
                button.style.color = "#fff";
            }
        });
    });
}

initContactPage();