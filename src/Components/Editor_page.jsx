import React, { useEffect, useRef, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { boilerplateCode } from "./constants";
import Selector from "./LanguageSelector";
import { VscTriangleRight } from "react-icons/vsc";
import { executeCode } from "./APIhelper/api.jsx";
import { Context } from "./context/context.jsx";

const Editor_page = () => {
  const location = useLocation();
  const editorRef = useRef(null);
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState("");
  const [run, setRun] = useState(false);
  const { language } = useContext(Context);
  const [testCode, setTestCode] = useState(null);

  const { id, username } = location.state || {};

  const fetchVersion = (lang) => {
    const match = language.find((element) => element.language === lang);
    return match ? match.version : null;
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleRun = async () => {
    setRun(true);
    try {
      const version = fetchVersion(lang);
      // console.log(version);
      const resp = await executeCode(lang, code, version);
      setTestCode(resp.run.output);
      console.log(resp);
    } catch (error) {
      console.log("error", error);
    } finally {
      setRun(false);
    }
  };
  const handleEditorChange = (value) => {
    setCode(value);
    // console.log(value);
    localStorage.setItem("code", value);
  };

  useEffect(() => {
    setLang(localStorage.getItem("lang"));
    setCode(localStorage.getItem("code"));
    // console.log(code);
  }, []);

  const handleLanguageChange = (lang) => {
    setCode(boilerplateCode[lang]);
    setLang(lang); // Update context with the selected language
    localStorage.setItem("lang", lang);
  };

  return (
    <>
      <div className="grid grid-cols-[15%_55%_30%]">
        <div className="h-screen bg-gray-800"></div>
        <div className="h-screen">
          <div className="px-4 py-2">
            <span className="text-white text-lg rounded-lg p-3 m-3">
              Languages:
            </span>
            <Selector update={handleLanguageChange} />
          </div>
          <Editor
            height="calc(100vh - 56px)" // Adjust height to fit below selector
            theme="vs-dark"
            language={lang} // Use state for current language
            defaultValue={boilerplateCode[lang]}
            value={code}
            onMount={onMount}
            onChange={handleEditorChange}
          />
        </div>
        <div className="h-screen bg-gray-800 flex flex-col ">
          <div className="flex flex-row items-center space-x-4 px-3 mt-3">
            <span className="py-2 px-4 text-white text-lg">Output:</span>
            <div
              className={`text-white px-5 py-2 rounded-lg w-1/3 flex items-center justify-between ${
                run ? "bg-gray-700" : "bg-green-500 hover:bg-green-600"
              } ${run ? "cursor-not-allowed" : ""}`}
            >
              <span
                onClick={!run ? handleRun : null} // Disable click if run is true
                className="text-white"
              >
                RunCode
              </span>
              <VscTriangleRight className="text-lg" />
            </div>
          </div>
          <div className="border border-black-2 m-1 bg-black text-white/60 p-3 h-full">
            {testCode?testCode:'test'}
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor_page;
