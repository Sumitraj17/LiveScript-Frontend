import React, { useContext, useEffect, useState } from "react";
import { getLanguages } from "./APIhelper/api";
import { Context } from "./context/context.jsx";

const Selector = ({ update }) => {
  const [Lang, setLanguage] = useState([]); // Initial state for languages
    const [current,setCurrent] = useState('javascript');
    const {updateDetails} = useContext(Context);
  // Fetch languages from the API
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const resp = await getLanguages();  // Fetch from the API
        updateDetails(resp);
        setLanguage(resp);  // Update the state with fetched languages
        console.log(resp);
      } catch (error) {
        console.log("Error fetching languages: " + error);
      }
    };
    
    fetchLanguages();
  }, []);  // Empty dependency array to run only once
  useEffect(()=>{
    setCurrent(localStorage.getItem('current_lang') || 'javascript')
    update(localStorage.getItem('current_lang') || 'javascript')
  },[Lang])
  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem('current_lang',selectedLanguage)
    setCurrent(selectedLanguage)
    update(selectedLanguage);  // Call the update function with the selected language
  };

  return (
    <select
      onChange={handleChange}
      value={current}
      className="bg-gray-900 w-{200px} text-white border border-white p-3"
    >
      {Lang.length > 0 ? (
        Lang.map((lang, index) => (
          <option value={lang.value} key={index}>
            {lang.language === 'c++'?'cpp':(lang.language === 'sqlite3'?'sql':lang.language)}
          </option>
        ))
      ) : (
        <option>Loading languages...</option>
      )}
    </select>
  );
};

export default Selector;
