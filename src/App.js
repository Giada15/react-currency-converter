// import logo from "./logo.svg";
// import "./App.css";

import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const [output, setOutput] = useState("OUTPUT");
  const [isLoading, setIsLoading] = useState(false);

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
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
          );

          const data = await res.json();

          // if (data.message === "bad currency pair") {
          //   throw new Error("Source and target currencies must be different.");
          // }

          setOutput(data.rates[toCurr]);
          setIsLoading(false);
        } catch (e) {
          console.log(e.message);
        }
      }

      if (!amount || !fromCurr || !toCurr) return;

      fromCurr !== toCurr ? fetchConversion() : setOutput(amount);
    },
    [amount, fromCurr, toCurr]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={handleAmount}
        disabled={isLoading ? true : false}
      />
      <select
        value={fromCurr}
        onChange={handleFromCurr}
        disabled={isLoading ? true : false}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurr}
        onChange={handleToCurr}
        disabled={isLoading ? true : false}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
