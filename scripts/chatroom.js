let oldUser;

// remember to change Tiff back to some default
const loadUserName = () => {
  oldUser = JSON.parse(localStorage.getItem("user"))
  };
}
loadUserName();

// John's first two messages
const johnMsg = ["Hello! I'm John. What are your names?", "What kind of cuisines do you guys like?"];

// for the printJ function
let johnIndex = 0;

// Mary's first message
const maryMsg = "Hi, I'm Mary. Nice to meet you all on here";

const cuisines = ['italian', 'mexican', 'japanese', 'chinese', 'indian', 'thai', 'french', 'ethiopian', 'korean', 'spanish', 'tapas', 'viet', 'hamburger', 'burger', 'fries', 'dessert', 'sandwich', 'fast',
'american', 'salad', 'any', 'every', 'depend', 'whatever'];

let isMaryPrinted = false;

let isNameAsked = false;

let isOver = false;

// printed if user doesn't answer in ___ secs
const johnAskFirst = [
  {
    person: "Mary",
    text: "I love Taiwanese food!!",
    time: 0
  },
  {
    person: "John",
    text: `What do you like, ${oldUser.name}?`,
    time: 0
  },
  {
    person: "John",
    text: "Hmmm……",
    time: 5
  },
  {
    person: "John",
    text: "So do you recommend any places?",
    time: 6
  },
  {
    person: "John",
    text: "I actually know a really good beef noodle place. Why not just go there?",
    time: 11
  },
  {
    person: "Mary",
    text: "Sounds great! Let’s just go there!",
    time: 9
  },
  {
    person: "John",
    text: "Great!!! I'll reserve a table for us!",
    time: 10
  },
  {
    person: "John",
    text: `${oldUser.name}, you're okay with Taiwanese, right?`,
    time: 10
  },
  {
    person: "Mary",
    text: "Who doesn’t love Taiwanese?",
    time: 5
  },
  {
    person: "John",
    text: "Sounds great!",
    time: 4
  },
  {
    person: "John",
    text: "Listen, I gotta run but I will reserve a table for us. Excited to see ya’ll!",
    time: 13
  }
];

// printed if user answers before John asks user's name
const userAnsFirst = [
  {
    person: "John",
    text: "That sounds great!",
    time: 4
  },
  {
    person: "Mary",
    text: "I love Taiwanese food!!!!!",
    time: 5
  },
  {
    person: "John",
    text: `${oldUser.name}, do you know any good places?`,
    time: 6
  },
  {
    person: "John",
    text: "I actually know a really good beef noodle place. Why not just go there?",
    time: 14
  },
  {
    person: "Mary",
    text: "Sounds great! Let’s just go there!",
    time: 9
  },
  {
    person: "John",
    text: "Great!!! I'll reserve a table for us!",
    time: 10
  },
  {
    person: "John",
    text: `${oldUser.name}, you're okay with Taiwanese, right?`,
    time: 10
  },
  {
    person: "Mary",
    text: "Who doesn’t love Taiwanese?",
    time: 5
  },
  {
    person: "John",
    text: "Sounds great!",
    time: 4
  },
  {
    person: "John",
    text: "Listen, I gotta run but I will reserve a table for us. Excited to see ya’ll!",
    time: 13
  }
];

const inputEl = document.querySelector("input");

const btn = document.querySelector("button");

const chatArea = document.querySelector("#chat");

// checks if enter key is pressed && if input has content
inputEl.addEventListener('keypress', e => {
  if (e.key === "Enter" && inputEl.value != "") printUser()
});

// if input has content, print it
btn.addEventListener('click', () => {
  if (inputEl.value !== "") printUser()
});

// prints user's message
const printUser = () => {
  let userInitial = oldUser.name[0].toUpperCase();
  chatArea.innerHTML +=
    `<div class="user">
      <span>${inputEl.value}</span>
      <p class="user-bubble">${userInitial}</p>
    </div>`;
  inputEl.value = "";
  updateScroll()
};

// shows latest message if scrollHeight is greater that clientHeight
const updateScroll = () => {
  let isScrolledToBottom = chatArea.scrollHeight - chatArea.clientHeight <= chatArea.scrollTop;
  if (!isScrolledToBottom) chatArea.scrollTop = chatArea.scrollHeight - chatArea.clientHeight;
};

