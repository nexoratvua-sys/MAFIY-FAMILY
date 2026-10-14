
// ==================================================
// MAFIY FAMILY — НАЛАШТУВАННЯ DISCORD
// ==================================================

// 1. Встав URL свого Discord Webhook:
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1560040387991838723/GdZP39Z8kjEgDd7-LLf42V2ZuCXtmgu6NDCv4xG11NPzTkjGIS1voC5rhh6zDZwiGYl3";

// 2. Встав Discord ID лідера:
const LEADER_ID = "1499523191947923627";

// 3. Встав Discord ID заступника:
const DEPUTY_ID = "1541456764162281625";


// ==================================================
// ЕЛЕМЕНТИ САЙТУ
// ==================================================

const modal = document.getElementById("applicationModal");
const form = document.getElementById("applicationForm");
const message = document.getElementById("formMessage");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
const submitButton = document.getElementById("submitButton");


// ==================================================
// МОДАЛЬНЕ ВІКНО
// ==================================================

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


// ==================================================
// МОБІЛЬНЕ МЕНЮ
// ==================================================

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


// ==================================================
// ВІДПРАВЛЕННЯ ЗАЯВКИ В DISCORD
// ==================================================

form.addEventListener("submit", async event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const webhook = DISCORD_WEBHOOK_URL.trim();
    const leaderId = LEADER_ID.trim();
    const deputyId = DEPUTY_ID.trim();

    // Перевірка налаштувань
    if (
        !/^https:\/\/(discord\.com|discordapp\.com)\/api\/webhooks\/\d+\/[^/\s]+$/.test(webhook)
    ) {
        message.textContent =
            "❌ Встав правильне посилання на Discord Webhook у script.js.";
        return;
    }

    if (
        !/^\d{17,20}$/.test(leaderId) ||
        !/^\d{17,20}$/.test(deputyId)
    ) {
        message.textContent =
            "❌ Перевір Discord ID лідера та заступника в script.js.";
        return;
    }

    const data = new FormData(form);

    const nickname = String(data.get("nickname") || "").trim();
    const age = Number(data.get("age"));
    const level = Number(data.get("level"));
    const discord = String(data.get("discord") || "").trim();

    if (
        !nickname ||
        nickname.length > 32 ||
        !discord ||
        discord.length > 64 ||
        !Number.isInteger(age) ||
        age < 1 ||
        age > 99 ||
        !Number.isInteger(level) ||
        level < 1 ||
        level > 999
    ) {
        message.textContent =
            "❌ Перевір правильність заповнення всіх полів.";
        return;
    }

    submitButton.disabled = true;
    message.textContent = "⏳ Надсилаємо заявку...";

    // Згадуємо тільки задані ID, а не всіх користувачів.
    const payload = {
        username: "MAFIY FAMILY | Заявки",
        allowed_mentions: {
            parse: [],
            users: [leaderId, deputyId]
        },
        content:
            `🔔 Нова заявка до MAFIY FAMILY!\n` +
            `👑 <@${leaderId}> <@${deputyId}>\n` +
            `Перевірте анкету кандидата нижче.`,
        embeds: [{
            title: "📩 Нова заявка до MAFIY FAMILY",
            description:
                "На офіційному сайті сім'ї Verba Online надіслано нову анкету.",
            color: 0xC8A96A,
            fields: [
                {
                    name: "🎮 Ігровий нік",
                    value: nickname,
                    inline: true
                },
                {
                    name: "🎂 Вік",
                    value: String(age),
                    inline: true
                },
                {
                    name: "⭐ Рівень у грі",
                    value: String(level),
                    inline: true
                },
                {
                    name: "💬 Discord кандидата",
                    value: discord,
                    inline: false
                }
            ],
            footer: {
                text: "MAFIY FAMILY • VERBA ONLINE"
            },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const response = await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Discord HTTP ${response.status}`);
        }

        message.textContent =
            "✅ Заявку надіслано! Дякуємо за інтерес до MAFIY FAMILY.";

        form.reset();

        setTimeout(() => {
            closeModal();
            message.textContent = "";
        }, 2200);

    } catch (error) {
        console.error("Помилка надсилання заявки:", error);

        message.textContent =
            "❌ Не вдалося надіслати заявку. Перевір підключення, webhook або CORS. Спробуй ще раз.";
    } finally {
        submitButton.disabled = false;
    }
});


// ==================================================
// ПЛАВНА ПРОКРУТКА
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
