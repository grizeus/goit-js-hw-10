"use strict";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDelay = document.querySelector("[name=delay]");
const inputState = document.querySelector("[name=state]");
const buttonSubmit = document.querySelector("button[type=submit]");

buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  const delay = parseInt(inputDelay.value, 10);
  const state = inputState.value;

    if (delay > 0) {
      console.log(state);
      if (state === "fulfilled") {
          const fulfilledToast = setTimeout(() => {
              iziToast.success({
                  title: "Notification",
                  titleColor: "#fff",
                  titleSize: "16px",
                  titleLineHeight: 1.5,
                  message: "Notification sent",
                  messageSize: "16px",
                  messageLineHeight: 1.5,
                  messageColor: "#fff",
                  backgroundColor: "#00b894",
                  position: "topRight",
                  closeOnEscape: true,
                  icon: "success",
                  timeout: 3000,
                  theme: "dark",
              });
          }, delay);
      } else if (state === "rejected") {
          const rejectedToast = setTimeout(() => {
              iziToast.error({
                  title: "Notification",
                  titleColor: "#fff",
                  titleSize: "16px",
                  titleLineHeight: 1.5,
                  message: "Notification sent",
                  messageSize: "16px",
                  messageLineHeight: 1.5,
                  messageColor: "#fff",
                  backgroundColor: "#ef4040",
                  position: "topRight",
                  closeOnEscape: true,
                  icon: "error",
                  timeout: 3000,
                  theme: "dark",
              });
          }, delay);
      }
  }
});