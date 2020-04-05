// random loading time
function getRandTime() {
  return 1000 * Math.floor(4 + Math.random() * 5)
};

// proceed to next page when done loading
setTimeout(() => {
  window.location = "./chatroom.html"
}, getRandTime())
