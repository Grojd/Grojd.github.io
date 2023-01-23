const filter = document.querySelector('.filtering');
const filterFixed = document.querySelector('.fixed');
const filtersContainer = document.querySelector('.filters-container');
const exitBtn = document.querySelector('.exit');

const observer = new IntersectionObserver(entry => {
    filterFixed.classList.toggle('hidden', entry.isIntersecting)
})

observer.observe(filter);

filter.addEventListener('click', () => filtersContainer.classList.add('offscreen'));
filterFixed.addEventListener('click', () => filtersContainer.classList.add('offscreen'));
exitBtn.addEventListener('click', () => filtersContainer.classList.remove('offscreen'));

