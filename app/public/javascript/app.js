const filter = document.querySelector('.filtering');
const filterFixed = document.querySelector('.fixed');
const filtersContainer = document.querySelector('#filter');
const exitBtn1 = document.querySelector('.exit1');

const exitBtn2 = document.querySelector('.exit2');
const add = document.querySelector('.new');
const addContainer = document.querySelector('#add')

const observer = new IntersectionObserver(entry => {
    filterFixed.classList.toggle('hidden', entry.isIntersecting)
})

observer.observe(filter);

filter.addEventListener('click', () => filtersContainer.classList.add('offscreen'));
filterFixed.addEventListener('click', () => filtersContainer.classList.add('offscreen'));

add.addEventListener('click', () => addContainer.classList.add('offscreen'));

exitBtn1.addEventListener('click', () => filtersContainer.classList.remove('offscreen'));
exitBtn2.addEventListener('click', () => addContainer.classList.remove('offscreen'));

const cards = document.querySelectorAll('.a');

cards.forEach(card => card.addEventListener('click', () => console.log(card.id)));