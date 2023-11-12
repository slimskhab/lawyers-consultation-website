import React from 'react';
import Header from '../components/header/Header';
import MostDonated from "../components/mostDonated/MostDonated"
import HowItWorks from "../components/howItWorks/HowItWorks"
import Footer from '../components/footer/Footer';
function HomePage(props) {
    return (
        <div>
            <Header/>
      <MostDonated/>
      <HowItWorks/>
      <Footer/>
        </div>
    );
}

export default HomePage;