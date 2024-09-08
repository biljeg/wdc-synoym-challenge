import { FormEvent, useState } from "react";
import { useGetSynoyms } from "./hooks/useGetSynonyms";

function App() {
  const [word, setWord] = useState<string>("");
  const { isLoading, synonyms, getSynonyms } = useGetSynoyms();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getSynonyms(word);
  };

  const handleSynoymClick = async (newWord: string) => {
    setWord(newWord);
    getSynonyms(word);
  };

  return (
    <main className="min-h-screen w-screen flex justify-center items-center flex-col gap-10">
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex flex-col gap-2">
          <label htmlFor="word-input">Word</label>
          <input
            value={word}
            onChange={e => setWord(e.target.value)}
            id="word-input"
            name="word"
            type="text"
            placeholder="Type something here..."
            className="rounded-lg p-4"
          />
        </div>
        <button type="submit">Find synonyms</button>
      </form>
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <ul className="flex flex-col gap-2">
          {synonyms.map(({ word, score }) => (
            <li key={score} onClick={() => handleSynoymClick(word)}>
              {word}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
