import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [maxVote, setMaxVote] = useState({
    maxVoteCount: 0,
    maxVoteAnecdote: 0,
  });

  const maximumVote = () => {
    const newMaxVote = {
      maxVoteCount: maxVote.maxVoteCount,
      maxVoteAnecdote: maxVote.maxVoteAnecdote,
    };

    newMaxVote.maxVoteCount = votes[0];
    for (let i = 0; i <= votes.length; i++)
      if (votes[i] >= newMaxVote.maxVoteCount) {
        newMaxVote.maxVoteCount = votes[i];
        newMaxVote.maxVoteAnecdote = votes.indexOf(newMaxVote.maxVoteCount);
      }
    console.log(votes);
    setMaxVote(newMaxVote);
  };

  const genRand = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
    maximumVote();
  };

  const getVote = () => {
    const voteCount = [...votes];
    voteCount[selected] += 1;
    setVotes(voteCount);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={getVote}>vote</button>
      <button onClick={genRand}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVote.maxVoteAnecdote]}</p>
      <p>has {maxVote.maxVoteCount} votes</p>
    </div>
  );
};

export default App;
