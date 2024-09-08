import { SynonymType } from "../hooks/useGetSynonyms";

const BASE_URL = "https://api.datamuse.com";

// the form will be concerned with validation
// (of course it can't submit when the input is empty so
// this prop word cannot be an empty string so we don't need to be concerned about that)

// we need to make this function fetch with axios and just be concerned about that
// make react query concerned with error handling (if the request fails the synonym array is empty of course)

export const fetchSynoyms = async (word: string): Promise<SynonymType[]> => {
  const seperatedWord = word.toLowerCase().replace(/\s+/g, "+");
  // try {
  const response = await fetch(
    `${BASE_URL}/words?rel_syn=${seperatedWord}&max=4`,
  );
  if (!response.ok) {
    throw new Error("Response was not ok");
  }
  const data = (await response.json()) as SynonymType[];
  return data;
  // } catch (error) {
  //   console.error(error);
  // }
};
