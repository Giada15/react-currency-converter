// import logo from "./logo.svg";
// import "./App.css";

import { useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [fromCurr, setFromCurr] = useState("");
  const [toCurr, setToCurr] = useState("");

  function handleInputValue(e) {
    if (isNaN(Number(e.target.value))) return;
    setInputValue(e.target.value);
  }

  function handleFromCurr(e) {
    setFromCurr(e.target.value);
  }

  function handleToCurr(e) {
    setToCurr(e.target.value);
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputValue} />
      <select value={fromCurr} onChange={handleFromCurr}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurr} onChange={handleToCurr}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}
