import './App.css';
import { useState } from 'react';

function App() {
  const [heights, setHeights] = useState("");
  const [weights, setWeights] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bmivalues, setBmivalues] = useState("00");
  const [status, setStatus] = useState("");

  const bmicalculation = () => {
    const validHeight = /^\d+$/.test(heights);
    const validWeight = /^\d+$/.test(weights);

    if (validHeight && validWeight) {
      const heightInMeters = heights / 100;
      const bmi = weights / (heightInMeters * heightInMeters);

      setBmivalues(bmi.toFixed(2));

      if (bmi < 18.5) {
        setStatus("Underweight");
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setStatus("Normal Weight");
      } else if (bmi >= 25 && bmi < 29.9) {
        setStatus("Overweight");
      } else {
        setStatus("Obese");
      }

      setErrorMessage("");
    } else {
      setBmivalues(null);
      setStatus("");
      setErrorMessage("Please enter valid height and weight");
    }
  };

  const removeall = () => {
    setHeights("");
    setWeights("");
    setBmivalues(null);
    setStatus("");
    setErrorMessage("");
  };

  return (
    <div className="total-info">
      <h1 style={{color:"rgb(15, 72, 117)"}}>BMI Calculator</h1>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="calculate-ctn">
        <label htmlFor="height" style={{color:"rgb(15, 72, 117)"}}>HEIGHT</label>
        <input
          type="number"
          id="height"
          value={heights}
          onChange={(e) => setHeights(e.target.value)}
        />
      </div>

      <div className="calculate-ctn">
        <label htmlFor="weight" style={{color:"rgb(15, 72, 117)"}}>WEIGHT</label>
        <input
          type="number"
          id="weight"
          value={weights}
          onChange={(e) => setWeights(e.target.value)}
        />
      </div>

      <div className="btn-bmicalculating">
        <button onClick={bmicalculation}>BMI CALCULATE</button>
      <button onClick={removeall}>Remove</button>
      </div>

       <div className="result">
          <p style={{ color: "white", fontSize: "20px" }}>{bmivalues}</p>
          <p>Status: {status}</p>
        </div>

     
    </div>
  );
}

export default App;
