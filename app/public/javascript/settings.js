const uAdd = document.querySelector('#u-add');
const uEdit = document.querySelector('#u-edit');
const lAdd = document.querySelector('#l-add');

const newU = document.querySelector('#newU');
const newL = document.querySelector('#newL');

const uCards = document.querySelectorAll('.user');
const uLangs = document.querySelectorAll('.langC');

const eBtn1 = document.querySelector('.exit1');
const eBtn2 = document.querySelector('.exit2');
const eBtn3 = document.querySelector('.exit3');

const updateForm = document.querySelector('#update');
const deleteForm = document.querySelector('#delete');
const delForm = document.querySelector('#del');

const spanUser = document.querySelector('#span-nickname');

function uEditFunc(id) {
    updateForm.setAttribute('action', `/settings/users/${id}?_method=PUT`);
    deleteForm.setAttribute('action', `/settings/users/${id}?_method=DELETE`);
    uEdit.classList.add('offscreen');
    const user = users.find(e => e._id === id);
    spanUser.innerHTML = `${user.nickname}`;
}

uCards.forEach(card => card.addEventListener('click', () => uEditFunc(card.id)));
eBtn2.addEventListener('click', () => uEdit.classList.remove('offscreen'));

newU.addEventListener('click', () => uAdd.classList.add('offscreen'));
eBtn1.addEventListener('click', () => uAdd.classList.remove('offscreen'));

newL.addEventListener('click', () => lAdd.classList.add('offscreen'));
eBtn3.addEventListener('click', () => lAdd.classList.remove('offscreen'));

// function langDel(id) {
//     delForm.setAttribute('action', `/settings/languages/${id}?_method=DELETE`);
// }

// uLangs.forEach(card => card.addEventListener('click', () => langDel(card.id)));