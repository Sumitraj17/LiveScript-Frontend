import axios from "axios";
import { monacoLanguages, languages } from "../constants";
import { useContext } from "react";
import { Context } from "../context/context.jsx";
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const getLanguages = async () => {
  try {
    const resp = await API.get("/runtimes");

    const lang = resp.data.filter(
      (i) =>
        i.aliases.some((element) => languages.includes(element)) ||
        languages.includes(i.language)
    );
    return lang;
  } catch (error) {
    console.log(`Error occured:- ${error}`);
  }
};

export const executeCode = async (language,sourceCode,version) => {
  // const version = fetchVersion(language);
  // if(version ==null) return;
  try {
    // console.log(language,sourceCode,version)
    const resp = await API.post("/execute", {
      language: language,
      version:version,
      files: [
        {
          content: sourceCode,
        },
      ],
    });
    return resp.data
  } catch (error) {
    console.log("Error Occured");
  }
};
