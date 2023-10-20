import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './view/pages/HomePage';
import Profile from './view/pages/profile/Profile';
function App() {
  return (
    <div className="App" style={{fontFamily:"'Montserrat', sans-serif;",color:"black"}}>
   {/*<HomePage/> */} 

    <Profile/>
    </div>
  );
}

export default App;
