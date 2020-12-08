import React, { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import { BsMoon, BsSun } from "react-icons/bs";
import "./styles.css";

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleClick = (e: React.MouseEvent) => {
    toggleTheme();
  };

  return (
    <button onClick={handleClick} className="toggle-theme-button">
      {theme === "dark-theme" ? (
        <BsMoon size="2rem" color="#1828b2" />
      ) : (
        <BsSun size="2rem" color="#f78c22" />
      )}
    </button>
  );
};

export default ToggleThemeButton;
