import Axios from "axios";
import { SynonymType } from "../App";

const axiosInstance = Axios.create({
  baseURL: "https://api.datamuse.com",
});

export const fetchSynoyms = async (
  word: string,
): Promise<SynonymType[] | undefined> => {
  const seperatedWord = word.toLowerCase().replace(/\s+/g, "+");
  try {
    const response = await axiosInstance.get<SynonymType[]>(
      `/words?rel_syn=${seperatedWord}&max=4`,
    );

    if (response.status !== 200) {
      throw new Error("Response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
