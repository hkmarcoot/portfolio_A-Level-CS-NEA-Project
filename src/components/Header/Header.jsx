import { useState } from "react";
import UserCard from "../UserCard/UserCard.jsx";

function Header({
  listofUsers,
  createNewUser,
  setUserIndex,
  userIndex,
  setListofUsers,
  findNextQuestionAndAsk,
  setIsImport,
  isChatGPT,
}) {
  const [isAddNewUserCardOpen, setIsAddNewUserCardOpen] = useState(false);
  const [isImportUserCardOpen, setIsImportUserCardOpen] = useState(false);
  const [inputName, setInputName] = useState("");
  const [importFileName, setImportFileName] = useState("");

  function jsonFileDownload() {
    const json_data = listofUsers;
    const fileName = "newfilename.json";
    const data = new Blob([JSON.stringify(json_data)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  }

  function jsonFileUpload() {
    const fileReader = new FileReader();
    fileReader.readAsText(importFileName, "UTF-8");
    fileReader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      for (var i = 0; i < data.length; i++) {
        createNewUser(
          data[i].name,
          data[i].surveyResult,
          data[i].taxpayerAnswer,
          data[i].numOfDaysFromArrival,
          data[i].wages,
          data[i].tradingBeforeAllowance,
          data[i].tradingAfterAllowance,
          data[i].tradingAllowanceApplied,
          data[i].propertyBeforeAllowance,
          data[i].propertyAfterAllowance,
          data[i].propertyAllowanceApplied,
          data[i].totalIncome,
          data[i].nonSavingsIncome,
          data[i].taxOnNonSavingsIncome,
          data[i].taxOnNonSavingsIncomeCalculation,
          data[i].dividend,
          data[i].taxOnDividend,
          data[i].taxOnDividendCalculation,
          data[i].interest,
          data[i].taxOnInterest,
          data[i].taxOnInterestCalculation,
          data[i].taxPaid,
          data[i].band
        );
      }
    };
    // Set isImport back to false
    // setIsImport(false);
  }

  return (
    <header className="w-full flex flex-row bg-light-blue border-2">
      {isChatGPT ? (
        <>
          <div className="bg-medium-blue w-3/5 flex justify-center items-center">
            <div className="inline-block text-white">
              Notice: Please click on the Back To Advisor button to get all the
              hidden elements back.
            </div>
          </div>
          <div className="bg-dark-blue w-2/5 py-1 md:py-4 lg:py-4">
            <button
              className="px-1 mt-1 cursor-not-allowed bg-gray-300 opacity-50"
              disabled
            >
              Add New User
            </button>
            <button
              className="px-1 mt-1 mx-1 cursor-not-allowed bg-gray-300 opacity-50"
              disabled
            >
              Import User Data
            </button>
            <button
              className="px-1 my-1 cursor-not-allowed bg-gray-300 opacity-50"
              disabled
            >
              Export User Data
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="bg-medium-blue w-3/5 ">
            {listofUsers && (
              <div className="flex flex-row h-full overflow-x-auto">
                {listofUsers.map((data, index) => (
                  <UserCard
                    key={index}
                    index={index}
                    name={data.name}
                    setUserIndex={setUserIndex}
                    listofUsers={listofUsers}
                    userIndex={userIndex}
                    setListofUsers={setListofUsers}
                    findNextQuestionAndAsk={findNextQuestionAndAsk}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="bg-dark-blue w-2/5 py-1 md:py-4 lg:py-4">
            <button
              className="px-1 mt-1"
              onClick={() => setIsAddNewUserCardOpen(true)}
            >
              Add New User
            </button>
            <button
              className="px-1 mt-1 mx-1"
              onClick={() => {
                setIsImportUserCardOpen(true);
                // Set isImport to true so that the createNewUser() will not ask the first question
                setIsImport(true);
              }}
            >
              Import User Data
            </button>
            <button className="px-1 my-1" onClick={jsonFileDownload}>
              Export User Data
            </button>
          </div>
        </>
      )}

      {isAddNewUserCardOpen ? (
        <div className="window-modal">
          <div className="create-user-card">
            <h2>Add New User</h2>
            <p>
              <strong>New User Name: </strong>
              <input
                className="w-3/5 min-w-[200px] h-10 border-2"
                id="input"
                type="text"
                placeholder=" Name ..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              ></input>
            </p>
            <br />
            <button
              className="px-1 mt-1 mx-1"
              onClick={() => {
                createNewUser(inputName);
                setInputName("");
                setIsAddNewUserCardOpen(false);
              }}
            >
              Create
            </button>
            <button
              className="px-1 mt-1 mx-1"
              onClick={() => setIsAddNewUserCardOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      {isImportUserCardOpen ? (
        <div className="window-modal">
          <div className="import-user-card">
            <h2>Upload & Import User JSON File</h2>
            <input
              type="file"
              onChange={(e) => {
                setImportFileName(e.target.files[0]);
              }}
            />
            <button
              onClick={() => {
                jsonFileUpload();
                setIsImportUserCardOpen(false);
                // Set isImport back to false
                setIsImport(false);
              }}
            >
              Submit
            </button>
            <button
              className="ml-1"
              onClick={() => {
                setIsImportUserCardOpen(false);
                // Set isImport back to false
                setIsImport(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
