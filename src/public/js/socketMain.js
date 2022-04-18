var socket = new io();
var chatForm = document.getElementById("chatForm");
var messageBox = document.querySelector("#message-box");
var message = document.querySelector("#message");
var userList = document.querySelector("#user-list");

messageBox.scrollTop = messageBox.scrollHeight;

var { user, roomID } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("joinRoom", { user, roomID });
socket.on("roomUsers", (roomUsers) => {
  outputUsers(roomUsers);
});
socket.on("chat", function (message) {
  outputMessage(message);
  messageBox.scrollTop = messageBox.scrollHeight;
});

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var msg = message.value;
  socket.emit("sendMessage", msg);
  message.value = "";
  message.focus();
});

function outputMessage(message) {
  var div = document.createElement("div");
  div.classList.add("bg-light");
  div.classList.add("p-2");
  div.classList.add("mb-3");

  div.style = "border-radius: 1rem";
  div.innerHTML = `<p class="mb-1">
  <span class="fw-bold">${message.userName}</span> -
  <span class="message-date">${message.time}</span>
</p>
<p class="mb-1">${message.message}</p>
</div>`;
  messageBox.appendChild(div);
}

function outputUsers(users) {
  userList.innerHTML = `
  ${users.map((user) => `<li> ${user.username}</li>`).join("")}`;
}
