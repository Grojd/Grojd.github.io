const filter = document.querySelector('.filtering');
const filterFixed = document.querySelector('.fixed');
const filtersContainer = document.querySelector('#filter');
const exitBtn1 = document.querySelector('.exit1');

const exitBtn2 = document.querySelector('.exit2');
const add = document.querySelector('.new');
const addContainer = document.querySelector('#add')

const cards = document.querySelectorAll('.a');
const detailsContainer = document.querySelector('#details');
const updateForm = document.querySelector('#update');
const exitBtn3 = document.querySelector('.exit3');
const deleteForm = document.querySelector('#delete');


const observer = new IntersectionObserver(entry => {
    filterFixed.classList.toggle('hidden', entry.isIntersecting)
})
observer.observe(filter);


filter.addEventListener('click', () => filtersContainer.classList.add('offscreen'));
filterFixed.addEventListener('click', () => filtersContainer.classList.add('offscreen'));


add.addEventListener('click', () => addContainer.classList.add('offscreen'));


exitBtn1.addEventListener('click', () => filtersContainer.classList.remove('offscreen'));
exitBtn2.addEventListener('click', () => addContainer.classList.remove('offscreen'));
exitBtn3.addEventListener('click', () => detailsContainer.classList.remove('offscreen'));


function details(id) {
    updateForm.setAttribute('action', `/records/${id}?_method=PUT`);
    deleteForm.setAttribute('action', `/records/${id}?_method=DELETE`);
    detailsContainer.classList.add('offscreen');
    const record = records.find(e => e._id === id);
    detailsContainer.querySelector('#user').value = record.user._id;
    detailsContainer.querySelector('#date').value = record.date.replace(/\T.*/g, "$'");
    detailsContainer.querySelector('#time').value = record.time;
    detailsContainer.querySelector('#language').value = record.language._id;
    detailsContainer.querySelector('#rating').value = record.rating;
    detailsContainer.querySelector('#description').value = record.description;
}

cards.forEach(card => card.addEventListener('click', () => details(card.id)));


function borderColor(id) {
    const rating = records.find(e => e._id === id).rating;
    const select = document.querySelector(`[id='${id}']`);
    rating === 5
        ? select.style.cssText = "border-image-source:var(--five)"
        : rating === 4
            ? select.style.cssText = "border-image-source:var(--four)"
            : rating === 3
                ? select.style.cssText = "border-image-source:var(--three)"
                : rating === 2
                    ? select.style.cssText = "border-image-source:var(--two)"
                    : select.style.cssText = "border-image-source:var(--one)"
}

cards.forEach(card => borderColor(card.id));