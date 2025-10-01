import React from 'react';
import { Heart, ArrowUp, Github, Linkedin, Mail, } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets', href: '#projects' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];
 
  const socialLinks = [
    { icon: Github, href: 'https://github.com/pmtfromd', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/papa-malick-teuw', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:malickteuw.devwebg@gmail.com', label: 'Email' }
  ];

  const services = [
    'Développement Frontend',
    'Développement Backend',
    'Applications Full Stack',
    'Applications Mobile',
    'Consulting Technique',
    'Architecture Solutions'
  ];

  const technologies = [
    'React', 'Node.js', 'TypeScript', 'Python', 
    'Next.js', 'React Native', 'PostgreSQL', 'AWS'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                John Doe
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Développeur Full Stack passionné, spécialisé dans la création d'applications web modernes et performantes. 
                Toujours à l'affût des dernières technologies.
              </p>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Suivez-moi</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 text-gray-400 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-110"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6">Navigation</h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-semibold mb-6">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Contact CTA */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <h5 className="font-semibold mb-2">Prêt à démarrer ?</h5>
              <p className="text-sm text-blue-100 mb-3">
                Discutons de votre prochain projet
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-white text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition-colors text-sm"
              >
                Me contacter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© {new Date().getFullYear()} Papa MalIck Teuw. Tous droits réservés.</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Fait avec <Heart className="w-4 h-4 text-red-500 fill-current" /> et React
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-400">
                <span>Dernière mise à jour: Janvier 2025</span>
              </div>
              
              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 transform hover:scale-110"
                title="Retour en haut"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;