"use strict";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const countBtn = document.querySelector("button[data-start]");
const datePicker = document.querySelector("input#datetime-picker");

const secondsVal = document.querySelector(".value[data-seconds]");
const minutesVal = document.querySelector(".value[data-minutes]");
const hoursVal = document.querySelector(".value[data-hours]");
const daysVal = document.querySelector(".value[data-days]");

function convertMs(ms) {
    // constants
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

let userSelectedDate = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
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
                iconUrl: "./img/err-octagon.svg",
                timeout: 3000,
                theme: "dark",
            });
        }
    },
};

flatpickr(datePicker, options);

function counterLoop(e) {
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

        daysVal.innerText = time.days;
        hoursVal.innerText = time.hours;
        minutesVal.innerText = time.minutes;
        secondsVal.innerText = time.seconds;
    }, 1000);
}

countBtn.addEventListener("click", counterLoop);