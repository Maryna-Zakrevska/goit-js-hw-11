import "./sass/main.scss";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getRefs } from "./js/refs";
import { settings } from "./js/api-service";
import getImages from "./js/api-service";

const refs = getRefs();

refs.main.style.paddingTop = `${refs.header.clientHeight + 20}px`;

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
    const perPage = 40;
    modalGallery = modalInit(".gallery a");
    if (totalHits / perPage < settings.pageNumber) {
      refs.loadMoreBtn.classList.add("is-hidden");
      return Notify.info("We're sorry, but you've reached the end of search results.");
    }

    settings.pageNumber += 1;
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
  <div class="gallery__card">
  <a class="gallery__link" href='${largeImageURL}'>
  <div class="gallery__photo-thumb">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" decoding="async"/>
  </div>
  </a>
  <ul class="gallery__info">
    <li class="gallery__info-item">
      <b>Likes</b> <span>${likes}</span>
    </li>
    <li class="gallery__info-item">
      <b>Views</b> <span>${views}</span>
    </li>
    <li class="gallery__info-item">
      <b>Comments</b> <span>${comments}</span>
    </li>
    <li class="gallery__info-item">
      <b>Downloads</b> <span>${downloads}</span>
    </li>
  </ul>
  </div>
</li>`;
}

refs.loadMoreBtn.addEventListener("click", onLoadMoreImages);

async function onLoadMoreImages(event) {
  refs.loadMoreBtn.classList.add("is-hidden");
  const { hits, totalHits } = await getImages();
  renderGallery(hits);
  modalGallery.refresh();
  smoothScroll();
  const perPage = 40;
  if (totalHits / perPage < settings.pageNumber) {
    refs.loadMoreBtn.classList.add("is-hidden");
    return Notify.info("We're sorry, but you've reached the end of search results.");
  }
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
