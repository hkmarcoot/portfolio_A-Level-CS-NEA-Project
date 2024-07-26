export default function UserCard({
  index,
  name,
  setUserIndex,
  listofUsers,
  userIndex,
  setListofUsers,
  findNextQuestionAndAsk,
}) {
  function handleDeleteUser() {
    if (listofUsers.length > 1) {
      // If the user is the first one in the list,
      // keep the index at 0 after deleting the first user
      if (userIndex === 0) {
        setUserIndex(0);
        // Ask question to the next user
        findNextQuestionAndAsk(0);
      } else {
        setUserIndex(index - 1);
        // Ask question to the next user
        findNextQuestionAndAsk(index - 1);
      }

      // Delete user from listofUsers
      const arr = [...listofUsers];
      arr.splice(index, 1);
      setListofUsers(arr);
    }
    // Do not need to update state because the listofUsers is updated
    // setIsStateUpdated(true);
  }
  return (
    <div className="flex flex-col border-2 justify-between">
      <div
        id="user-card"
        className=" cursor-pointer px-8 min-w-40 flex flex-col justify-between items-center"
        onClick={() => {
          setUserIndex(index);
          findNextQuestionAndAsk(index);
        }}
      >
        {index === userIndex ? (
          <p className="font-bold py-2">{name}</p>
        ) : (
          <p className="py-2">{name}</p>
        )}
      </div>
      {index === userIndex && listofUsers.length > 1 ? (
        <div>
          <button
            className="py-0 px-1 mb-1"
            onClick={() => {
              handleDeleteUser();
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
