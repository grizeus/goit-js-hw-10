"use strict";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../css/custom-flatpickr.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const countBtn = document.querySelector("button[data-start]");
const datePicker = document.querySelector("input#datetime-picker");

const secondsVal = document.querySelector(".value[data-seconds]");
const minutesVal = document.querySelector(".value[data-minutes]");
const hoursVal = document.querySelector(".value[data-hours]");
const daysVal = document.querySelector(".value[data-days]");


function convertMs(ms) {
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  const seconds = Math.floor((((ms % DAY) % HOUR) % MINUTE) / SECOND);
  const minutes = Math.floor(((ms % DAY) % HOUR) / MINUTE);
  const hours = Math.floor((ms % DAY) / HOUR);
  const days = Math.floor(ms / DAY);

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

const addLeadingZero = num => {
  return num.toString().padStart(2, "0");
};

function countingloop(e) {
  e.target.disabled = true;
  datePicker.disabled = true;

  const interval = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      clearInterval(interval);
      datePicker.disabled = false;

      return;
    }

    const time = convertMs(diff);

    daysVal.innerText = addLeadingZero(time.days);
    hoursVal.innerText = addLeadingZero(time.hours);
    minutesVal.innerText = addLeadingZero(time.minutes);
    secondsVal.innerText = addLeadingZero(time.seconds);
  }, 1000);
}

let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1,
  },
  onClose(selectedDates) {
    const diff = selectedDates[0] - Date.now();

    if (diff > 0) {
      countBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      countBtn.disabled = true;
      iziToast.error({
        title: "Error",
        titleColor: "#fff",
        titleSize: "16px",
        titleLineHeight: 1.5,
        message: "Please choose a date in the future",
        messageSize: "16px",
        messageLineHeight: 1.5,
        messageColor: "#fff",
        backgroundColor: "#ef4040",
        position: "topRight",
        closeOnEscape: true,
        icon: "error",
        iconUrl: "./img/error.svg",
        timeout: 3000,
        theme: "dark",
      });
    }
  },
};

flatpickr(datePicker, options);

countBtn.addEventListener("click", countingloop);