import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <Navbar />
      <Router>
        <Route path="/" exact render={() => <Home />} />
      </Router>
    </>
  );
}

export default App;
