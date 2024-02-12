document.addEventListener('DOMContentLoaded', () => {
    fetchMessages();

    setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds (for demonstration purposes)
});

function fetchMessages() {
    fetch('/messages')
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';

            data.forEach(message => {
                const p = document.createElement('p');
                p.textContent = message;
                messagesDiv.appendChild(p);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message.trim() !== '') {
        fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })
        .then(response => response.json())
        .then(data => {
            messageInput.value = '';
            fetchMessages();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
