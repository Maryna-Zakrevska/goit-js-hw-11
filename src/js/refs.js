function getRefs() {
  return {
    searchForm: document.querySelector("#search-form"),
    gallery: document.querySelector(".gallery"),
    searchBtn: document.querySelector(".search-button"),
    loadMoreBtn: document.querySelector(".load-more"),
    searchInput: document.querySelector("[type='text']"),
  };
}

export { getRefs };
