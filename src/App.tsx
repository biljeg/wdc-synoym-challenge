import { useForm, SubmitHandler } from "react-hook-form";
import useSynonymQuery from "./hooks/useSynonymQuery";

export type SynonymType = {
  word: string;
  score: number;
};

type Inputs = {
  word: string;
};

function App() {
  const [{ data, isFetching }, setWord] = useSynonymQuery();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { word: "" } });

  const onSubmit: SubmitHandler<Inputs> = data => {
    setWord(data.word);
  };

  const handleSynoymClick = async (newWord: string) => {
    setValue("word", newWord);
    handleSubmit(onSubmit)();
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen gap-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="word-input">Your word</label>
          <input
            {...register("word", { required: true })}
            id="word-input"
            type="text"
            placeholder="Type something here..."
            className="p-4 rounded-lg"
          />
          {errors.word && (
            <span className="text-red-400">This field is required</span>
          )}
        </div>
        <button type="submit">Find synonyms</button>
      </form>
      {isFetching ? (
        <h4>Loading...</h4>
      ) : (
        <ul className="flex flex-col gap-2">
          {data?.map(({ word, score }) => (
            <li
              className="cursor-pointer hover:text-[#646cff]"
              key={score}
              onClick={() => handleSynoymClick(word)}
            >
              {word}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
