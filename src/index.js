import "./sass/styles.scss";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getRefs } from "./js/refs";
import { settings } from "./js/api-service";
import getImages from "./js/api-service";

const refs = getRefs();
let modalGallery = null;

refs.searchForm.addEventListener("submit", onRequestImages);

async function onRequestImages(event) {
  event.preventDefault();
  refs.searchBtn.setAttribute("disabled", true);
  try {
    settings.userQuery = refs.searchInput.value.trim();
    settings.pageNumber = 1;
    const { hits, totalHits } = await getImages();
    refs.gallery.innerHTML = "";

    if (hits.length === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }

    renderGallery(hits);
    Notify.success(`Hooray! We found ${totalHits} images.`);
    refs.loadMoreBtn.classList.remove("is-hidden");
    settings.pageNumber += 1;
    const perPage = 40;
    const totalPages = totalHits / perPage;
    if (totalPages <= settings.pageNumber) {
      refs.loadMoreBtn.classList.add("is-hidden");
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
    modalGallery = modalInit(".gallery a");
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
  <li class="gallery__item">
  <div class="gallery__photo--thumb">
  <a class="gallery__link" href='${largeImageURL}'>
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" decoding="async"/>
  </a>
  <div class="gallery__info">
    <p class="gallery__info--item">
      <b>Likes</b> <span>${likes}</span>
    </p>
    <p class="gallery__info--item">
      <b>Views</b> <span>${views}</span>
    </p>
    <p class="gallery__info--item">
      <b>Comments</b> <span>${comments}</span>
    </p>
    <p class="gallery__info--item">
      <b>Downloads</b> <span>${downloads}</span>
    </p>
  </div>
</div>
</li>`;
}

refs.loadMoreBtn.addEventListener("click", onLoadMoreImages);
async function onLoadMoreImages(event) {
  refs.loadMoreBtn.classList.add("is-hidden");
  const { hits } = await getImages();
  renderGallery(hits);
  modalGallery.refresh();
  smoothScroll();
  refs.loadMoreBtn.classList.remove("is-hidden");
  settings.pageNumber += 1;
}

refs.gallery.addEventListener("click", onImageClick);
function onImageClick(event) {
  event.preventDefault();
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

function modalInit(selector) {
  const modalGallery = selector;
  const modalOptions = {
    captionsData: "alt",
    animationSpeed: 180,
    fadeSpeed: 250,
  };

  return new SimpleLightbox(modalGallery, modalOptions);
}
