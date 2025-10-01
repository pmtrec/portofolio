import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Hero from '../components/organisms/Hero';
import About from '../components/organisms/About';
import Skills from '../components/organisms/Skills';
import Projects from '../components/organisms/Projects';
import Experience from '../components/organisms/Experience';
import Testimonials from '../components/organisms/Testimonials';
import Contact from '../components/organisms/Contact';
import Footer from '../components/organisms/Footer';
import ChatBox from '../components/organisms/ChatBox';
import Curtain from '../components/organisms/Curtain';

const Home: React.FC = () => {
  const [showCurtain, setShowCurtain] = useState(true);

  return (
    <>
      {showCurtain && <Curtain onComplete={() => setShowCurtain(false)} />}
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <ChatBox />
      </div>
    </>
  );
};

export default Home;