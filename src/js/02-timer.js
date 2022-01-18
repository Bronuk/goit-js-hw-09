import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

/* flatpickr(selector, options) */
const refs = {
  startButton: document.querySelector('button[data-start]'),
  inputDateTimePicker: document.querySelector('#datetime-picker'),
  daysValue: document.querySelector('span.value[data-days]'),
  hoursValue: document.querySelector('span.value[data-hours]'),
  minutesValue: document.querySelector('span.value[data-minutes]'),
  secondsValue: document.querySelector('span.value[data-seconds]'),
};
let selectDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0].getTime();
    const now = new Date();

    if (selectDate <= now.getTime()) {
      refs.startButton.setAttribute('disabled', '');

      Notiflix.Notify.failure('Please choose a future date.');
    } else {
      if (refs.startButton.hasAttribute('disabled')) {
        refs.startButton.removeAttribute('disabled');
      }
    }
  },
};

flatpickr(refs.inputDateTimePicker, options);

refs.startButton.addEventListener('click', () => {
  timer.start();
});

function startingRate(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = startingRate(Math.floor(ms / day));
  // Remaining hours
  const hours = startingRate(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = startingRate(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = startingRate(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const timer = {
  intervalId: null,
  isStarted: false,
  start() {
    if (this.isStarted) {
      return;
    }
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      this.isStarted = true;

      const deltaTime = selectDate - currentTime;

      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      refs.daysValue.textContent = days;
      refs.hoursValue.textContent = hours;
      refs.minutesValue.textContent = minutes;
      refs.secondsValue.textContent = seconds;

      if (deltaTime < 1000) {
        this.stopTimer();
      }
    }, 1000);
  },

  stopTimer() {
    clearInterval(this.intervalId);
    this.isStarted = false;
    resetTimer();
  },
};

function resetTimer() {
  refs.daysValue.textContent = '00';
  refs.hoursValue.textContent = '00';
  refs.minutesValue.textContent = '00';
  refs.secondsValue.textContent = '00';
}