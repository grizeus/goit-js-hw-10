"use strict";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const inputDelay = document.querySelector("[name=delay]");
  const inputState = document.querySelector("[name=state]:checked");
  const delay = parseInt(inputDelay.value, 10);

    if (delay > 0) {
    if (inputState.value === "fulfilled") {
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
    } else if (inputState.value === "rejected") {
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
  } else {
    console.log("Delay must be greater than 0");
  }
});
