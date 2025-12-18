const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];
const year = qs("#year");
if(year) year.textContent = new Date().getFullYear();

// drawer
const drawer = qs("#drawer");
const menuBtn = qs("#menuBtn");
const closeDrawer = qs("#closeDrawer");

function openDrawer(){
  if(!drawer) return;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden","false");
  menuBtn?.setAttribute("aria-expanded","true");
}
function hideDrawer(){
  if(!drawer) return;
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden","true");
  menuBtn?.setAttribute("aria-expanded","false");
}
menuBtn?.addEventListener("click", openDrawer);
closeDrawer?.addEventListener("click", hideDrawer);
drawer?.addEventListener("click", (e)=>{ if(e.target === drawer) hideDrawer(); });
qsa(".drawer__link").forEach(a => a.addEventListener("click", hideDrawer));

// active nav
const path = location.pathname.split("/").pop() || "index.html";
qsa(".nav a, .drawer a").forEach(a=>{
  const href = a.getAttribute("href");
  if(href && href.endsWith(path)) a.classList.add("active");
});

// lightbox
const lightbox = qs("#lightbox");
const lbImg = qs("#lbImg");
const lbCap = qs("#lbCap");
const lbClose = qs("#lbClose");

function openLightbox(src, cap){
  if(!lightbox) return;
  lbImg.src = src;
  lbCap.textContent = cap || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
}
function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  lbImg.src = "";
  lbCap.textContent = "";
}
lbClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e)=>{ if(e.target === lightbox) closeLightbox(); });

qsa("[data-gallery]").forEach(item=>{
  item.addEventListener("click", ()=> openLightbox(item.dataset.src, item.dataset.caption));
});

// contact message
const contactForm = qs("#contactForm");
const formMsg = qs("#formMsg");
if(contactForm){
  contactForm.addEventListener("submit", ()=> {
    if(formMsg) formMsg.textContent = "Sending… (Formspree will confirm after submission)";
  });
}
