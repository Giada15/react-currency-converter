// import logo from "./logo.svg";
// import "./App.css";

import { use, useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const [output, setOutput] = useState("OUTPUT");

  function handleAmount(e) {
    if (isNaN(Number(e.target.value))) return;
    setAmount(e.target.value);
  }

  function handleFromCurr(e) {
    setFromCurr(e.target.value);
  }

  function handleToCurr(e) {
    setToCurr(e.target.value);
  }

  useEffect(
    function () {
      async function fetchConversion() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
          );

          const data = await res.json();

          setOutput(data.rates[toCurr]);
        } catch (e) {
          console.log(e.message);
        }
      }

      if (!amount || !fromCurr || !toCurr) return;

      fetchConversion();
    },
    [amount, fromCurr, toCurr]
  );

  return (
    <div>
      <input type="text" value={amount} onChange={handleAmount} />
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
      <p>{output}</p>
    </div>
  );
}
