import ReactDOM from "react-dom";
import WaveCanvas from "./WaveCanvas";
const app = document.getElementById("app-root");

const App = () => {
  return <div>
    <h1>Hello React</h1>
    <WaveCanvas />
  </div>
}

ReactDOM.render(<App/>, app);
