import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function createNotification(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else if (state === "rejected") {
        reject(delay);
      }
    }, delay);
  });
}

document.querySelector(".form").addEventListener("submit", function (event) {
  event.preventDefault();
  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const state = document.querySelector('input[name="state"]:checked').value;

  createNotification(delay, state)
    .then((delay) => {
      iziToast.success({
        title: "Notification",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "Notification",
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
    });
});
