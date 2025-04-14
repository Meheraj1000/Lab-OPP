import React from 'react';
import NavBar from './NavBar';
import Banner from './Banner';
import Men from './Men';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
           <header>
          <div> 
            <NavBar></NavBar> 
            </div>
          <div>
          <Banner></Banner>
          </div>
           </header>
           <main>
           <div>
            <Men></Men>
           </div>
           </main>
           <footer>
            <Footer></Footer>
           </footer>
        </div>
    );
};

export default Home;