const printJ = () => {
  // 沒有這個就會多印一個undefined?
  if (johnIndex < 2) {
    chatArea.innerHTML +=
      `<div class="system">
          <p class="system-bubble">J</p>
          <span>${johnMsg[johnIndex]}</span>
        </div>`;
    if (johnIndex == 1) {
      evaluateFirstCuisine()
    };
    johnIndex++;
    updateScroll();
    checkUserName();
    if (!isMaryPrinted) {
      setTimeout(printM, 5000);
      isMaryPrinted = true;
    }
  }
};

// John greets after entering chatroom
setTimeout(printJ, 2500);

const printM = () => {
  chatArea.innerHTML +=
    `<div class="system">
      <p class="system-bubble">M</p>
      <span>${maryMsg}</span>
    </div>`;
};

const checkUserName = () => {
  // only execute once, if john has finished his second message, don't execute
  if (johnIndex == 1) {
    let time = 0;
    let timer = setInterval(() => {
      time += 50;
      let input = inputEl.value.toLowerCase();
      if (input != "" & (input.includes(oldUser.name.toLowerCase()) || oldUser.name.toLowerCase().includes(input))) {
        clearInterval(timer);
        setTimeout(printJ, 5000)
      } else if (time === 10000 && input === "" && !isNameAsked) {
        // Mary asks user's name if still hasn't replied
        chatArea.innerHTML +=
          `<div class="system">
        <p class="system-bubble">M</p>
        <span>Hiyaaaa other friend!! What's your name?</span>
      </div>`;
        isNameAsked = true;
        checkUserName()
      }
    }, 50)
  }
};

const evaluateFirstCuisine = () => {
  let time = 0;
  let isCuisineFound = false;
  let timer = setInterval(() => {
    time += 100;
    let input = inputEl.value.toLowerCase();
    if (input) {
      for (cuisine of cuisines) {
        if (input.includes(cuisine)) {
          clearInterval(timer);
          printAll(userAnsFirst, 0)
        }
      };
    } else if (time == 7000) {
      printOneMsg(johnAskFirst, 0);
      setTimeout(() => {
        printOneMsg(johnAskFirst, 1)
      }, 1000);
      clearInterval(timer);
      evaluateSecondCuisine()
      // mary answers, 1 sec, john asks user
    }
  }, 100)
};

const evaluateSecondCuisine = () => {
  let time = 0;
  let timer = setInterval(() => {
    let input = inputEl.value.toLowerCase();
    if (input) {
      for (cuisine of cuisines) {
        if (input.includes(cuisine)) {
          clearInterval(timer);
          printAll(johnAskFirst, 2)
          // print all johnAskFirst
          break
        }
      }
    }
  }, 100)
};

const printOneMsg = (arr, index) => {
    chatArea.innerHTML +=
    `<div class="system">
      <p class="system-bubble">${arr[index].person === "John" ? "J" : "M"}</p>
      <span>${arr[index].text}</span>
    </div>`;
    updateScroll()
};

const printAll = (arr, index) => {
  window.leaveTimer = setInterval(() => {
    if (isOver) {
      clearInterval(leaveTimer);
      leaveChat()
    }
  }, 500);
  let time = 0;
  for (let i = index; i < arr.length; i++) {
    time += arr[i].time;
    setTimeout(() => {
      chatArea.innerHTML +=
      `<div class="system">
        <p class="system-bubble">${arr[i].person === "John" ? "J" : "M"}</p>
        <span>${arr[i].text}</span>
      </div>`;
      updateScroll();
      if (i == arr.length - 1) {
        isOver = true
      }
    }, time * 1000)
  }
};

const leaveChat = () => {
  setTimeout(() => {
    chatArea.innerHTML +=
    `<div class="leave">
      <span>John has left the chat.</span>
    </div>`;
    updateScroll();
  }, 1000);
  setTimeout(() => {
    chatArea.innerHTML +=
    `<div class="leave">
      <span>Mary has left the chat.</span>
    </div>`;
    updateScroll();
  }, 3000);
  setTimeout(() => {
    window.location = "./confirmation.html"
  }, 5000)
}
