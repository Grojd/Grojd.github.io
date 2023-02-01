const uAdd = document.querySelector('#u-add');
const uEdit = document.querySelector('#u-edit');
const lAdd = document.querySelector('#l-add');

const newU = document.querySelector('#newU');
const newL = document.querySelector('#newL');

const uCards = document.querySelectorAll('.user');
const uLangs = document.querySelectorAll('.langC');

const eBtn1 = document.querySelectorAll('.exit1');
const eBtn2 = document.querySelectorAll('.exit2');
const eBtn3 = document.querySelectorAll('.exit3');

const updateForm = document.querySelector('#update');
const deleteForm = document.querySelector('#delete');
const delForm = document.querySelector('#del');

const spanUser = document.querySelector('#span-nickname');

function uEditFunc(id) {
    updateForm.setAttribute('action', `/settings/users/${id}?_method=PUT`);
    deleteForm.setAttribute('action', `/settings/users/${id}?_method=DELETE`);
    const user = users.find(e => e._id === id);
    uEdit.querySelector('#nickname').value = user.nickname;
    spanUser.innerHTML = `${user.nickname}`;
    uEdit.classList.add('offscreen');
}

uCards.forEach(card => card.addEventListener('click', () => uEditFunc(card.id)));
eBtn2.forEach(e => e.addEventListener('click', () => uEdit.classList.remove('offscreen')));

newU.addEventListener('click', () => uAdd.classList.add('offscreen'));
eBtn1.forEach(e => e.addEventListener('click', () => uAdd.classList.remove('offscreen')));

newL.addEventListener('click', () => lAdd.classList.add('offscreen'));
eBtn3.forEach(e => e.addEventListener('click', () => lAdd.classList.remove('offscreen')));

uLangs.forEach(i => {
    const j = i.querySelector('.item');
    const k = i.querySelector('.del');
    j.addEventListener('click', () => k.classList.toggle('visible'));
});