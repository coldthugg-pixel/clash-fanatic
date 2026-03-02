const bases = [
    { 
        type: "farming",
        title: "Farming Base 1",
        image: "https://images.unsplash.com/photo-1508780709619-79562169bc64",
        link: "https://clashlink1"
    },
    { 
        type: "farming",
        title: "Farming Base 2",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        link: "https://clashlink2"
    },
    { 
        type: "ranked",
        title: "Ranked Push Base",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        link: "https://clashlink3"
    },
    { 
        type: "clan",
        title: "Clan War Base",
        image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546",
        link: "https://clashlink4"
    },
    { 
        type: "ranked",
        title: "Legend League Base",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        link: "https://clashlink5"
    }
];

const baseList = document.getElementById("baseList");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentType = "farming";

/* РЕНДЕР КАРТОЧЕК */

function renderBases() {
    baseList.innerHTML = "";

    const filtered = bases.filter(base => base.type === currentType);

    filtered.forEach(base => {
        const card = document.createElement("div");
        card.className = "base-card";

        card.innerHTML = `
            <img class="base-img" src="${base.image}" alt="">
            
            <div class="resource-bar">
                <div class="resource">
                    <div class="gold"></div>
                    <span>1.2M</span>
                </div>
                <div class="resource">
                    <div class="elixir"></div>
                    <span>1.1M</span>
                </div>
            </div>

            <div class="overlay">
                <div class="base-content">
                    <div class="th-icon"></div>
                    <div class="title-wrapper">
                        <div class="th-label">TOWN HALL 18</div>
                        <div class="base-title">${base.title}</div>
                    </div>
                </div>
                <button class="copy-btn">Скопировать базу</button>
            </div>
        `;

        const btn = card.querySelector(".copy-btn");

        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(base.link);
            btn.textContent = "Скопировано!";
            setTimeout(() => {
                btn.textContent = "Скопировать базу";
            }, 1500);
        });

        baseList.appendChild(card);
    });
}

/* ОБРАБОТКА КНОПОК */

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Удаляем active у всех
        filterButtons.forEach(btn => btn.classList.remove("active"));

        // Добавляем active выбранной
        button.classList.add("active");

        const text = button.textContent.toLowerCase();

        if (text.includes("фарм")) currentType = "farming";
        if (text.includes("рейт")) currentType = "ranked";
        if (text.includes("клан")) currentType = "clan";

        renderBases();
    });
});

/* ПЕРВЫЙ РЕНДЕР */

renderBases();