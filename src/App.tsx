import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.min.css";
import React from 'react';
import './App.css';
import CountrySelect from "./Components/CountrySelect";

function App() {
  return (
    <div className="App">
      <main>
        <CountrySelect />
      </main>
    </div>
  );
}

export default App;
