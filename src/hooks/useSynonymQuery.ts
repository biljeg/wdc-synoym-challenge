import { useState } from "react";
import { DefinedUseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchSynoyms } from "../api/fetchSynoyms";
import { SynonymType } from "../App";

export const useSynonymQuery = (): [
  DefinedUseQueryResult<SynonymType[] | undefined, Error>,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [word, setWord] = useState<string>("");
  const query = useQuery({
    queryKey: ["synonyms", word],
    queryFn: () => fetchSynoyms(word),
    initialData: [],
  });
  return [query, setWord];
};

export default useSynonymQuery;
