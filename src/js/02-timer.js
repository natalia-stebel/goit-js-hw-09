import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseActive(selectedDates[0]);
  },
};

const refs = {
  startButton: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const isDisabled = true;
refs.startButton.disabled = isDisabled;
refs.startButton.addEventListener('click', onStartClick);

let chosenDate = Date.now();

const flatpickrOn = flatpickr(refs.inputEl, options);

function onCloseActive(date) {
  if (Date.now() > date) {
    Notify.failure('Please choose a date in the future');
  } else {
    refs.startButton.disabled = !isDisabled;
    chosenDate = date;
  }
}

function onStartClick() {
  refs.startButton.disabled = isDisabled;
  flatpickrOn.destroy(); //Removes the Element from the DOM and destroys it. A destroyed Element can not be re-activated or re-mounted to the DOM.
  refs.inputEl.disabled = isDisabled;
  startCounting();
}

function startCounting() {
  setInterval(() => {
    const restTime = convertMs(chosenDate - Date.now());
    markupChange(restTime);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function markupChange({ days, hours, minutes, seconds }) {
  refs.days.textContent = numberStartsFromZero(days);
  refs.hours.textContent = numberStartsFromZero(hours);
  refs.minutes.textContent = numberStartsFromZero(minutes);
  refs.seconds.textContent = numberStartsFromZero(seconds);
}

function numberStartsFromZero(value) {
  return String(value).padStart(2, '0');
}
