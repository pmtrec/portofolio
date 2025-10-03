import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Hero
      "hero.greeting": "Hello, I am",
      "hero.title": "Full Stack Developer",
      "hero.subtitle": "Passionate Full Stack Developer creating innovative and high-performance web experiences",
      "hero.description": "Passionate about building scalable applications and user-friendly interfaces. I specialize in React, Node.js, and cloud technologies.",
      "hero.cta": "View My Work",
      "hero.secondary": "Get In Touch",
      "hero.contact": "Contact me",
      "hero.projects": "View my projects",
      "hero.downloadCVFR": "Download CV (FR)",
      "hero.downloadCVEN": "Download CV (EN)",

      // Skills
      "skills.title": "My Skills",
      "skills.subtitle": "Technologies and tools I master to create complete and innovative solutions",
      "skills.learning": "Always learning",
      "skills.learningDesc": "I constantly keep up with the latest technologies and web development trends. Currently, I'm deepening my knowledge in AI and machine learning to integrate intelligent features into my applications.",
      "skills.ai": "Artificial Intelligence",
      "skills.web3": "Web3 & Blockchain",
      "skills.microservices": "Microservices",
      "skills.cloud": "Cloud Native",

      // Categories
      "skills.frontend": "Frontend",
      "skills.backend": "Backend",
      "skills.design": "Design",
      "skills.devops": "DevOps",
      "skills.web": "Web",
      "skills.mobile": "Mobile",

      // About
      "about.title": "About Me",
      "about.description": "I'm a passionate full-stack developer with over 5 years of experience creating digital solutions.",

      // Contact
      "contact.title": "Get In Touch",
      "contact.description": "Ready to start your next project? Let's discuss how we can work together.",

      // Navigation
      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",

      // Footer
      "footer.rights": "All rights reserved.",
    }
  },
  fr: {
    translation: {
      // Hero
      "hero.greeting": "Bonjour, je suis",
      "hero.title": "Développeur Full Stack",
      "hero.subtitle": "Création de solutions web innovantes avec des technologies modernes",
      "hero.description": "Passionné par la construction d'applications évolutives et d'interfaces conviviales. Je me spécialise dans React, Node.js et les technologies cloud.",
      "hero.cta": "Voir Mon Travail",
      "hero.secondary": "Me Contacter",
      "hero.contact": "Me contacter",
      "hero.projects": "Voir mes projets",
      "hero.downloadCVFR": "Télécharger CV (FR)",
      "hero.downloadCVEN": "Download CV (EN)",

      // Skills
      "skills.title": "Mes Compétences",
      "skills.subtitle": "Technologies et outils que je maîtrise pour créer des solutions complètes et innovantes",
      "skills.learning": "Toujours en apprentissage",
      "skills.learningDesc": "Je me tiens constamment à jour avec les dernières technologies et tendances du développement web. Actuellement, j'approfondis mes connaissances en IA et machine learning pour intégrer des fonctionnalités intelligentes dans mes applications.",
      "skills.ai": "Intelligence Artificielle",
      "skills.web3": "Web3 & Blockchain",
      "skills.microservices": "Microservices",
      "skills.cloud": "Cloud Native",

      // Categories
      "skills.frontend": "Frontend",
      "skills.backend": "Backend",
      "skills.design": "Design",
      "skills.devops": "DevOps",
      "skills.web": "Web",
      "skills.mobile": "Mobile",

      // About
      "about.title": "À Propos",
      "about.description": "Je suis un développeur full-stack passionné avec plus de 5 ans d'expérience dans la création de solutions numériques.",

      // Contact
      "contact.title": "Me Contacter",
      "contact.description": "Prêt à commencer votre prochain projet ? Discutons de comment nous pouvons travailler ensemble.",

      // Navigation
      "nav.home": "Accueil",
      "nav.about": "À Propos",
      "nav.skills": "Compétences",
      "nav.projects": "Projets",
      "nav.contact": "Contact",

      // Footer
      "footer.rights": "Tous droits réservés.",
    }
  },
  es: {
    translation: {
      // Hero
      "hero.greeting": "Hola, soy",
      "hero.title": "Desarrollador Full Stack",
      "hero.subtitle": "Creando soluciones web innovadoras con tecnologías modernas",
      "hero.description": "Apasionado por construir aplicaciones escalables e interfaces amigables. Me especializo en React, Node.js y tecnologías cloud.",
      "hero.cta": "Ver Mi Trabajo",
      "hero.secondary": "Contactarme",
      "hero.contact": "Contactarme",
      "hero.projects": "Ver mis proyectos",
      "hero.downloadCVFR": "Télécharger CV (FR)",
      "hero.downloadCVEN": "Download CV (EN)",

      // Skills
      "skills.title": "Mis Habilidades",
      "skills.subtitle": "Tecnologías y herramientas que domino para crear soluciones completas e innovadoras",
      "skills.learning": "Siempre aprendiendo",
      "skills.learningDesc": "Me mantengo constantemente actualizado con las últimas tecnologías y tendencias del desarrollo web. Actualmente, estoy profundizando mis conocimientos en IA y machine learning para integrar funcionalidades inteligentes en mis aplicaciones.",
      "skills.ai": "Inteligencia Artificial",
      "skills.web3": "Web3 & Blockchain",
      "skills.microservices": "Microservicios",
      "skills.cloud": "Cloud Native",

      // Categories
      "skills.frontend": "Frontend",
      "skills.backend": "Backend",
      "skills.design": "Diseño",
      "skills.devops": "DevOps",
      "skills.web": "Web",
      "skills.mobile": "Móvil",

      // About
      "about.title": "Sobre Mí",
      "about.description": "Soy un desarrollador full-stack apasionado con más de 5 años de experiencia creando soluciones digitales.",

      // Contact
      "contact.title": "Ponte en Contacto",
      "contact.description": "¿Listo para comenzar tu próximo proyecto? Hablemos de cómo podemos trabajar juntos.",

      // Navigation
      "nav.home": "Inicio",
      "nav.about": "Sobre Mí",
      "nav.skills": "Habilidades",
      "nav.projects": "Proyectos",
      "nav.contact": "Contacto",

      // Footer
      "footer.rights": "Todos los derechos reservados.",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;