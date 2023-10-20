import React from 'react';
import Header from '../components/header/Header';
import MostDonated from "../components/mostDonated/MostDonated"
import HowItWorks from "../components/howItWorks/HowItWorks"
import HomepageFooter from "../components/homepageFooter/HomepageFooter"
function HomePage(props) {
    return (
        <div>
            <Header/>
      <MostDonated/>
      <HowItWorks/>
      <HomepageFooter/>
        </div>
    );
}

export default HomePage;