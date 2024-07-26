function Leftsidepanel({
  userIndex,
  userSurveyResult,
  userAnswer,
  taxPaid,
  listofUsers,
  setIsStateUpdated,
  setStage,
  setCount,
  botQuestion,
  addChatBotQuestion,
  isChatGPT,
}) {
  const sum = sumOfUserAnswer();

  function sumOfUserAnswer() {
    // Remove the 5th element in the array
    var newArr = [
      ...Object.values(userAnswer).slice(0, 4),
      ...Object.values(userAnswer).slice(5),
    ];

    return newArr.reduce((a, b) => a + b.answer, 0);
  }

  return (
    <div className="h-136 w-1/2 bg-light-blue border-2 overflow-y-auto">
      {isChatGPT ? (
        <>
          <p>Index: {userIndex}</p>
          <p className="font-bold">Username: {listofUsers[userIndex].name}</p>
          {userSurveyResult[0].status === "answered" ? (
            <>
              <p>Arrival Date: {userSurveyResult[0].answer}</p>
              <p>
                Number of Days From Arrival:{" "}
                {listofUsers[userIndex].numOfDaysFromArrival}
              </p>
            </>
          ) : null}
          {userSurveyResult[3].status === "answered" ? (
            <p>Resident State: {userSurveyResult[3].answer}</p>
          ) : null}
          {userAnswer[0].status === "answered" ? (
            <p>Earn From Employment (local): £{userAnswer[0].answer}</p>
          ) : null}
          {userAnswer[1].status === "answered" ? (
            <p>Earn From Self-Employed (local): £{userAnswer[1].answer}</p>
          ) : null}
          {userAnswer[2].status === "answered" ? (
            <p>Earn From Freelance Work: £{userAnswer[2].answer}</p>
          ) : null}
          {userAnswer[3].status === "answered" ? (
            <p>Earn From Rental income (local): £{userAnswer[3].answer}</p>
          ) : null}
          {userAnswer[4].status === "answered" ? (
            userAnswer[4].answer === true ? (
              <p>Any foregin income? Yes</p>
            ) : (
              <p>Any foregin income? No</p>
            )
          ) : null}
          {userAnswer[5].status === "answered" ? (
            <p>Earn from your oversea company: £{userAnswer[5].answer}</p>
          ) : null}
          {userAnswer[6].status === "answered" ? (
            <p>Earn from your oversea job: £{userAnswer[6].answer}</p>
          ) : null}
          {userAnswer[7].status === "answered" ? (
            <p>Earn from the oversea interest: £{userAnswer[7].answer}</p>
          ) : null}
          {userAnswer[8].status === "answered" ? (
            <p>Earn from the oversea dividend: £{userAnswer[8].answer}</p>
          ) : null}
          {userAnswer[9].status === "answered" ? (
            <p>Earn from the oversea rental income: £{userAnswer[9].answer}</p>
          ) : null}
          {userAnswer[10].status === "answered" ? (
            <p>
              Earn from the interest in your savings (local): £
              {userAnswer[10].answer}
            </p>
          ) : null}
          {userAnswer[11].status === "answered" ? (
            <p>Earn from the dividend (local): £{userAnswer[11].answer}</p>
          ) : null}
          <p>Total income before allowance applied: £{sum}</p>
          <button
            className="cursor-not-allowed bg-gray-300 opacity-50 font-bold py-2 px-4 rounded"
            disabled
          >
            Calculate Tax
          </button>
          {listofUsers[userIndex].wages.status === "calculated" ? (
            <p>Wages: £{listofUsers[userIndex].wages.answer}</p>
          ) : null}
          {listofUsers[userIndex].tradingBeforeAllowance.status ===
          "calculated" ? (
            <p>
              Trading income before allowance: £
              {listofUsers[userIndex].tradingBeforeAllowance.answer}
            </p>
          ) : null}
          {listofUsers[userIndex].tradingAfterAllowance.status ===
          "calculated" ? (
            <>
              <p>Trading income after allowance applied:</p>
              <p>
                £{listofUsers[userIndex].tradingBeforeAllowance.answer} - £
                {listofUsers[userIndex].tradingAllowanceApplied.answer} = £
                {listofUsers[userIndex].tradingAfterAllowance.answer}
              </p>
            </>
          ) : null}
          {listofUsers[userIndex].propertyBeforeAllowance.status ===
          "calculated" ? (
            <p>
              Property income before allowance: £
              {listofUsers[userIndex].propertyBeforeAllowance.answer}
            </p>
          ) : null}
          {listofUsers[userIndex].propertyAfterAllowance.status ===
          "calculated" ? (
            <>
              <p>Property income after allowance applied:</p>
              <p>
                £{listofUsers[userIndex].propertyBeforeAllowance.answer} - £
                {listofUsers[userIndex].propertyAllowanceApplied.answer} = £
                {listofUsers[userIndex].propertyAfterAllowance.answer}
              </p>
            </>
          ) : null}
          {listofUsers[userIndex].totalIncome.status === "calculated" ? (
            <p>Total income: £{listofUsers[userIndex].totalIncome.answer}</p>
          ) : null}
          {listofUsers[userIndex].band.status === "calculated" ? (
            <>
              <p>Your band: {listofUsers[userIndex].band.answer}</p>
              <p>---------------------------------------------</p>
            </>
          ) : null}
          {listofUsers[userIndex].nonSavingsIncome.status === "calculated" ? (
            <p>
              Non-savings income: £
              {listofUsers[userIndex].nonSavingsIncome.answer}
            </p>
          ) : null}
          {listofUsers[userIndex].taxOnNonSavingsIncomeCalculation.status ===
          "calculated" ? (
            <>
              <p>Calculation:</p>
              <p>
                {listofUsers[userIndex].taxOnNonSavingsIncomeCalculation.answer}
              </p>
            </>
          ) : null}
          {listofUsers[userIndex].taxOnNonSavingsIncome.status ===
          "calculated" ? (
            <>
              <p>
                Tax on non-savings income: £
                {listofUsers[userIndex].taxOnNonSavingsIncome.answer}
              </p>
              <p>---------------------------------------------</p>
            </>
          ) : null}
          {listofUsers[userIndex].interest.status === "calculated" ? (
            <p>Interest: £{listofUsers[userIndex].interest.answer}</p>
          ) : null}
          {listofUsers[userIndex].taxOnInterestCalculation.status ===
          "calculated" ? (
            <>
              <p>Calculation:</p>
              <p>{listofUsers[userIndex].taxOnInterestCalculation.answer}</p>
            </>
          ) : null}
          {listofUsers[userIndex].taxOnInterest.status === "calculated" ? (
            <>
              <p>
                Tax on interest: £{listofUsers[userIndex].taxOnInterest.answer}
              </p>
              <p>---------------------------------------------</p>
            </>
          ) : null}
          {listofUsers[userIndex].dividend.status === "calculated" ? (
            <p>Dividend: £{listofUsers[userIndex].dividend.answer}</p>
          ) : null}
          {listofUsers[userIndex].taxOnDividendCalculation.status ===
          "calculated" ? (
            <>
              <p>Calculation:</p>
              <p>{listofUsers[userIndex].taxOnDividendCalculation.answer}</p>
            </>
          ) : null}
          {listofUsers[userIndex].taxOnDividend.status === "calculated" ? (
            <>
              <p>
                Tax on dividend: £{listofUsers[userIndex].taxOnDividend.answer}
              </p>
              <p>---------------------------------------------</p>
            </>
          ) : null}
          <p>Total Tax: £{taxPaid.answer}</p>
        </>
      ) : (
        <>
          <p>Index: {userIndex}</p>
          <p
            className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
            onClick={() => {
              setStage(0);
              setCount(0);
              addChatBotQuestion(botQuestion[0][0].question);
            }}
          >
            Username: {listofUsers[userIndex].name}
          </p>
          {userSurveyResult[0].status === "answered" ? (
            <>
              <p
                className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
                onClick={() => {
                  setStage(1);
                  setCount(0);
                  addChatBotQuestion(botQuestion[1][0].question);
                  // Reset question 2, 3 and result in the surveyResult botQuestion
                  listofUsers[userIndex].setSurveyResultBackToInitial(1);
                  listofUsers[userIndex].setSurveyResultBackToInitial(2);
                  listofUsers[userIndex].setSurveyResultBackToInitial(3);
                }}
              >
                Arrival Date: {userSurveyResult[0].answer}
              </p>
              <p>
                Number of Days From Arrival:{" "}
                {listofUsers[userIndex].numOfDaysFromArrival}
              </p>
            </>
          ) : null}
          {userSurveyResult[3].status === "answered" ? (
            <p>Resident State: {userSurveyResult[3].answer}</p>
          ) : null}
          {userAnswer[0].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(0);
                addChatBotQuestion(botQuestion[2][0].question);
              }}
            >
              Earn From Employment (local): £{userAnswer[0].answer}
            </p>
          ) : null}
          {userAnswer[1].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(1);
                addChatBotQuestion(botQuestion[2][1].question);
              }}
            >
              Earn From Self-Employed (local): £{userAnswer[1].answer}
            </p>
          ) : null}
          {userAnswer[2].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(2);
                addChatBotQuestion(botQuestion[2][2].question);
              }}
            >
              Earn From Freelance Work: £{userAnswer[2].answer}
            </p>
          ) : null}
          {userAnswer[3].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(3);
                addChatBotQuestion(botQuestion[2][3].question);
              }}
            >
              Earn From Rental income (local): £{userAnswer[3].answer}
            </p>
          ) : null}
          {userAnswer[4].status === "answered" ? (
            userAnswer[4].answer === true ? (
              <p
                className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
                onClick={() => {
                  setStage(2);
                  setCount(4);
                  addChatBotQuestion(botQuestion[2][4].question);
                }}
              >
                Any foregin income? Yes
              </p>
            ) : (
              <p
                className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
                onClick={() => {
                  setStage(2);
                  setCount(4);
                  addChatBotQuestion(botQuestion[2][4].question);
                }}
              >
                Any foregin income? No
              </p>
            )
          ) : null}
          {userAnswer[5].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(5);
                addChatBotQuestion(botQuestion[2][5].question);
              }}
            >
              Earn from your oversea company: £{userAnswer[5].answer}
            </p>
          ) : null}
          {userAnswer[6].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(6);
                addChatBotQuestion(botQuestion[2][6].question);
              }}
            >
              Earn from your oversea job: £{userAnswer[6].answer}
            </p>
          ) : null}
          {userAnswer[7].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(7);
                addChatBotQuestion(botQuestion[2][7].question);
              }}
            >
              Earn from the oversea interest: £{userAnswer[7].answer}
            </p>
          ) : null}
          {userAnswer[8].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(8);
                addChatBotQuestion(botQuestion[2][8].question);
              }}
            >
              Earn from the oversea dividend: £{userAnswer[8].answer}
            </p>
          ) : null}
          {userAnswer[9].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(9);
                addChatBotQuestion(botQuestion[2][9].question);
              }}
            >
              Earn from the oversea rental income: £{userAnswer[9].answer}
            </p>
          ) : null}
          {userAnswer[10].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(10);
                addChatBotQuestion(botQuestion[2][10].question);
              }}
            >
              Earn from the interest in your savings (local): £
              {userAnswer[10].answer}
            </p>
          ) : null}
          {userAnswer[11].status === "answered" ? (
            <p
              className="hover:font-bold hover:cursor-pointer hover:bg-medium-blue"
              onClick={() => {
                setStage(2);
                setCount(11);
                addChatBotQuestion(botQuestion[2][11].question);
              }}
            >
              Earn from the dividend (local): £{userAnswer[11].answer}
            </p>
          ) : null}
          <p>Total income before allowance applied: £{sum}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={() => {
              listofUsers[userIndex].calculateTaxPaid();
              setIsStateUpdated(true);
            }}
          >
            Calculate Tax
          </button>
          {listofUsers[userIndex].wages.status === "calculated" ? (
            <p>Wages: £{listofUsers[userIndex].wages.answer}</p>
          ) : null}
          {listofUsers[userIndex].tradingBeforeAllowance.status ===
          "calculated" ? (
            <p>
              Trading income before allowance: £
              {listofUsers[userIndex].tradingBeforeAllowance.answer}
            </p>
          ) : null}
          {listofUsers[userIndex].tradingAfterAllowance.status ===
          "calculated" ? (
            <>
              <p>Trading income after allowance applied:</p>
              <p>
                £{listofUsers[userIndex].tradingBeforeAllowance.answer} - £
                {listofUsers[userIndex].tradingAllowanceApplied.answer} = £
                {listofUsers[userIndex].tradingAfterAllowance.answer}
              </p>
            </>
          ) : null}
          {listofUsers[userIndex].propertyBeforeAllowance.status ===
          "calculated" ? (
            <p>
              Property income before allowance: £
              {listofUsers[userIndex].propertyBeforeAllowance.answer}
            </p>
          ) : null}
          {listofUsers[userIndex].propertyAfterAllowance.status ===
          "calculated" ? (
            <>
              <p>Property income after allowance applied:</p>
              <p>
                £{listofUsers[userIndex].propertyBeforeAllowance.answer} - £
                {listofUsers[userIndex].propertyAllowanceApplied.answer} = £
                {listofUsers[userIndex].propertyAfterAllowance.answer}
              </p>
            </>
          ) : null}
          {listofUsers[userIndex].totalIncome.status === "calculated" ? (
            <p>Total income: £{listofUsers[userIndex].totalIncome.answer}</p>
          ) : null}
          {listofUsers[userIndex].band.status === "calculated" ? (
            <>
              <p>Your band: {listofUsers[userIndex].band.answer}</p>
              <p>---------------------------------------------</p>
            </>
          ) : null}
          {listofUsers[userIndex].nonSavingsIncome.status === "calculated" ? (
            <p>
              Non-savings income: £
              {listofUsers[userIndex].nonSavingsIncome.answer}
            </p>
          ) : null}
          {listofUsers[userIndex].taxOnNonSavingsIncomeCalculation.status ===
          "calculated" ? (
            <>
              <p>Calculation:</p>
              <p>
                {listofUsers[userIndex].taxOnNonSavingsIncomeCalculation.answer}
              </p>
            </>
          ) : null}
          {listofUsers[userIndex].taxOnNonSavingsIncome.status ===
          "calculated" ? (
            <>
              <p>
                Tax on non-savings income: £
                {listofUsers[userIndex].taxOnNonSavingsIncome.answer}
              </p>
              <p>---------------------------------------------</p>
            </>
          ) : null}
          {listofUsers[userIndex].interest.status === "calculated" ? (
            <p>Interest: £{listofUsers[userIndex].interest.answer}</p>
          ) : null}
          {listofUsers[userIndex].taxOnInterestCalculation.status ===
          "calculated" ? (
            <>
              <p>Calculation:</p>
              <p>{listofUsers[userIndex].taxOnInterestCalculation.answer}</p>
            </>
          ) : null}
          {listofUsers[userIndex].taxOnInterest.status === "calculated" ? (
            <>
              <p>
                Tax on interest: £{listofUsers[userIndex].taxOnInterest.answer}
              </p>
              <p>---------------------------------------------</p>
            </>
          ) : null}
          {listofUsers[userIndex].dividend.status === "calculated" ? (
            <p>Dividend: £{listofUsers[userIndex].dividend.answer}</p>
          ) : null}
          {listofUsers[userIndex].taxOnDividendCalculation.status ===
          "calculated" ? (
            <>
              <p>Calculation:</p>
              <p>{listofUsers[userIndex].taxOnDividendCalculation.answer}</p>
            </>
          ) : null}
          {listofUsers[userIndex].taxOnDividend.status === "calculated" ? (
            <>
              <p>
                Tax on dividend: £{listofUsers[userIndex].taxOnDividend.answer}
              </p>
              <p>---------------------------------------------</p>
            </>
          ) : null}
          <p>Total Tax: £{taxPaid.answer}</p>
        </>
      )}
    </div>
  );
}

export default Leftsidepanel;
