const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const userMessageText = messageInput.value;
  if (userMessageText.trim() === '') return;

  const userMessageElement = createMessageElement('user', userMessageText);
  chatBox.appendChild(userMessageElement);

  setTimeout(() => {
    const autoReplyText = "Thank you for your message! This is an auto-reply.";
    const autoReplyElement = createMessageElement('bot', autoReplyText);
    chatBox.appendChild(autoReplyElement);
  }, 1000);

  messageInput.value = '';
}

function createMessageElement(sender, messageText) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  
  const iconClass = sender === 'user' ? 'fa-user' : 'fa-robot';
  const iconElement = document.createElement('i');
  iconElement.className = `icon fas ${iconClass}`;
  
  const textElement = document.createElement('div');
  textElement.className = 'text';
  textElement.textContent = messageText;
  
  messageElement.appendChild(iconElement);
  messageElement.appendChild(textElement);
  
  return messageElement;
}
