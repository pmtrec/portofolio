import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5
      }
    }
  };

  const experiences = [
    {
      type: 'work',
      title: 'Clone WhatsApp',
      company: 'Projet personnel',
      location: 'Dakar, Sénégal',
      period: '2025 (2 semaines)',
      description: "Application de messagerie en temps réel avec une interface inspirée de WhatsApp.",
      achievements: [
        'Envoi et réception de messages en temps réel',
        'Interface responsive avec TailwindCSS',
        'Connexion avec JSON Server pour simuler le backend'
      ],
      technologies: ['JavaScript Vanilla', 'TailwindCSS', 'Vite', 'JSON Server']
    },
    {
      type: 'work',
      title: 'JOTAAY Social Network',
      company: 'Projet académique',
      location: 'Dakar, Sénégal',
      period: '2025 (2 semaines)',
      description: "Application éducative permettant aux utilisateurs de se connecter, interagir et partager du contenu.",
      achievements: [
        'Mise en place d’un système de connexion sécurisé',
        'Gestion des utilisateurs et publications',
        'Déploiement sur Vercel'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
    },
    {
      type: 'work',
      title: 'Application de gestion des apprenants',
      company: 'Projet académique',
      location: 'Dakar, Sénégal',
      period: '2025 (4 semaines)',
      description: "Application web permettant l’inscription, la mise à jour et le suivi des informations des étudiants.",
      achievements: [
        'Développement complet en PHP natif',
        'Interface utilisateur claire en HTML/CSS',
        'Système CRUD complet'
      ],
      technologies: ['PHP', 'HTML', 'CSS', 'MySQL']
    },
    {
      type: 'education',
      title: 'Sonatel Academy (Orange Digital Center)',
      company: 'Formation professionnelle',
      location: 'Dakar, Sénégal',
      period: 'En cours',
      description: 'Formation intensive en développement web et mobile.',
      achievements: [
        'Projets pratiques en équipe',
        'Apprentissage du Full-Stack',
        'Approfondissement en UI/UX'
      ],
      technologies: ['JavaScript', 'Node.js', 'React', 'PHP', 'MySQL']
    },
    {
      type: 'education',
      title: 'Université Cheikh Anta Diop (UCAD)',
      company: 'Licence Mathématiques, Physique et Informatique',
      location: 'Dakar, Sénégal',
      period: '2022 - 2024',
      description: 'Formation scientifique et informatique avec des bases solides en programmation.',
      achievements: [
        'Cours avancés en algorithmes et bases de données',
        'Travaux pratiques en programmation',
        'Participation à des projets collaboratifs'
      ],
      technologies: ['Java', 'C++', 'SQL', 'Algorithmique']
    },
    {
      type: 'education',
      title: 'Lycée de Ndioum',
      company: 'Baccalauréat Sciences Expérimentales',
      location: 'Ndioum, Sénégal',
      period: '2022 - 2023',
      description: 'Formation secondaire axée sur les sciences expérimentales.',
      achievements: [
        'Obtention du diplôme scientifique',
        'Bases solides en mathématiques et sciences',
        'Préparation aux études supérieures'
      ],
      technologies: ['Mathématiques', 'Physique', 'Chimie']
    }
  ];

  const getIcon = (type: string) => {
    return type === 'work' ? Briefcase : GraduationCap;
  };

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mon parcours
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un parcours riche en projets académiques et en formation continue, orienté vers le développement web et mobile
          </p>
        </div>

        {/* Timeline */}
        <motion.div
          ref={ref}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
         

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = getIcon(exp.type);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={`flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  variants={itemVariants}
                >
                  {/* Icône timeline */}
                  <div className="flex-shrink-0 relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                      exp.type === 'work'
                        ? 'bg-blue-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className={`flex-1 ml-4 md:w-5/12 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          exp.type === 'work'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {exp.type === 'work' ? 'Projet' : 'Formation'}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                      <div className="text-blue-600 font-semibold mb-2">{exp.company}</div>

                      <div className={`flex items-center gap-4 mb-4 text-sm text-gray-500 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>

                      {/* Réalisations */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Points clés :</h4>
                        <ul className={`space-y-1 text-sm text-gray-600 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className={`flex items-center ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full bg-blue-500 ${isEven ? 'md:ml-2 md:order-2' : 'md:mr-2'}`}></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-5/12 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Résumé stats */}
        <motion.div
          className="mt-20 bg-white rounded-xl shadow-lg p-8"
          variants={statsVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
              <div className="text-gray-600">Projets académiques</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
              <div className="text-gray-600">Technologies maîtrisées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">En cours</div>
              <div className="text-gray-600">Formation Full-Stack</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
