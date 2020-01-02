import React from "react";

const Header = (props) => {
  return (
    <header className="App-header">
      <h2 className="header-two">{props.text}</h2>
    </header>
  );
};

export default Header;