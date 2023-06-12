export default function getRefs() {
    return {
    searchForm: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
    page: 1,
    prePage: 40,
    currentSearchQuery : '',
}
}