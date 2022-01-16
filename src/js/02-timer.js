import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
 const refs={
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]')
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
let currentTime = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        currentTime = selectedDates[0];
        
          if(selectedDates[0] < new Date()){
          button.disabled = true
          Notiflix.Notify.failure("Please choose a date in the future");
        }
        if(selectedDates[0] >= new Date()){
            button.disabled = false 
        }
      
    },
  };

flatpickr(input, options);

function addLeadingZero(value){
    return String(value).padStart(2,'0');
}


button.addEventListener('click', onButtonClick);
function onButtonClick(e){
   const timer = setInterval(()=> {
       let dateDifference = currentTime - new Date()
       console.log(dateDifference)
       let time = convertMs(dateDifference)
       refs.days.innerHTML= addLeadingZero(time.days);
       refs.hours.innerHTML= addLeadingZero(time.hours);
       refs.minutes.innerHTML= addLeadingZero(time.minutes);
       refs.seconds.innerHTML= addLeadingZero(time.seconds);
       if(dateDifference < 900){
        clearInterval(timer)
       }
}, 1000)

}

// function stopTimer(){
//     if 
// }

