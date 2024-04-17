import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer(endDate) {
  const timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const currentTime = new Date().getTime();
    const timeDifference = endDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      document.getElementById("start-btn").disabled = false;
      iziToast.success({
        title: "Таймер",
        message: "Час вийшов!",
        position: "topRight",
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    document.getElementById("days").textContent = addLeadingZero(days);
    document.getElementById("hours").textContent = addLeadingZero(hours);
    document.getElementById("minutes").textContent = addLeadingZero(minutes);
    document.getElementById("seconds").textContent = addLeadingZero(seconds);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const datetimePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose: function (selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();

      if (selectedDate <= currentDate) {
        document.querySelector('[data-start]').disabled = true;
        iziToast.error({
          title: "Таймер",
          message: "Будь ласка, оберіть дату у майбутньому!",
          position: "topRight",
        });
      } else {
        document.getElementById("data-start").disabled = false;
      }
    },
  });

  document.querySelector('[data-start]').addEventListener("click", function () {
    const selectedDate = datetimePicker.selectedDates[0];
    startTimer(selectedDate.getTime());
    this.disabled = true;
  });
});
