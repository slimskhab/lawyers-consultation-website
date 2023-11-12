import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './view/pages/HomePage';
import Profile from './view/pages/profile/Profile';
import { Route,Routes } from 'react-router-dom';
import Signup from './view/pages/signup/Signup';
import Login from './view/pages/login/Login';
function App() {
  return (
    <div className="App">
   
<Routes >
  <Route path= "/" element ={<HomePage/>}  />
  <Route path= "/profile/:id" element ={<Profile/>}  />
  <Route path= "/signup" element ={<Signup/>}  />

  <Route path= "/login" element ={<Login/>}  />

</Routes>
    
    </div>
  );
}

export default App;
