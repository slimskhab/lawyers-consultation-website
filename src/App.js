import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './view/pages/HomePage';
import Profile from './view/pages/profile/Profile';
import { Route,Routes } from 'react-router-dom';
import Signup from './view/pages/signup/Signup';
import Login from './view/pages/login/Login';
import Message from './view/pages/message/Message';
import Lawyers from './view/pages/lawyers/Lawyers';
import AdminPanel from './view/pages/adminPanel/AdminPanel';
function App() {
  return (
    <div className="App">
   
<Routes >
  <Route path= "/" element ={<HomePage/>}  />
  <Route path= "/lawyer/:id" element ={<Profile/>}  />
  <Route path= "/signup" element ={<Signup/>}  />

  <Route path= "/login" element ={<Login/>}  />
  <Route path= "/messages" element ={<Message/>}  />
  <Route path= "/lawyers" element ={<Lawyers/>}  />
  <Route path= "/admin-panel" element ={<AdminPanel/>}  />

</Routes>
    
    </div>
  );
}

export default App;
