import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
    textColor: string;
}

const ThemeContext = createContext<ThemeContextType>({ textColor: 'black' });

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeContext.Provider value={{ textColor: 'black' }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
