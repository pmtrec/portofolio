import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [textIndex, setTextIndex] = useState(0);
  const fullName = "PAPA MALICK TEUW";

  // Animation du texte lettre par lettre
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev < fullName.length ? prev + 1 : prev));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 py-[50px]">
          {/* Profile Image */}
         <div className="mx-auto w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1 animate-pulse py-[10px] my-[30px] flex justify-center ">
  <div  className="w-[255px] rounded-full ">
    <img 
    src="/uploads/Image collée.png"
    alt="Papa Malick Teuw"
    className="w-full h-full rounded-full object-cover  " 
  />
    </div> 
</div>


          {/* Main Content */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
              Bonjour, je suis{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {fullName.slice(0, textIndex)}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fadeIn">
              Développeur Full Stack passionné par la création d'expériences web innovantes et performantes
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-500">
              {['React', 'Node.js', 'TypeScript', 'Python'].map((tech, i) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white rounded-full shadow-sm transform transition-transform duration-500 hover:scale-110"
                  style={{ animationDelay: `${i * 0.2}s`, animationName: 'bounceIn', animationFillMode: 'both', animationDuration: '0.8s' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg animate-pulse"
            >
              Me contacter
            </button>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              Voir mes projets
            </button>
          </div>

          {/* CV Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/uploads/CV-FR.pdf"
              download="CV_Papa_Malick_Teuw_FR.pdf"
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Télécharger CV (FR)
            </a>
            <a
              href="/uploads/CV-EN.pdf"
              download="CV_Papa_Malick_Teuw_EN.pdf"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Download CV (EN)
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/pmtfromd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 animate-bounce"
            >
              <Github className="w-6 h-6 text-gray-700" />
            </a>
            <a
              href="https://www.linkedin.com/in/papa-malick-teuw"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 animate-bounce animation-delay-200"
            >
              <Linkedin className="w-6 h-6 text-blue-600" />
            </a>
            <a
              href="mailto:malickteuw.dewweb@gmail.com"
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 animate-bounce animation-delay-400"
            >
              <Mail className="w-6 h-6 text-green-600" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
