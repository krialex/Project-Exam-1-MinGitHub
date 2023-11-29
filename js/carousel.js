const leftArrow = document.querySelector('.fa-solid.fa-arrow-left');
const rightArrow = document.querySelector('.fa-solid.fa-arrow-right');
const carusellContainer = document.querySelector('.carusell');


leftArrow.addEventListener('click', () => {
    carusellContainer.scrollLeft -= 400;
});

rightArrow.addEventListener('click', () => {
    carusellContainer.scrollLeft += 400;
});

