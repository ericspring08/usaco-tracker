import './App.css';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Problem from './pages/Problem';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route path = "/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path='/problem/:id' element={<Problem/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
