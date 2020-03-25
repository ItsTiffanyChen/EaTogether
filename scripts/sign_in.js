const monthEl = document.querySelector('select[name="month"]');
const dayEl = document.querySelector('select[name="day"]');
const nameEl = document.querySelector('input[name="name"]');
const timeEl = document.querySelector('select[name="time"]');
const btn = document.querySelector("button");
const nameP = document.querySelector("p.name");
const dateP = document.querySelector("p.date");
const timeP = document.querySelector("p.time");

let oldUser;

let user = {
  name:"",
  date:"",
  time:""
}

// stores user's info to localStorage
function store() {
  if (nameEl.value && dayEl.value !== "default" && monthEl.value !== "default" && timeEl.value !== "default") {
    localStorage.setItem("user", JSON.stringify(user));
    window.location = "./landing.html"
  }
};

btn.addEventListener('click', updateUserDate);

function updateUserDate() {
  if (monthEl.value == "default" || dayEl.value == "default") {
    dateP.classList = 'alert date'
  } else {
    dateP.classList = 'alert date hide'
  }
  user.date = monthEl.value + "/" + dayEl.value;
  updateUserTime();
  updateUserName();
  store();
}

function updateUserTime() {
  if (timeEl.value == "default") {
    timeP.classList = 'alert time'
  } else {
    timeP.classList = 'alert time hide'
  }
  user.time = timeEl.value
}

function updateUserName() {
  if (!nameEl.value) {
    nameP.classList = 'alert name'
  } else {
    nameP.classList = 'alert name hide'
  }
  user.name = nameEl.value
}

function printMonthOption() {
  let HTML = "";
  for (let i = 1; i < 13; i++) {
    HTML = `<option value="${i}">${i}</option>`;
    monthEl.innerHTML += HTML;
  }
  printDayOption();
}

 function printDayOption() {
   let HTML = "";
    for (let i = 1; i < 32; i++) {
      HTML = `<option value="${i}">${i}</option>`;
      dayEl.innerHTML += HTML;
    }
  }

printMonthOption();

function reset() {
  localStorage.clear("oldUser");
};

reset()
