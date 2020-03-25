function getRandTime() {
  return 1000 * Math.floor(4 + Math.random() * 5)
};

setTimeout(() => {
  window.location = "./chatroom.html"
}, getRandTime())
