import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from './UserInfo.js';
import { PopupWithForm } from './PopupWithForm.js';
import { initialCards } from "../constant/array.js";
import { configSelectors } from "../constant/config.js";
import { buttonEdit,
  buttonNewCard,
  buttonNewCardCreate,
  inputProfile,
} from "../constant/constat.js";


const formProfile = new FormValidator(configSelectors, inputProfile);
const formCardAdd = new FormValidator(configSelectors, buttonNewCardCreate);
const userInfo = new UserInfo(configSelectors);
const PopupWithFormProfile = new PopupWithForm(".popup_type_edit-profile", formEditProfileSubmitHandler);
const PopupWithFormNewCard = new PopupWithForm(".popup_type_add-place", submitAddCardForm);
const popupBigImage = new PopupWithImage(".popup_type_big-img");
const addSection = new Section({
  items: initialCards,
  renderer: (elem) => {
    addSection.addItem(renderCard(elem));
  }
}, configSelectors.elements);

function formEditProfileSubmitHandler(evt, objectUser) {
  evt.preventDefault();
  userInfo.setUserInfo(objectUser);
  PopupWithFormProfile.close();
};

function submitAddCardForm(evt, initialCards) {
  evt.preventDefault();
  addSection.addItem(renderCard(initialCards));
  PopupWithFormNewCard.close();
}

function handleCardClick(name, link) {
  popupBigImage.open(name, link);
}

function renderCard(initialCards) {
  const card = new Card(initialCards, '#user', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

buttonEdit.addEventListener('click', function() {
  const data = userInfo.getUserInfo();
  const nameInput = document.querySelector('.form__style_type_name');
  const jobInput = document.querySelector('.form__style_type_profession');
  nameInput.value = data.name;
  jobInput.value = data.profession;
  PopupWithFormProfile.open();
});

buttonNewCard.addEventListener("click" , function (evt) {
  evt.preventDefault();
  PopupWithFormNewCard.open();
});

addSection.renderCards();

formProfile.enableValidation();
formCardAdd.enableValidation();

popupBigImage.setEventListeners();
PopupWithFormProfile.setEventListeners();
PopupWithFormNewCard.setEventListeners();
