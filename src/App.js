import './App.css';
import { AppRouter } from './Route';
import { DarkModeProvider } from "./DarkMode.jsx";
import useTokenCheck from './TokenCheck.js';

function App() {

 useTokenCheck()

  return (
    <div className="App">
      <DarkModeProvider>
        <AppRouter/>
        </DarkModeProvider>
        {/* document.getElementById("root") */}
    </div>
  );
}

export default App;
