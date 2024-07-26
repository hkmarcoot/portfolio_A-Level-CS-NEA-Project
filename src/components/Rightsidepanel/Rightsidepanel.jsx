import { useState } from "react";
import { sentenceBank, botPreMadeReply } from "../PreMadeReply/PreMadeReply";
import OpenAI from "openai";

function Rightsidepanel({
  userIndex,
  listofUsers,
  setIsStateUpdated,
  stage,
  count,
  botQuestion,
  addChatBotQuestion,
  findNextQuestionAndAsk,
  isSurveyStart,
  setIsSurveyStart,
  isChatGPT,
  setIsChatGPT,
  chatgptApiKey,
}) {
  const openai = new OpenAI({
    apiKey: chatgptApiKey,
    dangerouslyAllowBrowser: true,
  });

  const [newItem, setNewItem] = useState("");
  // const [isChatGPT, setIsChatGPT] = useState(false);
  const [isChatGPTTyping, setIsChatGPTTyping] = useState(false);

  function sendMessage() {
    if (isChatGPT === false) {
      newItem !== "" && output(newItem);
    } else {
      newItem !== "" && chatGPTOutput(newItem);
    }
    setNewItem("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      if (isChatGPT === false) {
        newItem !== "" && output(newItem);
      } else {
        newItem !== "" && chatGPTOutput(newItem);
      }
      setNewItem("");
    }
  }

  // Find the question index as if the botQuestion is a flat array
  function findQuestionIndex(stage, count) {
    var result = 0;
    // Add the number of questions in the previous stage
    for (var i = 0; i < stage; i++) {
      result += botQuestion[i].length;
    }
    return result + count;
  }

  function isContainDollarSign(input) {
    return input.includes("$") || input.includes("£");
  }

  function removeDollarSign(input) {
    return input.replace("$", "").replace("£", "");
  }

  function startAdvisorChat() {
    // Check if whether isSurveyStart is false before change it to true
    if (isSurveyStart === false) {
      // Set isSurveyStart to be true
      setIsSurveyStart(true);
      if (
        listofUsers[userIndex].getSurveyResultDateStatus() === "answered" &&
        listofUsers[userIndex].isAllTaxpayerAnswerStatusAnswered()
      ) {
        // If the user have answered the survey,
        // tell them they have already completed the survey.
        addChatBotQuestion(
          "You have already answered the survey. Please press 'Calculate Tax' to calculate your tax."
        );
      } else if (listofUsers[userIndex].name === "New User") {
        addChatBotQuestion(botQuestion[0][0].question);
      } else {
        addChatBotQuestion(botQuestion[stage][count].question);
      }
      // Check if whether isSurveyStart is true before change it to false
    } else if (isSurveyStart === true) {
      // Set isSurveyStart to be false
      setIsSurveyStart(false);
      addChatBotQuestion(
        "Please ask me a question for receiving pre-made reply."
      );
    }
  }

  function findFromSentenceBank(sentenceBank, text, start, end) {
    // This is binary search in recursive method

    // Case that finish the searching and not found
    if (start > end) return "Not found from sentence bank";

    // Find the middle index
    var middleIndex = Math.floor((start + end) / 2);

    // Compare sentence at middle index with text
    if (sentenceBank[middleIndex] === text) return middleIndex;

    // If sentence at middle index is alphabetically greater than the text,
    // search in the upper half of middle index
    if (sentenceBank[middleIndex] > text) {
      return findFromSentenceBank(sentenceBank, text, start, middleIndex - 1);
    } else {
      // If sentence at middle index is alphabetically less than the text,
      // search in the lower half of middle index
      return findFromSentenceBank(sentenceBank, text, middleIndex + 1, end);
    }
  }

  function PreMadeChatbot(sentenceBank, text) {
    // Initialze the binary search by putting the start index at 0
    // and the end index at the last index of the sentenceBank
    var result = findFromSentenceBank(
      sentenceBank,
      text,
      0,
      sentenceBank.length - 1
    );
    if (result === "Not found from sentence bank") {
      return "Question not found from Pre-made database. Please ask other question or switch to ChatGPT. To calculate tax, please press 'Start Advisor Chat' to begin the survey.";
    } else {
      return botPreMadeReply[result];
    }
  }

  async function chatGPTOutput(input) {
    // Display the User's answer on the Chat
    addChatUserAnswer(input);

    // Let user know that the bot is typing
    setIsChatGPTTyping(true);

    // Set the contentMessage that will be submitted to ChatGPT
    var contentMessage =
      "This is a conversation about the UK tax in the tax year 2022/2023. The question is: " +
      input +
      ". Please answer the question within 50 words.";
    // Output ChatGPT reply
    await openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: contentMessage,
          },
        ],
      })
      .then((res) => {
        // Display the ChatGPT reply on the Chat
        addChatBotQuestion(res.choices[0].message.content);

        // Remove the ChatGPT is typing message
        setIsChatGPTTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function output(input) {
    var booleanTrue = ["yes", "y", "true", "t"];
    var booleanFalse = ["no", "n", "false", "f"];
    if (
      // Check if the index is still within the range of the botQuestion
      // and check if the user have pressed the 'Start Advisor Chat' button
      findQuestionIndex(stage, count) <
        [...botQuestion.flat(Infinity)].length &&
      isSurveyStart === true
    ) {
      if (stage === 0 && count === 0) {
        listofUsers[userIndex].setName(input);
      } else if (stage === 1 && count === 0) {
        listofUsers[userIndex].setSurveyResult(count, input);
        listofUsers[userIndex].setSurveyResultStatus(count, "answered");
        listofUsers[userIndex].checkValidDateFormat(input);
        listofUsers[userIndex].calculateNumOfDaysFromArrival(input);
        // If the user have spent 183 or more days in the UK,
        // set the user's residency to be a UK resident
        if (listofUsers[userIndex].numOfDaysFromArrival >= 183) {
          listofUsers[userIndex].setSurveyResult(3, "User is a UK resident");
          listofUsers[userIndex].setSurveyResultStatus(3, "answered");
        }
        // Reset question 2 and 3 in the surveyResult botQuestion
        listofUsers[userIndex].setSurveyResultBackToInitial(1);
        listofUsers[userIndex].setSurveyResultBackToInitial(2);
      } else if ((stage === 1 && count === 1) || (stage === 1 && count === 2)) {
        if (booleanTrue.includes(input.toLowerCase())) {
          listofUsers[userIndex].setSurveyResult(count, true);
          listofUsers[userIndex].setSurveyResultStatus(count, "answered");
          listofUsers[userIndex].setSurveyResult(3, "User is a UK resident");
        } else if (booleanFalse.includes(input.toLowerCase())) {
          listofUsers[userIndex].setSurveyResult(count, false);
          listofUsers[userIndex].setSurveyResultStatus(count, "answered");
          if (stage === 1 && count === 2) {
            listofUsers[userIndex].setSurveyResult(
              3,
              "User is a non-resident in the UK"
            );
          }
        } else {
          // Set the answer to undefined if the user input is not yes or no
          // Keep the status as pending
          listofUsers[userIndex].setSurveyResult(count, "undefined");
        }
      } else if ((stage === 2 && count <= 3) || (stage === 2 && count >= 5)) {
        // Remove the dollar sign if the user input contains dollar sign
        if (isContainDollarSign(input)) {
          input = removeDollarSign(input);
        }
        // Remove the dot if the user input contains dot, just for checking
        // if the input contains only digits
        var withoutDot = input.replace(/[.]/g, "");
        // If the string contains only digits, convert it to a number
        if (/^\d+$/.test(withoutDot)) {
          input = parseFloat(input);
        }
        if (typeof input === "number") {
          // Save the user's answer if the input is a number
          listofUsers[userIndex].setTaxpayerAnswer(count, input);
          listofUsers[userIndex].setTaxpayerAnswerStatus(count, "answered");
          // It will ask user to input a number if the user input is not a number
          // This is programmed in findNextQuestionAndAsk()
        }
      } else if (stage === 2 && count === 4) {
        // Change from using useState to calling the method
        // directly from the list of object

        if (booleanTrue.includes(input.toLowerCase())) {
          listofUsers[userIndex].setTaxpayerAnswer(count, true);
          listofUsers[userIndex].setTaxpayerAnswerStatus(count, "answered");
          // Reset the status of the next 5 questions to be pending
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 1, "pending");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 2, "pending");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 3, "pending");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 4, "pending");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 5, "pending");
        } else if (booleanFalse.includes(input.toLowerCase())) {
          listofUsers[userIndex].setTaxpayerAnswer(count, false);
          listofUsers[userIndex].setTaxpayerAnswerStatus(count, "answered");
          // Set the status of the next 5 questions to be skipped
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 1, "skipped");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 2, "skipped");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 3, "skipped");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 4, "skipped");
          listofUsers[userIndex].setTaxpayerAnswerStatus(count + 5, "skipped");
          // Reset the values to be 0 if the user answer 'No'
          listofUsers[userIndex].setTaxpayerAnswer(count + 1, 0);
          listofUsers[userIndex].setTaxpayerAnswer(count + 2, 0);
          listofUsers[userIndex].setTaxpayerAnswer(count + 3, 0);
          listofUsers[userIndex].setTaxpayerAnswer(count + 4, 0);
          listofUsers[userIndex].setTaxpayerAnswer(count + 5, 0);
        } else {
          // Set the answer to undefined if the user input is not yes or no
          // Keep the status as pending
          listofUsers[userIndex].setTaxpayerAnswer(count, "undefined");
        }
      }
    }
    // Update the state of the listofUsers
    setIsStateUpdated(true);
    // Display the User's answer on the Chat
    addChatUserAnswer(input);

    // Output Pre-made reply.
    // This section is located here because it needs to be after addChatUserAnswer()
    // and it can use sentenceBank and setNewItem in the Rightsidepanel.jsx.
    if (isSurveyStart === false) {
      // Handle the situation user haven't press the 'Start Advisor Chat' button
      // Replace the underscore with space, remove the question mark and
      // change the input to lowercase
      var inputToPreMadeChatbot = input.replace(/[_]/g, " ");
      inputToPreMadeChatbot = inputToPreMadeChatbot.replace(/[?]/g, "");
      inputToPreMadeChatbot = inputToPreMadeChatbot.toLowerCase();
      addChatBotQuestion(PreMadeChatbot(sentenceBank, inputToPreMadeChatbot));
      // Remove text in the chat box
      setNewItem("");
    }

    // Go the findNextQuestionAndAsk() procedure
    findNextQuestionAndAsk(userIndex, input);
  }

  function addChatUserAnswer(answer) {
    const mainDiv = document.getElementById("dialogue-section");
    let appUserDiv = document.createElement("div");
    appUserDiv.id = "appuser";
    appUserDiv.classList.add("message");
    appUserDiv.innerHTML = `<span id="appuser-response">${answer}</span>`;
    mainDiv.appendChild(appUserDiv);
    var scroll = document.getElementById("dialogue-section"); // It scroll down the chat automatically.
    scroll.scrollTop = scroll.scrollHeight;
  }

  function switchToChatGPT() {
    if (isChatGPT === false) {
      addChatBotQuestion("Switch to ChatGPT. Please ask me a question.");
    } else {
      addChatBotQuestion(
        "Switch to Advisor. Please continue your conversation."
      );
      // ****** This part is similar to startAdvisorChat() ****** //
      // just that it will not change the isSurveyStart state.
      // Check if whether isSurveyStart is true
      if (isSurveyStart === true) {
        if (
          listofUsers[userIndex].getSurveyResultDateStatus() === "answered" &&
          listofUsers[userIndex].isAllTaxpayerAnswerStatusAnswered()
        ) {
          // If the user have answered the survey,
          // tell them they have already completed the survey.
          addChatBotQuestion(
            "You have already answered the survey. Please press 'Calculate Tax' to calculate your tax."
          );
        } else if (listofUsers[userIndex].name === "New User") {
          addChatBotQuestion(botQuestion[0][0].question);
        } else {
          addChatBotQuestion(botQuestion[stage][count].question);
        }
        // Check if whether isSurveyStart is false
      } else if (isSurveyStart === false) {
        addChatBotQuestion(
          "Please ask me a question for receiving pre-made reply."
        );
      }
      // ****** Part similar to startAdvisorChat() ends here ****** //
    }

    // Change the isChatGPT state
    setIsChatGPT(!isChatGPT);
  }

  return (
    <div className="w-1/2 bg-light-blue border-2">
      {isChatGPT === false ? (
        <div className="py-4">
          {isSurveyStart === false ? (
            <button
              className="mx-6 md:w-36 lg:w-48"
              onClick={() => startAdvisorChat()}
            >
              Start Advisor Chat
            </button>
          ) : (
            <button
              className="mx-6 md:w-36 lg:w-48"
              onClick={() => startAdvisorChat()}
            >
              Get Pre-made Reply
            </button>
          )}
          <button
            className="mx-6 md:w-32 lg:w-48"
            onClick={() => switchToChatGPT()}
          >
            Switch to ChatGPT
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center">
          <div className="py-4">
            <button
              className="mx-6 md:w-32 lg:w-48"
              onClick={() => switchToChatGPT()}
            >
              Back to Advisor
            </button>
          </div>
          {isChatGPTTyping === true ? (
            <div className="italic">Loading...</div>
          ) : null}
        </div>
      )}

      <div
        id="dialogue-section"
        className="h-64  md:h-96 lg:h-104 text-left px-2 overflow-y-auto"
      >
        <div id="chatbot" className="message">
          <span id="chatbot-reply">
            Please Press 'Start Advisor Chat' button to begin the survey or ask
            a question in the Chat box.
          </span>
        </div>
      </div>
      <div id="input-section">
        <input
          className="w-3/5 min-w-[200px] h-10 border-2"
          id="input"
          type="text"
          placeholder=" Start Conversation ..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send" onClick={() => sendMessage()}>
          <div className="circle">Send</div>
        </button>
      </div>
    </div>
  );
}

export default Rightsidepanel;
