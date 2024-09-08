import { SynonymType } from "../hooks/useGetSynonyms";

const BASE_URL = "https://api.datamuse.com";

export const fetchSynoyms = async (
  word: string,
): Promise<SynonymType[] | undefined> => {
  if (word === "") return;
  const seperatedWord = word.toLowerCase().replace(/\s+/g, "+");
  console.log(seperatedWord);
  try {
    const response = await fetch(
      `${BASE_URL}/words?rel_syn=${seperatedWord}&max=4`,
    );
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    const data = (await response.json()) as SynonymType[];
    return data;
  } catch (error) {
    console.error(error);
  }
};
