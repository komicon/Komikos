let data=[],idx=0,timer,editId=null;
const track=document.getElementById("track"),dotsEl=document.getElementById("dots");
async function load(){
  const r=await fetch("data/komik.json");
  const j=await r.json();
  data=j.daftar_komik||[];
  if(track) buatSlider(data.filter(k=>k.populer).slice(0,6));
  render(data);
}
function buatSlider(list){
  list.forEach(k=>{
    track.insertAdjacentHTML("beforeend",`<a class="slide" href="baca.html?id=${k.id}"><img src="${k.cover_gambar}" alt="${k.judul}"><div class="cap">${k.judul}</div></a>`);
    dotsEl.insertAdjacentHTML("beforeend",`<button class="dot"></button>`);
  });
  const dot=document.querySelectorAll(".dot");dot[0].classList.add("active");
  const go=()=>{idx=(idx+1)%list.length;show()};
  timer=setInterval(go,4200);
  const s=document.querySelector(".ios-carousel");
  if(s){s.addEventListener("touchstart",()=>clearInterval(timer));s.addEventListener("mouseenter",()=>clearInterval(timer));s.addEventListener("mouseleave",()=>timer=setInterval(go,4200))}
  document.querySelector(".next").onclick=go;
  document.querySelector(".prev").onclick=()=>{idx=(idx-1+list.length)%list.length;show()};
  function show(){track.style.transform=`translateX(-${idx*100}%)`;dot.forEach((d,i)=>d.classList.toggle("active",i===idx))}
}
function render(arr){
  const el=document.getElementById("daftar");if(!el) return;
  el.innerHTML=arr.map(k=>`<a class="card" href="baca.html?id=${k.id}"><img src="${k.cover_gambar}" alt="${k.judul}" loading="lazy"><div class="meta"><h4>${k.judul}</h4><small>${k.tipe} · ${k.status} · ${k.jumlah_chapter} ch</small></div></a>`).join("");
}
document.addEventListener("click",e=>{
  const c=e.target.closest(".chip");if(!c) return;
  document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
  c.classList.add("active");
  const t=c.dataset.tipe;
  render(t==="semua"?data:data.filter(k=>k.tipe===t));
});
const cari=document.getElementById("cari");
if(cari) cari.oninput=e=>{
  const q=e.target.value.toLowerCase();
  render(data.filter(k=>k.judul.toLowerCase().includes(q)||k.genre.join(" ").toLowerCase().includes(q)));
};
function muatAdmin(){/* CRUD admin sudah siap hubungkan */}
load();