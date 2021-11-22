function getRefs() {
  return {
    searchForm: document.querySelector("#search-form"),
    gallery: document.querySelector(".gallery"),
    searchBtn: document.querySelector(".search__button"),
    loadMoreBtn: document.querySelector(".load-button"),
    searchInput: document.querySelector("[type='text']"),
    header: document.querySelector(".header"),
    main: document.querySelector(".main"),
  };
}

export { getRefs };
