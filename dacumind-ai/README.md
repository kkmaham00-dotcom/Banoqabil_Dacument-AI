# AI-Powered Secure Document Search Portal - Frontend

## Project Goal
This project provides a safe internal platform where employees can upload private company documents and use AI to search or ask questions about them instantly, without risking data leaks[cite: 9]. This repository contains only the frontend user interface.

## Frontend Structure (Web Dev Team)
The user interface has been built using HTML, CSS, and vanilla JavaScript to provide a clean login screen, a document upload portal, and a chat box where users can ask questions and see answers from the AI[cite: 9].

* **Static Pages:** `index.html`, `login.html`, `signup.html`, and `pricing.html` comprise the public-facing and authentication UI.
* **Portal UI:** `dashboard.html` serves as the main application interface, containing the drag-and-drop zone and chat interface. 
* **Styles & Logic:** 
  * `css/main.css` and `css/dashboard.css` manage the design system.
  * `js/dashboard.js` contains the simulated drag-and-drop events and mock AI chat typing effects[cite: 7].

---

## How to Continue (Cross-Team Integration)

### For the Python Team (Backend)
Your responsibility is to build the backend system, write the core scripts to process uploaded files, manage the database, and connect the Web frontend with the AI models[cite: 9].
* **Authentication:** Connect the static forms in `login.html` and `signup.html` to your secure user database.
* **File Processing:** In `js/dashboard.js`, replace the mock `uploadFile(file)` logic with API calls (e.g., `fetch()` or `axios`) to route the uploaded documents securely to your backend scripts[cite: 7].
* **Chat Endpoints:** Replace the simulated `setTimeout` AI responses in `dashboard.js` with calls to your backend routing[cite: 7].

### For the AI Team (Intelligent Search Engine)
Your objective is to build the intelligent search engine using a technique called RAG (Retrieval-Augmented Generation)[cite: 9]. 
* **Model Grounding:** Ensure your pipeline is configured so the AI reads the uploaded documents and gives exact, factual answers based only on those files[cite: 9].
* **Frontend Delivery:** Work with the Python team to format your model's text output so it can be passed cleanly into the frontend's `addMessageToUI` function for display[cite: 7].

### For the Cyber Security Team (Data Protection)
Your task is to protect the data, ensuring that hackers cannot steal them by encrypting the documents[cite: 9].
* **Access Control:** Build role-based permissions so normal users cannot see secret files (like salaries or admin data)[cite: 9]. 
* **UI Updates:** If role-based permissions require new frontend elements (e.g., restricted "Admin Only" tabs or document visibility toggles), please request these specific UI additions from the Web Dev team.
