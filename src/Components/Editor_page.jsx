import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { boilerplateCode } from "./constants";
import Selector from "./component/LanguageSelector.jsx";
import toast from "react-hot-toast";
import Actions from "./Custom/Actions.js";
import initSocket from "../socket.jsx";
import { Navigate } from "react-router-dom";
import SideBar from "./component/sidebar.jsx";
import Tester from "./component/tester.jsx";

const Editor_page = () => {
  const location = useLocation();
  const reactNavigate = useNavigate();
  const editorRef = useRef(null);
  const socketRef = useRef(null);
  const clientsRef = useRef([]); // Ref to hold latest Clients state
  const [update, setUpdate] = useState(false);
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState(""); // Initialize with an empty string
  const codeRef = useRef(code); // Ref to store the latest code
  const { id, username } = location.state || {};
  const [Clients, setClient] = useState([]);
  const [socketId, setId] = useState(null);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (value) => {
    if(value){
      setCode(value);
      codeRef.current = value; // Keep the ref updated with the latest code
      socketRef.current.emit(Actions.CODE_CHANGE, {
        id,
        code: value,
      });
    }
     
   
  };

  const handleError = (err) => {
    toast("Socket Connection Failed.. Try again later");
    reactNavigate("/");
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", handleError);
      socketRef.current.on("connect_failed", handleError);

      // Listen for CODE_CHANGE event
      socketRef.current.on(Actions.CODE_CHANGE, ({ code,lang }) => {
        if (code && code !== codeRef.current) {
          setCode(code);
          setLang(lang)
          codeRef.current = code; // Update the ref
          if (editorRef.current) {
            editorRef.current.setValue(code);
          }
        }
      });

      // Join the room
      socketRef.current.emit(Actions.JOIN, { id, username });

      socketRef.current.on(
        Actions.JOINED,
        ({ clients, socketId, userName }) => {
          if (username !== userName) {
            toast.success(`${userName} joined the room`);
          }
          setId(socketId);
          setClient(clients);

          // Sync the latest code to the newly joined client
          socketRef.current.emit(Actions.SYNC_CODE, {
            code: codeRef.current || "", // Fallback to an empty string if undefined
            lang:lang,
            socketId: socketId,
          });
        }
      );

      // Handle when a user clicks run
      socketRef.current.on("click_run", () => {
        console.log('Run button triggered across all clients');
        // Trigger the run functionality across all users
      });

      socketRef.current.on("disconnected", ({ socketID, userName }) => {
        toast.success(`${userName} left the room`);
        setClient((prevClients) =>
          prevClients.filter((client) => client.socketId !== socketID)
        );
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [id, username]);

  const handleLanguageChange = (language) => {
    const newCode = boilerplateCode[language];
    setCode(newCode);
    codeRef.current = newCode; // Update codeRef with the new code
    if(language == lang)
      setUpdate(!update);
    setLang(language);
    console.log("Handle Change code");
    
    // socketRef.current.emit("recent_code",{id,socketId});
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("recent_code", { id, socketId });
    }
  }, [update]);

  if (!username) return <Navigate to="/" />;

  return (
    <>
      <div className="grid grid-cols-[15%_55%_30%]">
        <SideBar id={id} Clients={Clients} />

        <div className="h-full">
          <div className="px-4 py-2">
            <span className="text-white text-lg rounded-lg p-3 m-3">
              Languages:
            </span>
            <Selector update={handleLanguageChange} />
          </div>
          <Editor
            height="calc(100vh - 56px)"
            theme="vs-dark"
            language={lang}
            value={code} // Bind editor value to state
            onMount={onMount}
            onChange={handleEditorChange}
            options={{ tabSize: 2 }}
          />
        </div>
        <Tester
          lang={lang}
          code={code}
          socketRef={socketRef}
          socketId={socketId}
          id={id}
        />
      </div>
    </>
  );
};

export default Editor_page;
