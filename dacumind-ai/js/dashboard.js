document.addEventListener('DOMContentLoaded', () => {
  // --- Sidebar Toggle Logic ---
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebar = document.querySelector('.sidebar');

  if (sidebarToggle && sidebar && sidebarClose && sidebarOverlay) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
    });

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    };

    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // --- 1. Drag and Drop File Upload Logic ---
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const documentList = document.getElementById('document-list');

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Highlight drop zone when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove('dragover');
    }, false);
  });

  // Handle dropped files
  dropZone.addEventListener('drop', (e) => {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
  });

  // Handle clicked upload
  dropZone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', function() {
    handleFiles(this.files);
  });

  function handleFiles(files) {
    ([...files]).forEach(uploadFile);
  }

  function uploadFile(file) {
    // In a real app, this would use fetch() or XMLHttpRequest to send the file to a server.
    // Here we just simulate adding it to the list.
    const li = document.createElement('li');
    li.textContent = file.name;
    documentList.appendChild(li);
    
    // Simulate initial AI response after upload
    setTimeout(() => {
      simulateAiResponse(`I've received "${file.name}". What would you like to know about it?`);
    }, 1000);
  }


  // --- 2. Chat Interface Logic ---
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatContainer = document.getElementById('chat-container');

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessageToUI(message, 'user');
    chatInput.value = '';

    // Show typing indicator for backend handoff
    showTypingIndicator();

    // Simulate AI thinking and responding
    setTimeout(() => {
      removeTypingIndicator();
      const responses = [
        "Based on the document, that's an interesting question.",
        "I found that information on page 3. Here is a summary...",
        "I'm analyzing the text to give you the most accurate answer.",
        "Could you clarify which section you are referring to?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      simulateAiResponse(randomResponse);
    }, 1000 + Math.random() * 1000);
  });

  function addMessageToUI(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = text; // Using innerHTML for typing effect logic later if needed
    
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    // Auto-scroll
    scrollToBottom();
  }

  function simulateAiResponse(text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'ai-message');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    scrollToBottom();
    
    // Typing effect
    let i = 0;
    const speed = 30; // ms per character
    
    function typeWriter() {
      if (i < text.length) {
        contentDiv.innerHTML += text.charAt(i);
        i++;
        scrollToBottom(); // Keep scrolling as it types
        setTimeout(typeWriter, speed);
      }
    }
    
    typeWriter();
  }

  function showTypingIndicator() {
    const indicatorDiv = document.createElement('div');
    indicatorDiv.id = 'ai-typing-indicator';
    indicatorDiv.classList.add('message', 'ai-message');
    indicatorDiv.innerHTML = '<div class="message-content" style="color: var(--text-muted); font-style: italic;">AI is thinking...</div>';
    chatContainer.appendChild(indicatorDiv);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
});
