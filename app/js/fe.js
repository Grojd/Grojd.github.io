const filter = document.querySelector('.filtering');
const filterFixed = document.querySelector('.fixed');

const observer = new IntersectionObserver(entry => {
    filterFixed.classList.toggle('hidden', entry.isIntersecting)
})

observer.observe(filter);