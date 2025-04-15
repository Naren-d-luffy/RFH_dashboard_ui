import './App.css';
import { AppRouter } from './Route';
import { DarkModeProvider } from "./DarkMode.jsx";
// import useTokenCheck from './TokenCheck.js';
import AuthProvider from './AuthContext.js';

function App() {

//  useTokenCheck()

  return (
    <div className="App">
      <DarkModeProvider>
        <AuthProvider>
        <AppRouter/>
        </AuthProvider>
        </DarkModeProvider>
        {/* document.getElementById("root") */}
    </div>
  );
}

export default App;
