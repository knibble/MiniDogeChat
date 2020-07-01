const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("messageContainer");
const messageForm = document.getElementById("sendContainer");
const messageInput = document.getElementById("inputMessage");

const appendMessage = (message) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
};

const name = prompt("¿Cuál es tu nombre?");
appendMessage(`Bienvenid@ ${name}!`);
socket.emit("new-user", name);

socket.on("user-connected", (name) => {
  appendMessage(`${name} se ha conectado`);
});

socket.on("chat-message", ({ name, message }) => {
  appendMessage(`${name}: ${message}`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} se ha ido, 🇫 en el chat`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`Tú: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});
