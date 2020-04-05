let oldUser;
const dateEl = document.querySelector("#date");
const timeEl = document.querySelector("#time");
const btns = document.querySelectorAll("button");

// no matter which one user clicks, it brings user to rationale page
btns.forEach(item => {
  item.addEventListener('click', () => {
    window.location = "rationale.html"
  })
});


function loadData() {
  oldUser = JSON.parse(localStorage.getItem("user"));
};
loadData();

function updateInfo() {
  dateEl.textContent = oldUser.date;
  timeEl.textContent = oldUser.time;
};
updateInfo();
