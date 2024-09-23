document.querySelector('[chat-scroll="reset"]').addEventListener('click', function() {
    const chatContainer = document.querySelector('[chat-scroll="container"]');
    chatContainer.scrollTop = chatContainer.scrollHeight;
});
