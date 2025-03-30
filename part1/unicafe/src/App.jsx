import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === "positive" ? " %" : ""}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const newAll = updatedGood + neutral + bad;
    setAll(newAll);
    averageScore(updatedGood, neutral, bad, newAll);
    positiveScore(updatedGood, newAll);
  };
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const newAll = good + updatedNeutral + bad;
    setAll(newAll);
    averageScore(good, updatedNeutral, bad, newAll);
    positiveScore(good, newAll);
  };
  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const newAll = good + neutral + updatedBad;
    setAll(newAll);
    averageScore(good, neutral, updatedBad, newAll);
    positiveScore(good, newAll);
  };

  const averageScore = (good, neutral, bad, all) => {
    const score = (good * 1 + neutral * 0 + bad * -1) / all;
    setAverage(score);
  };

  const positiveScore = (good, all) => {
    const score = (good / all) * 100;
    setPositive(score);
  };

  return (
    <div>
      <h1>Provide Feedback Abby</h1>

      <Button handleClick={handleGoodClick} text="very good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
