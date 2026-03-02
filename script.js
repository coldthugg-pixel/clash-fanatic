// THEME
const toggle=document.getElementById("themeToggle");

if(toggle){
toggle.onclick=()=>{
document.body.classList.toggle("dark");
localStorage.setItem("theme",
document.body.classList.contains("dark")?"dark":"light");
};
}

if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
}

// BASES
const bases=[
{type:"farming",title:"Farming Base TH18",img:"https://picsum.photos/400/250?1"},
{type:"ranked",title:"Legend Push TH18",img:"https://picsum.photos/400/250?2"},
{type:"clan",title:"Clan War Base TH18",img:"https://picsum.photos/400/250?3"}
];

const baseList=document.getElementById("baseList");
const filterBtns=document.querySelectorAll(".filter-btn");

if(baseList){

function render(type){
baseList.innerHTML="";
bases.filter(b=>b.type===type).forEach(b=>{
const card=document.createElement("div");
card.className="base-card";
card.innerHTML=`
<img src="${b.img}">
<div class="base-title">${b.title}</div>
<button class="copy-btn">Copy Base</button>
`;
baseList.appendChild(card);
});
}

render("farming");

filterBtns.forEach(btn=>{
btn.onclick=()=>{
filterBtns.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
render(btn.dataset.type);
};
});
}