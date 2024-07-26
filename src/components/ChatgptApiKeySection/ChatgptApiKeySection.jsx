function ChatgptApiKeySection({ chatgptApiKey, setChatgptApiKey }) {
  function handleChange(e) {
    setChatgptApiKey(e.target.value);
  }
  return (
    <div className="border-2 pt-1">
      <p>Insert Your ChatGPT API Key To Use AI Features: </p>
      <div className="flex justify-center items-start">
        <input
          className="border w-8/12 mb-1.5 text-center"
          value={chatgptApiKey}
          onChange={handleChange}
        />
        <a
          href="https://wedevs.com/blog/483810/generate-chatgpt-api-key/"
          target="_blank"
          rel="noreferrer"
        >
          <i class="material-icons">&#xe887;</i>
        </a>
      </div>
    </div>
  );
}
export default ChatgptApiKeySection;
