import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/context";
import { VscTriangleRight } from "react-icons/vsc";
import { executeCode } from "../APIhelper/api";
import { ColorRing } from "react-loader-spinner";

const Tester = ({ lang, code, socketRef, socketId, id }) => {
  const [run, setRun] = useState(false);
  const [sync_run,setSync] = useState(false);
  const { language } = useContext(Context);
  const [testCode, setTestCode] = useState(null);

  const fetchVersion = (lang) => {
    const match = language.find((element) => element.language === lang);
    return match ? match.version : null;
  };

  const handleRun = async () => {
    // if (run) return; // Prevent multiple runs

    setRun(true);
    try {
      // Emit event to signal code execution to other users
      socketRef.current.emit("code_run", { socketId, id });
     
      const version = fetchVersion(lang=='cpp'?'c++':lang);
      const resp = await executeCode(lang, code, version);

      socketRef.current.emit("output",{resp,id});
      
      const formattedOutput = resp.run.output.replace(/\n/g, "<br>");
      setTestCode(formattedOutput); // Set the formatted string

      console.log("Code execution response:", resp);
    } catch (error) {
      console.log("Error executing code:", error);
    } finally {
      setRun(false);
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      // Listen for "click_run" event from other clients
      const handleClickRun = () => {
        console.log("Received 'click_run' event from server");
        if (!run) setRun(true); // Trigger handleRun if not already running
      };
      const handleResponse=({resp})=>{
        if(run){
          const formattedOutput = resp.run.output.replace(/\n/g, "<br>");
          setTestCode(formattedOutput);
          setRun(false);
        }
      }
      socketRef.current.on("click_run", handleClickRun);
      socketRef.current.on('response',handleResponse)
      // Cleanup listener on component unmount
      return () => {
        socketRef.current.off("click_run", handleClickRun);
      };
    }
  }, [run, socketRef]);

  return (
    <div className="h-full bg-gray-800 flex flex-col">
      <div className="flex flex-row items-center space-x-4 px-3 mt-3">
        <span className="py-2 px-4 text-white text-lg">Output:</span>
        <div
          className={`text-white px-5 py-2 rounded-lg w-1/3 flex items-center justify-between cursor-pointer ${
            run ? "bg-gray-700" : "bg-green-500 hover:bg-green-600"
          } ${run ? "cursor-not-allowed" : ""}`}
          onClick={!run ? handleRun : null} // Disable if already running
        >
          <span className="text-white">RunCode</span>
          <VscTriangleRight className="text-lg" />
        </div>
      </div>
      <div className="border border-gray-600 m-1 bg-gray-900 rounded text-white p-3 h-full">
        {run ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#ffffff", "#d4f8e8", "#a3e4d7", "#28b463", "#1e8449"]}
          />
        ) : testCode ? (
          <div dangerouslySetInnerHTML={{ __html: testCode }} />
        ) : (
          "Test"
        )}
      </div>
    </div>
  );
};

export default Tester;
