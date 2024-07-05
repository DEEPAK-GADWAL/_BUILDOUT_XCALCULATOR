import React, { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const calNum = [7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "*", "C", 0, "=", "/"];
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const calculate = (a, operator, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? (a === 0 ? NaN : Infinity) : a / b;
      default:
        return NaN;
    }
  };

  const handleClick = (value) => {
    if (value === "=") {
      if (input === "") {
        setResult("Error");
      } else {
        try {
          const regex = /(-?\d+(?:\.\d+)?)([-+*/])(-?\d+(?:\.\d+)?)/;
          let tempInput = input;
          while (regex.test(tempInput)) {
            tempInput = tempInput.replace(regex, (match, a, op, b) => {
              return calculate(a, op, b);
            });
          }
          const finalResult = parseFloat(tempInput);
          setResult(
            isNaN(finalResult)
              ? "NaN"
              : !isFinite(finalResult)
              ? "Infinity"
              : finalResult.toString()
          );
        } catch (error) {
          setResult("Error");
        }
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>React Calculator</h1>
      <input type="text" value={input} readOnly />
      <div>{result}</div>
      <div className={styles.buttonContainer}>
        {calNum.map((ele, idx) => (
          <button key={idx} onClick={() => handleClick(ele.toString())}>
            {ele}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;