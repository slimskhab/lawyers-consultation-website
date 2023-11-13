import React from 'react';
import Header from '../components/header/Header';
import MostRated from '../components/mostRated/MostRated';
import HowItWorks from "../components/howItWorks/HowItWorks"
import Footer from '../components/footer/Footer';
function HomePage(props) {
    return (
        <div>
            <Header/>
      <MostRated/>
      <HowItWorks/>
      <Footer/>
        </div>
    );
}

export default HomePage;