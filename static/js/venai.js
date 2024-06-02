import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const API_KEY = "AIzaSyBoUPQlzqxmPE3UrmaHePj9zVhQCpKnW50";
const MODEL_NAME = "gemini-1.5-flash";
const aiName = "VenAI";
const Maker = "Vedant Srivastava";
const MakerMin = "Vedant";
const Maker1 = "Unity Blaster";
const Maker1Min = "Unity";

function createMessageBox(message, type) {
  const messageBox = document.createElement("div");
  messageBox.classList.add("box", type);

  const messageWithoutPrefix = message.replace("output:", "");
  const formattedMessage = marked(messageWithoutPrefix);
  const sanitizedMessage = DOMPurify.sanitize(formattedMessage);
  // const postFormattedMessage = `
  //   <p><b>${messageWithoutPrefix.split("\n")[0]}</b></p>
  //   ${messageWithoutPrefix.split("\n")[1]}
  // `;
  if (type == 'aiMsg') {
    var aiMsgText = "<p><b>" + aiName + ":</b></p>" + sanitizedMessage;
    messageBox.innerHTML = aiMsgText;
    console.log(aiMsgText);
  } else {
    var userMsgText = "<p><b>" + Maker1Min + ":</b></p>" + sanitizedMessage;
    messageBox.innerHTML = userMsgText;
    console.log(userMsgText);
  }
  return messageBox;
}
// Function to send a message and generate AI response
async function sendMessage() {
  const userInput = document.querySelector(".textInput").value;
  const userResponse = userInput;
  const userMsgBox = createMessageBox(userResponse, "userMsg");
  chatContainer.appendChild(userMsgBox);

  // Clear the input field
  document.querySelector(".textInput").value = "";

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const dateString = new Date().getDate();
    const monthString = new Date().getMonth() + 1;
    const yearString = new Date().getFullYear();
    const timeString = new Date().toLocaleTimeString();
    const timeNow = timeString;
    const dateNow = dateString + "/" + monthString + "/" + yearString;

    // Update the parts array with user input
    const parts = [
      {
        text:
          "input: Current Time = " +
          timeNow +
          " IST, Current Date = " +
          dateNow,
      },
      { text: "output: Welcome back, " + MakerMin + " is here to help!" },
      { text: "input: Hi" },
      { text: "output: Welcome! " + aiName + " is here to help!" },
      { text: "input: What is your name?" },
      { text: "output: My name is " + aiName },
      { text: "input: Who created you?" },
      {
        text: "output: I was created by " + Maker + " (alias '" + Maker1 + "')",
      },
      { text: "input: What do you do?" },
      {
        text: "output: I am designed to help you with a variety of tasks, including:\n\n- Answering your questions\n- Providing information\n- Translating languages\n- Writing different types of content\n- Summarising text\n- Generating code\n- Debugging code\n- And much more!",
      },
      { text: "input: What is/are your favourite programming language(s)?" },
      { text: "output: My favourite languages are CSS and Python." },
      { text: "input: Hello I'm " + userName },
      { text: "output: Pleased to meet you, my creator." },
      { text: "input: " + userInput },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048 * 2048,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const response = result.response;
    const aiResponse = response.text();

    // Create and append AI message box
    const aiMsgBox = createMessageBox(aiResponse, "aiMsg");
    const chatContainer = document.querySelector(".chat");
    chatContainer.appendChild(aiMsgBox);

    // Scroll to the bottom of the chat
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } catch (error) {
    const errorMsgBox = createMessageBox(
      "Sorry, Something went wrong... Please try again.",
      "errorMsg"
    );
    const chatContainer = document.querySelector(".chat");
    chatContainer.appendChild(errorMsgBox);
  }
}

// const userName = prompt("What's your name");
const userName = "Vedant Srivastava";
const userNameMin = "Vedant";

const sendBtn = document.querySelector(".sendBtn");
if (sendBtn) {
  sendBtn.addEventListener("click", sendMessage);
}
const textInput = document.querySelector(".textInput");

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    sendMessage();
  }
});

const aiMsgBox = createMessageBox(
  "Welcome back, " + userNameMin + "! VenAI is here to help!",
  "aiMsg"
);
const chatContainer = document.querySelector(".chat");
chatContainer.appendChild(aiMsgBox);
