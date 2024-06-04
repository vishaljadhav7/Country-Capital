import './App.css';
import { DATA } from './utils/mockData.js';
import Game from './Game';

function App() {  
  return (
    <div className="App">
       <Game data = {DATA} />
    </div>
  );
}
export default App;