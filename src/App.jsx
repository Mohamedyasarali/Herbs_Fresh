import { useState } from 'react';
import './App.css'
import Header from './Components/Header'
import Home from './Components/Home';
import Cards from './Components/Cards';
import Footer from './Components/Footer';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [herbal, setHerbal] = useState(null);

  return (
    <>
    <section className='section'>
      <Header setIsSearching={setIsSearching} setHerbal={setHerbal} />

      <section className='hero-section'>
      {/* Home or Cards */}
      {
        !isSearching && !herbal ?(
          <Home/>
        ):(
          herbal && <Cards herbal={herbal}/>
        )
      }
      </section>

      

    </section>

    <Footer/>

  


    
    </>
  )
}

export default App;
