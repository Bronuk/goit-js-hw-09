const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', changeRondomColor)
stopBtn.addEventListener('click', stopChangeRondomColor);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

let rondomColor = null;

function changeRondomColor() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
     rondomColor = setInterval(()=>{
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
}

function stopChangeRondomColor() {
    startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(rondomColor
  )
};

// stopBtn.addEventListener('click', () => {
//   startBtn.disabled = false;
//   stopBtn.disabled = true;
//   clearInterval(rondomColor)});