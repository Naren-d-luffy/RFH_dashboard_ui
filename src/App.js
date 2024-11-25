import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './Route';

function App() {
  return (
    <div className="App">
        <AppRouter/>
    </div>
  );
}

export default App;
