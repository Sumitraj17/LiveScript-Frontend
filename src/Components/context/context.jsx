import React, { useEffect, useState, createContext } from "react";

const Context = createContext();

const MyContext = ({ children }) => {
    const [language, setLanguage] = useState('javascript');
    const [currentLang,setLang] = useState('javascript');
    useEffect(() => {
        // Retrieve language from localStorage on initial render
        const storedLanguage = localStorage.getItem('lang');
        const curLang = localStorage.getItem('current');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
        if (curLang) {
            setLang(curLang);
        }
    }, []);
    const updateLang = (lang)=>{
        setLang(lang);
        localStorage.setItem("current",lang);
    }
    const updateDetails = (lang) => {
        setLanguage(lang);
        localStorage.setItem('lang', lang); // Set the language in localStorage
    };

    return (
        <Context.Provider value={{ language, updateDetails, updateLang,currentLang}}>
            {children} {/* Correct prop name */}
        </Context.Provider>
    );
};

export { MyContext, Context };
