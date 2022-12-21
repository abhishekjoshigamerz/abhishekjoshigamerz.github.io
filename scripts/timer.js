// All constants which are going to be accessed
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");
const hoursElement = document.getElementById("hours");
const buttonParentDivName = document.querySelector(".button--areas");

//All variables whose value is going to be changed
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let watchTimer = null;

//using event delegation pattern here so that I don't need to use events again and again
function startTimer(event) {
  let buttonClassName = event.target.classList[0];

  if (buttonClassName == "startTimer") {
    //if null returns
    if (watchTimer) {
      return;
    }

    watchTimer = window.setInterval(() => {
      millisecondsElement.innerText = milliseconds.toString().slice(0, 2);
      milliseconds += 10;

      //Timer calculation
      // 1 hr = 60 mins
      //1 min = 60 seconds
      //1 sec = 1000 milliseconds

      //maximum time limit of the stop watch is 24 hrs. Since project does not mentions where it needs to stop so setting it up as a reset limit of time
      if (
        hours == 23 &&
        minutes == 59 &&
        seconds == 59 &&
        milliseconds === 990
      ) {
        stopInterval();
      } else if (milliseconds === 1000) {
        // increases second count since one second inclues 1000 ms
        milliseconds = 0;
        seconds++;
        secondsElement.innerText = seconds < 10 ? "0" + seconds : seconds;
      } else if (seconds === 60) {
        seconds = 0;
        minutes++;
        minutesElement.innerText = minutes < 10 ? "0" + minutes : minutes;
      } else if (minutes === 60) {
        minutes = 0;
        hours++;
        hoursElement.innerText = hours < 10 ? "0" + hours : hours;
      }
    }, 10);
  }

  if (buttonClassName == "pauseTimer") {
    //stops the clock without lose of time in clock
    pauseTimer();
  }

  if (buttonClassName == "resetTimer") {
    //resets the clock
    resetTimer();
  }
}

function resetTimer() {
  //stops recurring occurence of watchTimer function
  window.clearInterval(watchTimer);
  watchTimer = null;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  //reseting elements
  millisecondsElement.innerText = "00";
  secondsElement.innerText = seconds < 10 ? "0" + seconds : seconds;
  minutesElement.innerText = minutes < 10 ? "0" + minutes : minutes;
  hoursElement.innerText = hours < 10 ? "0" + hours : hours;
}

function pauseTimer() {
  window.clearInterval(watchTimer);
  watchTimer = null;
}

// a event delegate handles the add Event listener event
buttonParentDivName.addEventListener("click", startTimer);
