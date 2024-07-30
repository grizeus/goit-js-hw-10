"use strict";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

const TOAST_CONFIG = {
  titleColor: "#fff",
  titleSize: "16px",
  titleLineHeight: 1.5,
  messageSize: "16px",
  messageLineHeight: 1.5,
  messageColor: "#fff",
  position: "topRight",
  iconUrl: "./img/icons.svg#icon-error",
  iconColor: "#fff",
  closeOnEscape: true,
  timeout: 3000,
  theme: "dark",
};

const showToast = (type, backgroundColor, title, message) => {
  const toastMethod = type === 'fulfilled' ? 'success' : 'error';
  iziToast[toastMethod]({
    ...TOAST_CONFIG,
    backgroundColor,
    icon: type,
    title: title,
    message: message,
  });
};

const createNotification = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        showToast('fulfilled', "#59a10d", "OK", `Fullfilled promise in ${delay} ms`);
        resolve();
      } else {
        showToast('rejected', "#ef4040", "Error", `Rejected promise in ${delay} ms`);
        reject();
      }
    }, delay);
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const delay = parseInt(document.querySelector("[name=delay]").value, 10);
  const state = document.querySelector("[name=state]:checked")?.value;

  if (delay > 0 && state) {
    createNotification(delay, state);
  }
};

form.addEventListener("submit", handleSubmit);