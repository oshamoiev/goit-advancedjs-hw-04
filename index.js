import{a as q,S as C,i as u}from"./assets/vendor-73qhTu8_.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const y=15,p=async(e,r)=>{const o={key:"55620787-7366754b0519359a7474d5ac8",per_page:y,page:r,image_type:"photo",orientation:"horizontal",safesearch:!0,q:e},{data:l}=await q.get("https://pixabay.com/api/",{timeout:5e3,params:o});return l},P=2,a={galleryContainer:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".js-load-more-btn"),loader:document.querySelector(".loader")},m=new C(".gallery a",{captionsData:"alt",captionDelay:250}),h=e=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.previewURL}" alt="${e.name}" />
      </a>
      <div class="gallery-stats">
        <div class="gallery-stat">
          <span class="stat-label">Likes</span>
          <span class="stat-value">${e.likes}</span>
        </div>
        <div class="gallery-stat">
          <span class="stat-label">Views</span>
          <span class="stat-value">${e.views}</span>
        </div>
        <div class="gallery-stat">
          <span class="stat-label">Comments</span>
          <span class="stat-value">${e.comments}</span>
        </div>
        <div class="gallery-stat">
          <span class="stat-label">Downloads</span>
          <span class="stat-value">${e.downloads}</span>
        </div>
      </div>
    </li>
  `,R=e=>{a.galleryContainer.innerHTML=e.map(h).join(""),m.refresh()},B=e=>{a.galleryContainer.insertAdjacentHTML("beforeend",e.map(h).join("")),m.refresh()},E=()=>{a.galleryContainer.innerHTML=""},f=()=>a.loader.classList.remove("is-hidden"),g=()=>a.loader.classList.add("is-hidden"),v=()=>a.loadMoreBtn.classList.remove("is-hidden"),L=()=>a.loadMoreBtn.classList.add("is-hidden"),O=()=>{const e=a.galleryContainer.querySelector(".gallery-item");if(!e)return;const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*P,behavior:"smooth"})},w={form:document.querySelector(".form"),loadMoreBtn:document.querySelector(".js-load-more-btn")},S="Something went wrong. Please try again later!";let i="",n=1,b=0;const c=e=>{u.show({message:e,color:"red",position:"topRight",timeout:3e3})},$=e=>{u.show({message:e,color:"orange",position:"topRight",timeout:3e3})},M=()=>n*y<b,G=()=>async e=>{try{e.preventDefault();const{target:r}=e;if(i=r.elements["search-text"].value.trim(),!i){r.elements["search-text"].value="",c("Please enter a search query");return}n=1,E(),L(),f();const o=await p(i,n);if(b=o.totalHits,o.hits.length===0){c("Sorry, there are no images matching your search query. Please try again!");return}R(o.hits),M()&&v()}catch(r){console.error(r),c(S)}finally{g()}},_=async()=>{n+=1,L(),f();try{const e=await p(i,n);B(e.hits),O(),M()?v():$("We're sorry, but you've reached the end of search results.")}catch(e){console.error(e),c(S)}finally{g()}};w.form.addEventListener("submit",G());w.loadMoreBtn.addEventListener("click",_);
//# sourceMappingURL=index.js.map
