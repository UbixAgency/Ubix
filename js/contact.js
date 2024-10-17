function initContactPage() {
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

    document.querySelector(".logo__btn").style.cursor = 'url("/assets/cursor/pointer-light.png"), default';
    document.querySelector(".menu__btn").style.cursor = 'url("/assets/cursor/pointer-light.png"), default';

    window.addEventListener("load", () => {
        sessionStorage.removeItem("contactData");

        gsap.from("#video", {
            delay: 0.2,
            duration: 0.8,
            y: 100,
            opacity: 0,
        });

        gsap.from("#content", {
            delay: 0.2,
            duration: 0.8,
            opacity: 0,
        });
    });

    let selectedServices = [];
    document.querySelectorAll(".service-btn").forEach(button => {
        button.addEventListener("click", () => {
            const service = button.value;
            if (selectedServices.includes(service)) {
                selectedServices = selectedServices.filter(s => s !== service);
                button.style.background = "transparent";
                button.style.color = "#000";
            } else {
                selectedServices.push(service);
                button.style.background = "#000";
                button.style.color = "#fff";
            }
        });
    });

    const budgetButtons = document.querySelectorAll(".budget-btn");
    const customBudgetInput = document.getElementById("custom_budget");

    budgetButtons.forEach(button => {
        button.onclick = () => {
            budgetButtons.forEach(btn => {
                btn.classList.remove("selected");
                btn.style.background = "transparent";
                btn.style.color = "#000";
            });

            button.classList.add("selected");
            button.style.background = "#000";
            button.style.color = "#fff";

            customBudgetInput.value = "";

            let contactData = JSON.parse(sessionStorage.getItem("contactData")) || {};
            contactData.budget = button.value;
            sessionStorage.setItem("contactData", JSON.stringify(contactData));
        };
    });

    customBudgetInput.oninput = () => {
        budgetButtons.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.background = "transparent";
            btn.style.color = "#000";
        });

        let contactData = JSON.parse(sessionStorage.getItem("contactData")) || {};
        if (customBudgetInput.value.trim() !== "") {
            contactData.budget = customBudgetInput.value.trim();
        } else {
            contactData.budget = null;
        }
        sessionStorage.setItem("contactData", JSON.stringify(contactData));
    };

    next0.onclick = () => {
        document.querySelector(".logo__btn").style.color = "#000";
        document.querySelector(".logo__btn").style.cursor = 'url("/assets/cursor/pointer-dark.png"), default';
        document.querySelector(".menu__btn").style.color = "#000";
        document.querySelector(".menu__btn").style.cursor = 'url("/assets/cursor/pointer-dark.png"), default';

        section1.style.top = "-100%";
        section2.style.top = "0";
        section2.style.cursor = 'url("/assets/cursor/default-dark.png"), default';
    };

    next1.onclick = () => {
        const firstNameInput = document.getElementById("firstNameInput");
        const lastNameInput = document.getElementById("lastNameInput");
        const firstNameValue = firstNameInput.value.trim();
        const lastNameValue = lastNameInput.value.trim() || "";

        if (firstNameValue === "") {
            firstNameInput.placeholder = "First name is required";
            firstNameInput.classList.add("placeholder-red-500");
            firstNameInput.classList.add("border-red-500");

            return;
        }

        let contactData = JSON.parse(sessionStorage.getItem("contactData")) || {};

        contactData.first_name = firstNameValue;
        contactData.last_name = lastNameValue;

        sessionStorage.setItem("contactData", JSON.stringify(contactData));

        firstNameInput.placeholder = "Type your first name";
        firstNameInput.classList.remove("placeholder-red-500");
        firstNameInput.classList.remove("border-red-500");

        section2.style.top = "-100%";
        section3.style.top = "0";
        section3.style.cursor = 'url("/assets/cursor/default-dark.png"), default';

        const userElement = document.getElementById("user");
        userElement.innerHTML = `Nice to meet you, ${contactData.first_name}!`;
    };

    next2.onclick = () => {
        let contactData = JSON.parse(sessionStorage.getItem("contactData")) || {};
        const customServiceInput = document.getElementById("custom_service");
        const customService = customServiceInput.value.trim();

        selectedServices = selectedServices.filter(service => service !== customServiceInput.dataset.previousCustomService);

        if (customService !== "") {
            selectedServices.push(customService);
            customServiceInput.dataset.previousCustomService = customService;
        } else {
            customServiceInput.dataset.previousCustomService = "";
        }

        if (selectedServices.length === 0) {
            customServiceInput.placeholder = "Select or enter service required";
            customServiceInput.classList.add("placeholder-red-500");
            customServiceInput.classList.add("border-red-500");
            return;
        }

        contactData.services = selectedServices;
        sessionStorage.setItem("contactData", JSON.stringify(contactData));

        customServiceInput.placeholder = "Other services in mind";
        customServiceInput.classList.remove("placeholder-red-500");
        customServiceInput.classList.remove("border-red-500");

        section3.style.top = "-100%";
        section4.style.top = "0";
        section4.style.cursor = 'url("/assets/cursor/default-dark.png"), default';
    };

    next3.onclick = () => {
        const selectedButton = document.querySelector(".budget-btn.selected");
        const customBudget = customBudgetInput.value.trim();

        if (!selectedButton && customBudget === "") {
            customBudgetInput.placeholder = "Select or enter a budget";
            customBudgetInput.classList.add("placeholder-red-500");
            customBudgetInput.classList.add("border-red-500");
            return;
        }

        let contactData = JSON.parse(sessionStorage.getItem("contactData")) || {};

        if (selectedButton) {
            contactData.budget = selectedButton.value;
        } else if (customBudget !== "") {
            contactData.budget = customBudget;
        }

        sessionStorage.setItem("contactData", JSON.stringify(contactData));

        section4.style.top = "-100%";
        section5.style.top = "0";
        section5.style.cursor = 'url("/assets/cursor/default-dark.png"), default';

        customBudgetInput.placeholder = "Other budget in mind";
        customBudgetInput.classList.remove("placeholder-red-500");
        customBudgetInput.classList.remove("border-red-500");
    };

    next4.onclick = () => {
        sessionStorage.removeItem("contactData");

        document.querySelector(".logo__btn").style.color = "#FFF";
        document.querySelector(".logo__btn").style.cursor = 'url("/assets/cursor/pointer-light.png"), default';
        document.querySelector(".menu__btn").style.color = "#FFF";
        document.querySelector(".menu__btn").style.cursor = 'url("/assets/cursor/pointer-light.png"), default';

        section5.style.top = "100%";
        section1.style.top = "0";
    };

    back1.onclick = () => {
        document.querySelector(".logo__btn").style.color = "#FFF";
        document.querySelector(".logo__btn").style.cursor = 'url("/assets/cursor/pointer-light.png"), default';
        document.querySelector(".menu__btn").style.color = "#FFF";
        document.querySelector(".menu__btn").style.cursor = 'url("/assets/cursor/pointer-light.png"), default';

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
}

initContactPage();