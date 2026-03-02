// ================= PROFILE SAFE INIT =================

document.addEventListener("DOMContentLoaded", function(){

const profileNameEl = document.getElementById("profileName");
if(!profileNameEl) return;

// ===== USER DATA =====
let user = JSON.parse(localStorage.getItem("user")) || {
name:"Player X",
username:"@guest",
trophies:5800,
th:17,
favoriteArmy:"Dragon Yeti"
};

profileNameEl.innerText = user.name;
document.getElementById("profileUsername").innerText = user.username;
document.getElementById("trophies").innerText = user.trophies;
document.getElementById("thLevel").innerText = user.th;
document.getElementById("favoriteArmy").innerText = user.favoriteArmy;

// ===== TELEGRAM AUTO PROFILE =====

if(window.Telegram && window.Telegram.WebApp){

const tg = window.Telegram.WebApp;
tg.ready();

const tgUser = tg.initDataUnsafe?.user;

if(tgUser){

// Имя
if(tgUser.first_name){
profileNameEl.innerText = tgUser.first_name;
user.name = tgUser.first_name;
}

// Username
if(tgUser.username){
document.getElementById("profileUsername").innerText = "@" + tgUser.username;
user.username = "@" + tgUser.username;
}

// Фото
if(tgUser.photo_url){
document.getElementById("avatar").src = tgUser.photo_url;
}

// Сохраняем
localStorage.setItem("user", JSON.stringify(user));

}

}
// ===== XP SYSTEM =====
let xpData = JSON.parse(localStorage.getItem("xpData")) || { xp: 0 };

function calculateLevel(xp){
return Math.floor(xp / 100) + 1;
}

function renderXP(){
let level = calculateLevel(xpData.xp);
let currentXP = xpData.xp % 100;

document.getElementById("levelNumber").innerText = "Level " + level;
document.getElementById("xpText").innerText = currentXP + " / 100 XP";
document.getElementById("xpProgress").style.width = currentXP + "%";
}

xpData.xp += 5;
localStorage.setItem("xpData", JSON.stringify(xpData));
renderXP();

// ===== ACTIVITY =====
const activityBlock = document.getElementById("activityBlock");
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

// ===== MODAL =====
const editBtn = document.getElementById("editNameBtn");
const modal = document.getElementById("editModal");
const saveBtn = document.getElementById("saveEdit");
const cancelBtn = document.getElementById("cancelEdit");
const input = document.getElementById("nameInput");

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

});