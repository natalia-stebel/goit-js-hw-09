function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

const isDisabled = true;
let timeCounter = 0;

buttonStart.addEventListener('click', onStartClick);
buttonStop.addEventListener('click', onStopClick);

function changeBodyBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

buttonStop.disabled = isDisabled;

function onStartClick() {
  buttonStart.disabled = isDisabled;
  buttonStop.disabled = !isDisabled;
  timeCounter = setInterval(changeBodyBackgroundColor, 1000);
}

function onStopClick() {
  buttonStart.disabled = !isDisabled;
  buttonStop.disabled = isDisabled;
  clearInterval(timeCounter);
}
