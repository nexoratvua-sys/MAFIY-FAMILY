// ==================================================
// MAFIY FAMILY — ПОСИЛАННЯ НА ЗАЯВКУ
// ==================================================

// Замініть це посилання на своє (Discord, Google Forms тощо).
// Після заміни всі кнопки приєднання відкриватимуть це посилання.
const APPLICATION_URL = "https://discord.gg/6kczEnJ5s";

document.querySelectorAll(".application-link").forEach(link => {
    link.href = APPLICATION_URL;
});

// ==================================================
// МОБІЛЬНЕ МЕНЮ
// ==================================================

const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Закрити меню" : "Відкрити меню"
    );
    menuToggle.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Відкрити меню");
    });
});

// ==================================================
// ПЛАВНА ПРОКРУТКА ДЛЯ ВНУТРІШНІХ ПОСИЛАНЬ
// ==================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const selector = link.getAttribute("href");
        const target = document.querySelector(selector);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
