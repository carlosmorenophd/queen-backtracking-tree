import { useState } from "react";
import { playAgain } from "./utils/playQueen";
import Tree from "react-d3-tree";


function App() {

  const [tree, setTree] = useState({
    name: '0,0',
    attributes:{
      status: 'safe',
    },
    children: [],
  });

  const handleClick = () =>{
    setTree(playAgain(4));
  }
  return (
    <div className="w-screen h-screen flex flex-col">
      <div>
      Eight Queens
      </div>
      <button onClick={handleClick} className="bg-orange-800">Play 8 queens</button>
      <div className="w-3/2" style={{height: 1500}} >
        <Tree data={tree} orientation="vertical" />
      </div>
    </div>
  );
}

export default App;
