const popupElement = document.querySelector('.popup');

const closeButton = popupElement.querySelector('.popup__close-button');
const header = document.querySelector('header');
const navButton = document.querySelector('.header__nav-item');


function openPopup() {
    popupElement.classList.remove('hidden');
}

function closePopup() {
    popupElement.classList.add('hidden');
}
navButton.addEventListener('click', openPopup)

closeButton.addEventListener('click', closePopup)