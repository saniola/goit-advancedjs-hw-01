import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

const saveFormData = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

const loadFormData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    emailInput.value = email || '';
    messageTextarea.value = message || '';
  }
};

const clearFormData = () => {
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageTextarea.value = '';
};

const handleSubmit = (event) => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log('Form Submitted:', formData);
  clearFormData();
};

form.addEventListener('input', saveFormData);
form.addEventListener('submit', handleSubmit);

document.addEventListener('DOMContentLoaded', loadFormData);
