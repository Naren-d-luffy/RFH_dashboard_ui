import './App.css';
import { AppRouter } from './Route';
import { DarkModeProvider } from "./DarkMode.jsx";


function App() {
  return (
    <div className="App">
      <DarkModeProvider>
        <AppRouter/>
        </DarkModeProvider>,
        document.getElementById("root")
    </div>
  );
}

export default App;
