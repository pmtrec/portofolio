import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  github: string;
  demo: string;
  featured: boolean;
  stats: Record<string, string | undefined>;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [customProjects, setCustomProjects] = useState<Project[]>([]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Load custom projects from localStorage
  useEffect(() => {
    const storedProjects = localStorage.getItem('customProjects');
    if (storedProjects) {
      setCustomProjects(JSON.parse(storedProjects));
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const projectVariants = {
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

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const filterItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  const allProjects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plateforme e-commerce complète avec gestion des commandes, paiements et analytics',
      longDescription: 'Une plateforme e-commerce moderne développée avec React et Node.js, intégrant Stripe pour les paiements, un système d\'analytics avancé et une interface d\'administration complète. Le projet inclut également un système de recommandations basé sur l\'IA.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
      stats: { users: '10k+', orders: '50k+', revenue: '€2M+' }
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Dashboard interactif pour la visualisation de données business',
      longDescription: 'Un dashboard de business intelligence développé avec React et D3.js, permettant la visualisation en temps réel de métriques complexes. Intégration avec diverses APIs et export de rapports personnalisés.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
      category: 'frontend',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
      stats: { charts: '25+', datasets: '100+', exports: '1k+' }
    },
    {
      id: 3,
      title: 'API Rest Microservices',
      description: 'Architecture microservices avec API REST haute performance',
      longDescription: 'Une architecture microservices scalable avec Docker, Kubernetes et CI/CD. Gestion de l\'authentification, rate limiting, monitoring et documentation automatique avec Swagger.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis'],
      category: 'backend',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
      stats: { requests: '1M+/day', uptime: '99.9%', services: '12' }
    },
    {
      id: 4,
      title: 'App Mobile React Native',
      description: 'Application mobile cross-platform pour la gestion de tâches',
      longDescription: 'Application mobile développée avec React Native et Expo, synchronisation cloud, notifications push et interface intuitive. Disponible sur iOS et Android avec plus de 5000 téléchargements.',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
      category: 'mobile',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
      stats: { downloads: '5k+', rating: '4.8⭐', users: '2k+' }
    },
    {
      id: 5,
      title: 'Portfolio Designer',
      description: 'Site portfolio pour un designer UX/UI avec animations avancées',
      longDescription: 'Portfolio interactif développé avec Next.js et Framer Motion, mettant en valeur le travail d\'un designer avec des animations fluides, optimisé pour le SEO et les performances.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind', 'Vercel'],
      category: 'frontend',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
      stats: { visitors: '100k+', bounce: '<30%', speed: '95/100' }
    },
    {
      id: 6,
      title: 'ChatBot IA',
      description: 'Chatbot intelligent avec traitement du langage naturel',
      longDescription: 'Chatbot développé avec Python et intégration OpenAI API, capable de comprendre le contexte et de fournir des réponses pertinentes. Interface web moderne et API REST.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'OpenAI', 'FastAPI', 'React'],
      category: 'fullstack',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
      stats: { messages: '100k+', accuracy: '95%', languages: '5' }
    }
  ];

  // Combine hardcoded and custom projects
  const projects = [...allProjects, ...customProjects];

  const filters = [
    { id: 'tous', label: 'Tous les projets', count: projects.length },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
  ];

  const filteredProjects = activeFilter === 'tous'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mes projets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une sélection de mes réalisations les plus abouties, démontrant ma polyvalence et mon expertise technique
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Projets phares</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 h-full">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900">{project.title}</h4>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                        Phare
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white text-blue-600 text-xs rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={filterVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              variants={filterItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              {filter.label}
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              onClick={() => setSelectedProject(project)}
              variants={projectVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                      Phare
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h3>
                    {selectedProject.featured && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                        Projet phare
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedProject.longDescription}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      Voir le code
                    </a>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Voir la demo
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;