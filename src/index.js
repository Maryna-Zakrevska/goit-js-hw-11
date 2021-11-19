import "./css/styles.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getRefs } from "./js/refs";
import { settings } from "./js/api-service";
import getImages from "./js/api-service";

const refs = getRefs();

refs.searchForm.addEventListener("submit", onRequestImages);

async function onRequestImages(event) {
  event.preventDefault();
  refs.searchBtn.setAttribute("disabled", true);
  try {
    settings.userQuery = refs.searchInput.value.trim();
    settings.pageNumber = 1;
    const { hits } = await getImages();
    if (hits.length === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }
    refs.gallery.innerHTML = "";
    renderGallery(hits);
    refs.loadMoreBtn.classList.remove("is-hidden");
  } catch (error) {
    console.log(error);
  } finally {
    refs.searchBtn.removeAttribute("disabled");
  }
}

function renderGallery(hits) {
  refs.gallery.insertAdjacentHTML("beforeend", galleryMarkupTamplate(hits));
}

function galleryMarkupTamplate(hits) {
  return hits.map(neededProperties).join("");
}

function neededProperties({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <div class="photo-card">
  <a class="gallery-link" href='${largeImageURL}'>
  <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b> <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b> <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b> <span>${downloads}</span>
    </p>
  </div>
</div>`;
}
