import React, { useState } from "react";

interface ITheme {
  theme: string;
  toggleTheme: Function;
}

export const ThemeContext: React.Context<ITheme> = React.createContext<ITheme>({
  theme: "dark-theme",
  toggleTheme: () => {},
});

const { Provider } = ThemeContext;

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<string>("dark-theme");

  const toggleTheme = () => {
    setTheme(theme === "dark-theme" ? "light-theme" : "dark-theme");
  };

  return <Provider value={{ theme, toggleTheme }}>{children}</Provider>;
};
