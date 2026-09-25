const data = window.ISMUN_DATA;

document.getElementById("register-btn").href = data.conference.registrationUrl;
document.getElementById("email-link").textContent = data.conference.contactEmail;
document.getElementById("email-link").href = "mailto:" + data.conference.contactEmail;
document.getElementById("wa-link").href = data.conference.whatsappUrl;

const committeeGrid = document.getElementById("committee-grid");
committeeGrid.innerHTML = data.committees.map(c => `
  <article class="committee-card reveal">
    <small>${c.type}</small><h3>${c.name}</h3>
    <p><strong>Agenda:</strong> ${c.agenda}</p>
    <a href="${c.guide}" target="_blank">BACKGROUND GUIDE →</a>
  </article>`).join("");

const secretariatGrid = document.getElementById("secretariat-grid");
secretariatGrid.innerHTML = data.secretariat.map((p,i) => `
  <article class="person reveal">
    <div class="person-photo">${p.photo ? `<img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">` : "PHOTO"}</div>
    <div><small>${p.role}</small><h3>${p.name}</h3></div>
  </article>`).join("");

function renderSchedule(day){
  document.getElementById("schedule-list").innerHTML = data.schedule.filter(x=>x[2]===day).map(x=>`
    <div class="schedule-row"><time>${x[0]}</time><strong>${x[1]}</strong><span>${x[2]}</span></div>`).join("");
}
renderSchedule("Day 1");
document.querySelectorAll(".schedule-tabs button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".schedule-tabs button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active"); renderSchedule(btn.dataset.day);
  });
});

document.getElementById("archive-grid").innerHTML = data.archives.map(a=>`
  <article class="archive-card reveal"><strong>${a.year}</strong><h3>${a.title}</h3><p>${a.description}</p></article>`).join("");

const target = new Date("2026-10-24T08:00:00+05:30").getTime();
function tick(){
  const d = Math.max(0, target-Date.now());
  const days=Math.floor(d/86400000), hours=Math.floor(d/3600000)%24, mins=Math.floor(d/60000)%60, secs=Math.floor(d/1000)%60;
  document.getElementById("days").textContent=String(days).padStart(2,"0");
  document.getElementById("hours").textContent=String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent=String(mins).padStart(2,"0");
  document.getElementById("seconds").textContent=String(secs).padStart(2,"0");
}
tick(); setInterval(tick,1000);

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const menu = document.querySelector(".menu-toggle"), nav = document.querySelector("nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const sections=[...document.querySelectorAll("main section[id]")];
window.addEventListener("scroll",()=>{
  let current="home";
  sections.forEach(s=>{if(window.scrollY >= s.offsetTop-160) current=s.id});
  nav.querySelectorAll("a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});
