import { useState } from "react";
import { fetchSynoyms } from "../api/fetchSynoyms";

export type SynonymType = {
  word: string;
  score: number;
};

export const useGetSynoyms = () => {
  const [synonyms, setSynonyms] = useState<SynonymType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSynonyms = async (word: string) => {
    setIsLoading(true);
    const data = await fetchSynoyms(word);
    if (data !== undefined) {
      setSynonyms(data);
    }
    setIsLoading(false);
  };

  return { isLoading, synonyms, getSynonyms };
};
