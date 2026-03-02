document.addEventListener("DOMContentLoaded", function(){

// ================= THEME =================

const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark");
}

if(themeToggle){
themeToggle.addEventListener("click", ()=>{
document.body.classList.toggle("dark");
localStorage.setItem("theme",
document.body.classList.contains("dark") ? "dark" : "light");
});
}


// ================= DEV MODE =================

let devMode = localStorage.getItem("devMode") === "true";

const devBtn = document.getElementById("devModeBtn");
const devModal = document.getElementById("devModal");
const confirmDev = document.getElementById("confirmDev");
const cancelDev = document.getElementById("cancelDev");
const devPassword = document.getElementById("devPassword");

if(devBtn && devModal){

if(devMode){
devBtn.innerText = "Выйти из режима разработчика";
devBtn.style.background = "#34c759";
}

devBtn.addEventListener("click", ()=>{

if(devMode){
localStorage.removeItem("devMode");
location.reload();
return;
}

devModal.style.display = "flex";

});

devBtn.addEventListener("click", ()=>{
devModal.style.display = "flex";
});

cancelDev.addEventListener("click", ()=>{
devModal.style.display = "none";
});

confirmDev.addEventListener("click", ()=>{
if(devPassword.value === "dev123"){
localStorage.setItem("devMode","true");
alert("Dev Mode активирован");
location.reload();
}else{
alert("Неверный пароль");
}
});

}


// ================= BASE FILTERS =================

let bases = JSON.parse(localStorage.getItem("bases")) || [
{type:"farming",title:"Farming Base TH18",img:"https://picsum.photos/400/250?1"},
{type:"ranked",title:"Legend Push TH18",img:"https://picsum.photos/400/250?2"},
{type:"clan",title:"Clan War Base TH18",img:"https://picsum.photos/400/250?3"}
];

const baseList = document.getElementById("baseList");
const filterBtns = document.querySelectorAll(".filter-btn");

if(baseList){

function render(type){
baseList.innerHTML = "";

bases
.filter(b => b.type === type)
.forEach((b,index)=>{

const card = document.createElement("div");
card.className = "base-card";

card.innerHTML = `
<img src="${b.img}">
<div class="base-title">${b.title}</div>
${devMode ? `<button class="delete-btn">Удалить</button>` : ""}
`;

baseList.appendChild(card);

if(devMode){
card.querySelector(".delete-btn").addEventListener("click", ()=>{
bases.splice(index,1);
localStorage.setItem("bases",JSON.stringify(bases));
render(type);
});
}

});

if(devMode){
const addBtn = document.createElement("button");
addBtn.innerText = "➕ Добавить";
addBtn.className = "copy-btn";
addBtn.style.marginTop = "10px";

addBtn.addEventListener("click", ()=>{
const title = prompt("Название:");
const img = prompt("Ссылка на картинку:");
if(title && img){
bases.push({type:type,title:title,img:img});
localStorage.setItem("bases",JSON.stringify(bases));
render(type);
}
});

baseList.appendChild(addBtn);
}

}

render("farming");

filterBtns.forEach(btn=>{
btn.addEventListener("click", ()=>{
filterBtns.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
render(btn.dataset.type);
});
});

}


// ================= PROFILE =================

const profileNameEl = document.getElementById("profileName");

if(profileNameEl){

let user = JSON.parse(localStorage.getItem("user")) || {
name:"Player X",
username:"@guest",
trophies:5800,
th:17,
favoriteArmy:"Dragon Yeti"
};

profileNameEl.innerText = user.name;
document.getElementById("profileUsername").innerText = user.username;

const trophies = document.getElementById("trophies");
const thLevel = document.getElementById("thLevel");
const favoriteArmy = document.getElementById("favoriteArmy");

if(trophies) trophies.innerText = user.trophies;
if(thLevel) thLevel.innerText = user.th;
if(favoriteArmy) favoriteArmy.innerText = user.favoriteArmy;


// ===== XP =====

let xpData = JSON.parse(localStorage.getItem("xpData")) || { xp: 0 };

function calculateLevel(xp){
return Math.floor(xp / 100) + 1;
}

function renderXP(){
const levelNumber = document.getElementById("levelNumber");
const xpText = document.getElementById("xpText");
const xpProgress = document.getElementById("xpProgress");

if(!levelNumber) return;

let level = calculateLevel(xpData.xp);
let currentXP = xpData.xp % 100;

levelNumber.innerText = "Level " + level;
xpText.innerText = currentXP + " / 100 XP";
xpProgress.style.width = currentXP + "%";
}

xpData.xp += 5;
localStorage.setItem("xpData", JSON.stringify(xpData));
renderXP();


// ===== ACTIVITY =====

const activityBlock = document.getElementById("activityBlock");
if(activityBlock){
let history = JSON.parse(localStorage.getItem("lastSeen")) || [];

if(history.length === 0){
activityBlock.innerHTML = "Нет активности";
}else{
activityBlock.innerHTML = history
.slice(-3)
.reverse()
.map(i => `<div class="stat-item">${i}</div>`)
.join("");
}
}


// ===== MODAL =====

const editBtn = document.getElementById("editNameBtn");
const modal = document.getElementById("editModal");
const saveBtn = document.getElementById("saveEdit");
const cancelBtn = document.getElementById("cancelEdit");
const input = document.getElementById("nameInput");

if(editBtn && modal){

editBtn.addEventListener("click", ()=>{
modal.style.display = "flex";
input.value = user.name;
});

cancelBtn.addEventListener("click", ()=>{
modal.style.display = "none";
});

saveBtn.addEventListener("click", ()=>{
if(input.value.trim() !== ""){
user.name = input.value.trim();
localStorage.setItem("user", JSON.stringify(user));
profileNameEl.innerText = user.name;
modal.style.display = "none";
}
});

}


// ===== TELEGRAM AUTO =====

if(window.Telegram && window.Telegram.WebApp){

const tg = window.Telegram.WebApp;
tg.ready();

const tgUser = tg.initDataUnsafe?.user;

if(tgUser){

if(tgUser.first_name){
profileNameEl.innerText = tgUser.first_name;
user.name = tgUser.first_name;
}

if(tgUser.username){
document.getElementById("profileUsername").innerText = "@" + tgUser.username;
user.username = "@" + tgUser.username;
}

if(tgUser.photo_url){
document.getElementById("avatar").src = tgUser.photo_url;
}

localStorage.setItem("user", JSON.stringify(user));

}

}

}


// ================= LANGUAGE =================

const langToggle = document.getElementById("langToggle");
let lang = localStorage.getItem("lang") || "ru";

const translations = {
ru:{ farming:"🌾 ФАРМИНГ", ranked:"🏆 РЕЙТИНГ", clan:"⚔ КЛАН" },
en:{ farming:"🌾 FARMING", ranked:"🏆 RANKED", clan:"⚔ CLAN" }
};

function applyLang(){
document.querySelectorAll(".filter-btn").forEach(btn=>{
if(translations[lang][btn.dataset.type]){
btn.innerText = translations[lang][btn.dataset.type];
}
});
}

if(langToggle){
applyLang();
langToggle.addEventListener("click", ()=>{
lang = lang === "ru" ? "en" : "ru";
localStorage.setItem("lang", lang);
applyLang();
});
}

});