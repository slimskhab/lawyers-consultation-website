import './App.css';
import Header from './view/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import MostDonated from './view/mostDonated/MostDonated';
import HowItWorks from './view/howItWorks/HowItWorks';
import HomepageFooter from './view/homepageFooter/HomepageFooter';
import Footer from './view/footer/Footer';
function App() {
  return (
    <div className="App" style={{fontFamily:"'Montserrat', sans-serif;",color:"black"}}>
      <Header/>
      <MostDonated/>
      <HowItWorks/>
      <HomepageFooter/>
    
    </div>
  );
}

export default App;
