import React, { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Certification {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'image' | 'pdf' | 'document';
  issueDate: string;
  issuer: string;
  image?: string;
}

const Certifications = () => {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [customCertifications, setCustomCertifications] = useState<Certification[]>([]);

  // Load custom certifications from localStorage
  useEffect(() => {
    const storedCertifications = localStorage.getItem('customCertifications');
    if (storedCertifications) {
      setCustomCertifications(JSON.parse(storedCertifications));
    }
  }, []);

  const hardcodedCertifications: Certification[] = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      description: 'Certification démontrant une expertise dans la conception et le déploiement d\'applications sur AWS',
      fileUrl: '/uploads/CV-EN.pdf',
      fileType: 'pdf',
      issueDate: '2023-06-15',
      issuer: 'Amazon Web Services',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'React Developer Certification',
      description: 'Certification officielle React pour le développement d\'applications web modernes',
      fileUrl: '/uploads/CV-FR.pdf',
      fileType: 'pdf',
      issueDate: '2023-04-20',
      issuer: 'Meta (Facebook)',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'Node.js Professional',
      description: 'Certification avancée en développement backend avec Node.js et Express',
      fileUrl: '/uploads/Image collée.png',
      fileType: 'image',
      issueDate: '2023-02-10',
      issuer: 'OpenJS Foundation',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  // Combine hardcoded and custom certifications
  const certifications = [...hardcodedCertifications, ...customCertifications];

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

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'image':
        return <img src="/uploads/Image collée.png" alt="File" className="h-8 w-8 object-cover rounded" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mes certifications
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Un album de mes certifications et diplômes obtenus tout au long de ma carrière
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((certification) => (
            <motion.div
              key={certification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => setSelectedCertification(certification)}
            >
              <div className="aspect-video overflow-hidden">
                {certification.image ? (
                  <img
                    src={certification.image}
                    alt={certification.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                    {getFileIcon(certification.fileType)}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {certification.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {certification.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{certification.issuer}</span>
                  <span>{new Date(certification.issueDate).getFullYear()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification Modal */}
        <AnimatePresence>
          {selectedCertification && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertification(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedCertification(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                    {selectedCertification.image ? (
                      <img
                        src={selectedCertification.image}
                        alt={selectedCertification.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                        {getFileIcon(selectedCertification.fileType)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedCertification.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Délivré par</h4>
                      <p className="text-gray-600 dark:text-gray-300">{selectedCertification.issuer}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Date d'obtention</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {new Date(selectedCertification.issueDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {selectedCertification.description}
                  </p>
                  <div className="flex gap-4">
                    <a
                      href={selectedCertification.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Télécharger
                    </a>
                    <a
                      href={selectedCertification.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Voir
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

export default Certifications;