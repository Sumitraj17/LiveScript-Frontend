import React, { useEffect, useState, createContext } from "react";

const Context = createContext();

const MyContext = ({ children }) => {
    const [language, setLanguage] = useState('javascript');

    useEffect(() => {
        // Retrieve language from localStorage on initial render
        const storedLanguage = localStorage.getItem('lang');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    const updateDetails = (lang) => {
        setLanguage(lang);
        localStorage.setItem('lang', lang); // Set the language in localStorage
        console.log("From context ",lang);
    };

    return (
        <Context.Provider value={{ language, updateDetails }}>
            {children} {/* Correct prop name */}
        </Context.Provider>
    );
};

export { MyContext, Context };
