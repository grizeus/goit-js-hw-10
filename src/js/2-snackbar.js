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
  closeOnEscape: true,
  timeout: 3000,
  theme: "dark",
};

const showToast = (type, backgroundColor, title, message, iconUrl) => {
  const toastMethod = type === "fulfilled" ? "success" : "error";
  iziToast[toastMethod]({
    ...TOAST_CONFIG,
    backgroundColor,
    icon: type,
    title: title,
    message: message,
    iconUrl: iconUrl,
  });
};

const createNotification = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });
};

const handleSubmit = e => {
  e.preventDefault();
  const delay = parseInt(document.querySelector("[name=delay]").value, 10);
  const state = document.querySelector("[name=state]:checked")?.value;

  if (delay > 0 && state) {
    createNotification(delay, state)
      .then(() => {
        showToast(
          "fulfilled",
          "#59a10d",
          "OK",
          `Fullfilled promise in ${delay} ms`,
          "./img/ok.svg"
        );
      })
      .catch(() => {
        showToast(
          "rejected",
          "#ef4040",
          "Error",
          `Rejected promise in ${delay} ms`,
          "./img/error.svg"
        );
      });
  }
};

form.addEventListener("submit", handleSubmit);