import { playAgain } from "./utils/playQueen";


function App() {
  const handleClick = () =>{
    playAgain(4);
  }
  return (
    <div>
      Eight Queens
      <button onClick={handleClick}>Play 8 queens</button>
    </div>
  );
}

export default App;
