import './App.css';
import Header from './view/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import MostDonated from './view/mostDonated/MostDonated';

function App() {
  return (
    <div className="App" style={{fontFamily:"'Montserrat', sans-serif;"}}>
      <Header/>
      <MostDonated/>
      
    </div>
  );
}

export default App;
