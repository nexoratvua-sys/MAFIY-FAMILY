```javascript
const modal = document.getElementById("applicationModal");
const form = document.getElementById("applicationForm");
const message = document.getElementById("formMessage");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

function openModal() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    message.textContent = "";

    setTimeout(() => {
        document.getElementById("nickname").focus();
    }, 100);
}

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-open-modal]").forEach(button => {
    button.addEventListener("click", openModal);
});

document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const application = {
        nickname: String(data.get("nickname")).trim(),
        age: Number(data.get("age")),
        level: Number(data.get("level")),
        discord: String(data.get("discord")).trim()
    };

    if (!application.nickname || !application.discord) {
        message.textContent = "Заповни всі поля форми.";
        return;
    }

    if (
        !Number.isInteger(application.age) ||
        application.age < 1 ||
        application.age > 99 ||
        !Number.isInteger(application.level) ||
        application.level < 1 ||
        application.level > 999
    ) {
        message.textContent = "Перевір правильність віку та рівня.";
        return;
    }

    /*
      Форма наразі перевіряє дані у браузері.
      Для реального надсилання заявки в Discord потрібен
      безпечний серверний endpoint або інший бекенд.
      Не вставляй секретний Discord webhook у цей файл.
    */

    message.textContent =
        "Форма заповнена! Надсилання в Discord ще не підключено.";

    console.log("Заявка MAFIY FAMILY:", application);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
```