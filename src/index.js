import "./css/styles.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getRefs } from "./js/refs";
import { settings } from "./js/api-service";
const refs = getRefs();

refs.searchForm.addEventListener("submit", onSubmitGetImages);

function onSubmitGetImages(event){
    event.preventDefault();
    refs.searchBtn.setAttribute('disabled', true);
    /* setTimeout(() => enable(refs.searchBtn), 1000); */
    userQuery = 
    imagesAPI.query = e.target.elements.searchQuery.value.trim();
    imagesAPI
      .getImages()
      .then(res => {
        console.log(res.hits);
        UI.renderGallery(res.hits);
      })
      .catch(console.log)
      .finally(()=>{refs.searchBtn.removeAttribute('disabled')});
    // if (imagesAPI.query.length < 1) {
    //   Notify.info('Please enter more specific search term');
    //   return;
    // }
  };




/* Шаблон разметки карточки одного изображения для галереи.

    <div class="photo-card">
      <img src="" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
        </p>
        <p class="info-item">
          <b>Views</b>
        </p>
        <p class="info-item">
          <b>Comments</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
        </p>
      </div>
    </div>  */
